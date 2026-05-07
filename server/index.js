import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

const prisma = new PrismaClient();
const app = express();
const PORT = Number(process.env.PORT || 5000);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const JWT_SECRET = process.env.JWT_SECRET || 'dev-only-secret-change-me';

app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '1mb' }));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      const allowed = (process.env.CLIENT_URL || 'http://localhost:5000,http://localhost:5173')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
      if (allowed.includes(origin)) return callback(null, true);
      return callback(null, false);
    },
    credentials: true,
  }),
);

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Хэт олон хүсэлт илгээгдлээ. Түр хүлээгээд дахин оролдоно уу.' },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Нэвтрэх оролдлого хэт олон байна. Түр хүлээгээд дахин оролдоно уу.' },
});

function parseTags(value) {
  try {
    const tags = JSON.parse(value || '[]');
    return Array.isArray(tags) ? tags.filter((tag) => typeof tag === 'string') : [];
  } catch {
    return [];
  }
}

function normalizeProject(project) {
  return {
    ...project,
    tags: parseTags(project.tags),
  };
}

async function getSiteData() {
  const [profile, projects, skillCategories] = await Promise.all([
    prisma.profile.findFirst({ orderBy: { createdAt: 'asc' } }),
    prisma.project.findMany({ where: { isFeatured: true }, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] }),
    prisma.skillCategory.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      include: { skills: { orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] } },
    }),
  ]);

  return {
    profile,
    projects: projects.map(normalizeProject),
    skills: skillCategories,
  };
}

function signAdminToken() {
  return jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
}

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Admin token шаардлагатай.' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded?.role !== 'admin') throw new Error('Invalid role');
    return next();
  } catch {
    return res.status(401).json({ error: 'Token буруу эсвэл хугацаа дууссан байна.' });
  }
}

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Нэр хамгийн багадаа 2 тэмдэгт байна.').max(80),
  email: z.string().trim().email('Зөв email хаяг оруулна уу.').max(120),
  subject: z.string().trim().max(150).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Зурвас хамгийн багадаа 10 тэмдэгт байна.').max(2000),
});

const projectSchema = z.object({
  title: z.string().trim().min(2).max(120),
  description: z.string().trim().min(10).max(1000),
  tags: z.array(z.string().trim().min(1).max(30)).max(12).default([]),
  gradient: z.string().trim().max(80).default('from-blue-500/10 to-cyan-500/10'),
  accentColor: z.string().trim().max(40).default('bg-blue-500'),
  url: z.string().trim().url().optional().or(z.literal('')),
  imageUrl: z.string().trim().url().optional().or(z.literal('')),
  isFeatured: z.boolean().default(true),
  sortOrder: z.number().int().min(0).max(999).default(0),
});

const skillCategorySchema = z.object({
  name: z.string().trim().min(2).max(80),
  icon: z.string().trim().max(40).default('code'),
  sortOrder: z.number().int().min(0).max(999).default(0),
  skills: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().trim().min(1).max(80),
        level: z.number().int().min(0).max(100),
        sortOrder: z.number().int().min(0).max(999).default(0),
      }),
    )
    .max(20)
    .default([]),
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'profile-portfolio-api', timestamp: new Date().toISOString() });
});

app.get('/api/site', async (_req, res, next) => {
  try {
    res.json(await getSiteData());
  } catch (error) {
    next(error);
  }
});

app.post('/api/contact', contactLimiter, async (req, res, next) => {
  try {
    const payload = contactSchema.parse(req.body);
    const created = await prisma.message.create({
      data: {
        name: payload.name,
        email: payload.email,
        subject: payload.subject || null,
        message: payload.message,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'] || null,
      },
    });

    res.status(201).json({
      ok: true,
      message: 'Зурвас амжилттай хадгалагдлаа.',
      id: created.id,
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/admin/login', loginLimiter, (req, res) => {
  const password = String(req.body?.password || '');

  if (!ADMIN_PASSWORD || ADMIN_PASSWORD === 'change-this-strong-password') {
    return res.status(500).json({
      error: 'ADMIN_PASSWORD тохируулаагүй байна. .env файл дээр хүчтэй нууц үг тохируулна уу.',
    });
  }

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Нууц үг буруу байна.' });
  }

  res.json({ token: signAdminToken() });
});

app.get('/api/admin/messages', requireAdmin, async (req, res, next) => {
  try {
    const status = typeof req.query.status === 'string' ? req.query.status : undefined;
    const messages = await prisma.message.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

app.patch('/api/admin/messages/:id/read', requireAdmin, async (req, res, next) => {
  try {
    const message = await prisma.message.update({
      where: { id: req.params.id },
      data: { status: 'read' },
    });
    res.json(message);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/admin/messages/:id', requireAdmin, async (req, res, next) => {
  try {
    await prisma.message.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

app.get('/api/admin/dashboard', requireAdmin, async (_req, res, next) => {
  try {
    const [site, unreadMessages, totalMessages] = await Promise.all([
      getSiteData(),
      prisma.message.count({ where: { status: 'unread' } }),
      prisma.message.count(),
    ]);
    res.json({ ...site, stats: { unreadMessages, totalMessages } });
  } catch (error) {
    next(error);
  }
});

app.post('/api/admin/projects', requireAdmin, async (req, res, next) => {
  try {
    const payload = projectSchema.parse(req.body);
    const project = await prisma.project.create({
      data: { ...payload, tags: JSON.stringify(payload.tags), url: payload.url || null, imageUrl: payload.imageUrl || null },
    });
    res.status(201).json(normalizeProject(project));
  } catch (error) {
    next(error);
  }
});

app.put('/api/admin/projects/:id', requireAdmin, async (req, res, next) => {
  try {
    const payload = projectSchema.partial().parse(req.body);
    const data = { ...payload };
    if (payload.tags) data.tags = JSON.stringify(payload.tags);
    if (payload.url === '') data.url = null;
    if (payload.imageUrl === '') data.imageUrl = null;

    const project = await prisma.project.update({ where: { id: req.params.id }, data });
    res.json(normalizeProject(project));
  } catch (error) {
    next(error);
  }
});

app.delete('/api/admin/projects/:id', requireAdmin, async (req, res, next) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

app.post('/api/admin/skills/categories', requireAdmin, async (req, res, next) => {
  try {
    const payload = skillCategorySchema.parse(req.body);
    const category = await prisma.skillCategory.create({
      data: {
        name: payload.name,
        icon: payload.icon,
        sortOrder: payload.sortOrder,
        skills: {
          create: payload.skills.map((skill, index) => ({
            name: skill.name,
            level: skill.level,
            sortOrder: skill.sortOrder || index + 1,
          })),
        },
      },
      include: { skills: true },
    });
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
});

app.put('/api/admin/skills/categories/:id', requireAdmin, async (req, res, next) => {
  try {
    const payload = skillCategorySchema.partial().parse(req.body);
    const category = await prisma.skillCategory.update({
      where: { id: req.params.id },
      data: {
        name: payload.name,
        icon: payload.icon,
        sortOrder: payload.sortOrder,
      },
      include: { skills: true },
    });
    res.json(category);
  } catch (error) {
    next(error);
  }
});

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'API route олдсонгүй.' });
});

app.use(express.static(distDir));
app.get('*', (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.use((error, _req, res, _next) => {
  console.error(error);

  if (error instanceof z.ZodError) {
    return res.status(400).json({
      error: 'Оруулсан мэдээлэл буруу байна.',
      details: error.issues.map((issue) => issue.message),
    });
  }

  if (error?.code === 'P2025') {
    return res.status(404).json({ error: 'Өгөгдөл олдсонгүй.' });
  }

  return res.status(500).json({ error: 'Сервер дээр алдаа гарлаа.' });
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
