import { FormEvent, useEffect, useMemo, useState } from "react";
import { adminLogin, adminRequest, Message, Project, SiteData } from "../lib/api";

type DashboardData = SiteData & {
  stats: {
    unreadMessages: number;
    totalMessages: number;
  };
};

const emptyProject = {
  title: "",
  description: "",
  tags: "React, Node.js, Prisma",
  gradient: "from-blue-500/10 to-cyan-500/10",
  accentColor: "bg-blue-500",
  url: "",
  sortOrder: 10,
};

export default function Admin() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(() => localStorage.getItem("admin_token") || "");
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const unreadCount = useMemo(() => messages.filter((message) => message.status === "unread").length, [messages]);

  async function loadDashboard(currentToken = token) {
    if (!currentToken) return;
    setLoading(true);
    setError("");

    try {
      const data = await adminRequest<DashboardData>(currentToken, "/api/admin/dashboard");
      const messageList = await adminRequest<Message[]>(currentToken, "/api/admin/messages");
      setDashboard(data);
      setMessages(messageList);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Admin өгөгдөл уншихад алдаа гарлаа.");
      localStorage.removeItem("admin_token");
      setToken("");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) loadDashboard(token);
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await adminLogin(password);
      localStorage.setItem("admin_token", response.token);
      setToken(response.token);
      setPassword("");
      setSuccess("Admin амжилттай нэвтэрлээ.");
      await loadDashboard(response.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Нэвтрэхэд алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  }

  async function markRead(id: string) {
    await adminRequest(token, `/api/admin/messages/${id}/read`, { method: "PATCH" });
    await loadDashboard();
  }

  async function deleteMessage(id: string) {
    await adminRequest(token, `/api/admin/messages/${id}`, { method: "DELETE" });
    await loadDashboard();
  }

  async function addProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const tags = projectForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      await adminRequest<Project>(token, "/api/admin/projects", {
        method: "POST",
        body: JSON.stringify({
          ...projectForm,
          tags,
          isFeatured: true,
          url: projectForm.url || "",
          sortOrder: Number(projectForm.sortOrder) || 0,
        }),
      });

      setProjectForm(emptyProject);
      setSuccess("Project database-д нэмэгдлээ.");
      await loadDashboard();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Project нэмэхэд алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("admin_token");
    setToken("");
    setDashboard(null);
    setMessages([]);
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-background px-6 py-12 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-card border border-border rounded-3xl shadow-2xl">
          <a href="/" className="text-sm text-primary hover:underline">← Нүүр хуудас руу буцах</a>
          <div className="my-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20 mb-5">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              Admin dashboard
            </span>
            <h1 className="text-3xl mb-3">Нэвтрэх</h1>
            <p className="text-muted-foreground">.env дээр тохируулсан ADMIN_PASSWORD-оор нэвтэрнэ.</p>
          </div>

          <form onSubmit={handleLogin} className="grid gap-4">
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary transition-colors"
              placeholder="Admin password"
            />
            {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-700 dark:text-red-300">{error}</div>}
            <button disabled={loading} className="w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground disabled:opacity-60">
              {loading ? "Шалгаж байна..." : "Нэвтрэх"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-4 items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Fullstack Portfolio</p>
            <h1 className="text-2xl">Admin dashboard</h1>
          </div>
          <div className="flex gap-3">
            <a href="/" className="px-4 py-2 rounded-xl border border-border hover:border-primary/40 transition-colors">Нүүр</a>
            <button onClick={logout} className="px-4 py-2 rounded-xl bg-secondary border border-border hover:border-primary/40 transition-colors">Гарах</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {success && <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-green-700 dark:text-green-300">{success}</div>}
        {error && <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-700 dark:text-red-300">{error}</div>}

        <section className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-card border border-border rounded-2xl">
            <p className="text-muted-foreground mb-2">Нийт зурвас</p>
            <p className="text-4xl font-bold">{dashboard?.stats.totalMessages ?? messages.length}</p>
          </div>
          <div className="p-6 bg-card border border-border rounded-2xl">
            <p className="text-muted-foreground mb-2">Уншаагүй</p>
            <p className="text-4xl font-bold text-primary">{dashboard?.stats.unreadMessages ?? unreadCount}</p>
          </div>
          <div className="p-6 bg-card border border-border rounded-2xl">
            <p className="text-muted-foreground mb-2">Төслүүд</p>
            <p className="text-4xl font-bold">{dashboard?.projects.length ?? 0}</p>
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="p-6 bg-card border border-border rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl mb-1">Contact messages</h2>
                <p className="text-muted-foreground">Frontend contact form-оор ирсэн зурвасууд.</p>
              </div>
              <button disabled={loading} onClick={() => loadDashboard()} className="px-4 py-2 rounded-xl border border-border hover:border-primary/40 disabled:opacity-60">
                Refresh
              </button>
            </div>

            <div className="grid gap-4 max-h-[680px] overflow-auto pr-2">
              {messages.length === 0 && <p className="text-muted-foreground">Одоогоор зурвас байхгүй.</p>}
              {messages.map((message) => (
                <article key={message.id} className="p-5 rounded-2xl border border-border bg-background/60">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg">{message.subject || "Гарчиггүй зурвас"}</h3>
                      <p className="text-sm text-muted-foreground">{message.name} · {message.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(message.createdAt).toLocaleString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${message.status === "unread" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
                      {message.status}
                    </span>
                  </div>
                  <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap mb-4">{message.message}</p>
                  <div className="flex gap-2">
                    {message.status !== "read" && (
                      <button onClick={() => markRead(message.id)} className="px-3 py-2 rounded-lg border border-border hover:border-primary/40 text-sm">
                        Read болгох
                      </button>
                    )}
                    <button onClick={() => deleteMessage(message.id)} className="px-3 py-2 rounded-lg border border-red-500/30 text-red-600 text-sm">
                      Устгах
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-8">
            <form onSubmit={addProject} className="p-6 bg-card border border-border rounded-3xl">
              <h2 className="text-2xl mb-1">Project нэмэх</h2>
              <p className="text-muted-foreground mb-6">Нэмсэн project шууд database-д хадгалагдаж нүүр хуудсанд гарна.</p>

              <div className="grid gap-4">
                <input
                  required
                  value={projectForm.title}
                  onChange={(event) => setProjectForm({ ...projectForm, title: event.target.value })}
                  className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                  placeholder="Project title"
                />
                <textarea
                  required
                  minLength={10}
                  value={projectForm.description}
                  onChange={(event) => setProjectForm({ ...projectForm, description: event.target.value })}
                  className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary resize-none"
                  rows={4}
                  placeholder="Project description"
                />
                <input
                  value={projectForm.tags}
                  onChange={(event) => setProjectForm({ ...projectForm, tags: event.target.value })}
                  className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                  placeholder="Tags: React, API, Prisma"
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    value={projectForm.gradient}
                    onChange={(event) => setProjectForm({ ...projectForm, gradient: event.target.value })}
                    className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                    placeholder="Gradient class"
                  />
                  <input
                    value={projectForm.accentColor}
                    onChange={(event) => setProjectForm({ ...projectForm, accentColor: event.target.value })}
                    className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                    placeholder="Accent class"
                  />
                </div>
                <input
                  value={projectForm.url}
                  onChange={(event) => setProjectForm({ ...projectForm, url: event.target.value })}
                  className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                  placeholder="https://github.com/..."
                />
                <button disabled={loading} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground disabled:opacity-60">
                  {loading ? "Хадгалж байна..." : "Project хадгалах"}
                </button>
              </div>
            </form>

            <div className="p-6 bg-card border border-border rounded-3xl">
              <h2 className="text-2xl mb-1">Одоогийн төслүүд</h2>
              <p className="text-muted-foreground mb-6">Database-аас уншиж байгаа жагсаалт.</p>
              <div className="grid gap-3">
                {dashboard?.projects.map((project) => (
                  <div key={project.id || project.title} className="p-4 rounded-2xl bg-background/60 border border-border">
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.tags.map((tag) => <span key={tag} className="text-xs px-2 py-1 rounded-lg bg-secondary">{tag}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
