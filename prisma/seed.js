import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const profile = {
  fullName: 'Temuulen',
  headline: 'Web Developer • Програм хангамжийн оюутан',
  subheadline: 'Их Засаг ОУИС-ийн КПХ-322 бүлгийн 3-р курсын оюутан',
  bio: 'Цэвэрхэн дизайнтай, ойлгомжтой, responsive веб сайт хөгжүүлэхэд төвлөрдөг.',
  email: 'tk20060320@gmail.com',
  phone: '+976 95124438',
  location: '3,4-р хороолол, Улаанбаатар',
  githubUrl: 'https://github.com/Online6510',
  linkedinUrl: 'https://www.facebook.com/search/top?q=Erdenesaruul%20Temuulen',
  instagramUrl: 'https://www.facebook.com/search/top?q=Erdenesaruul%20Temuulen',
};

const projects = [
  { title: 'Personal Portfolio Website', description: 'Өөрийн танилцуулга, ур чадвар, төслүүд, холбоо барих хэсэгтэй responsive portfolio website.', tags: JSON.stringify(['React', 'Tailwind CSS', 'Responsive']), gradient: 'from-blue-500/10 to-cyan-500/10', accentColor: 'bg-blue-500', url: 'https://github.com/Online6510', sortOrder: 1 },
  { title: 'Student Project Dashboard', description: 'Оюутны даалгавар, төсөл, явцыг цэгцтэй харах dashboard загвар. Энгийн, ойлгомжтой UI-тэй.', tags: JSON.stringify(['TypeScript', 'UI Design', 'Dashboard']), gradient: 'from-purple-500/10 to-pink-500/10', accentColor: 'bg-purple-500', url: 'https://github.com/Online6510', sortOrder: 2 },
  { title: 'Online Shop UI Concept', description: 'Бүтээгдэхүүн, сагс, хайлт, дэлгэрэнгүй хуудастай онлайн худалдааны frontend загвар.', tags: JSON.stringify(['HTML', 'CSS', 'JavaScript']), gradient: 'from-green-500/10 to-emerald-500/10', accentColor: 'bg-green-500', url: 'https://github.com/Online6510', sortOrder: 3 },
  { title: 'Fullstack Contact System', description: 'Хэрэглэгчээс ирсэн зурвасыг backend API-аар хүлээн авч хадгалах жижиг fullstack систем.', tags: JSON.stringify(['Node.js', 'Express', 'Database']), gradient: 'from-orange-500/10 to-red-500/10', accentColor: 'bg-orange-500', url: 'https://github.com/Online6510', sortOrder: 4 },
];

const skillGroups = [
  { name: 'Frontend', icon: 'code', sortOrder: 1, skills: [['HTML', 88], ['CSS', 86], ['JavaScript', 82], ['React', 78]] },
  { name: 'Backend', icon: 'server', sortOrder: 2, skills: [['Node.js', 74], ['Express API', 70], ['REST API', 72], ['Authentication basics', 68]] },
  { name: 'Database', icon: 'database', sortOrder: 3, skills: [['SQL', 74], ['SQLite', 72], ['PostgreSQL basics', 68], ['Data modeling', 70]] },
  { name: 'Tools & Design', icon: 'settings', sortOrder: 4, skills: [['Git & GitHub', 80], ['Figma', 76], ['Responsive Design', 84], ['Deployment basics', 70]] },
];

async function main() {
  await prisma.profile.deleteMany();
  await prisma.project.deleteMany();
  await prisma.skillCategory.deleteMany();
  await prisma.profile.create({ data: profile });
  await prisma.project.createMany({ data: projects });

  for (const group of skillGroups) {
    const category = await prisma.skillCategory.create({ data: { name: group.name, icon: group.icon, sortOrder: group.sortOrder } });
    await prisma.skill.createMany({ data: group.skills.map(([name, level], index) => ({ name, level, sortOrder: index + 1, categoryId: category.id })) });
  }

  console.log('Temuulen portfolio data seeded successfully.');
}

main().catch((error) => { console.error(error); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
