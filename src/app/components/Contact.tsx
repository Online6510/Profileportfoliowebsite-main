import { FormEvent, useState } from "react";
import { sendContactMessage } from "../lib/api";

const contactInfo = {
  email: "tk20060320@gmail.com",
  phone: "+976 95124438",
  location: "3,4-р хороолол, Улаанбаатар",
  github: "https://github.com/Online6510",
  facebook: "https://www.facebook.com/search/top?q=Erdenesaruul%20Temuulen",
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await sendContactMessage(form);
      setSuccess(response.message || "Зурвас амжилттай илгээгдлээ.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Зурвас илгээхэд алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            Холбогдох
          </span>
          <h2 className="mb-6 text-4xl lg:text-5xl">Холбоо барих</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Веб сайт, frontend, жижиг fullstack төсөл эсвэл хамтын ажиллагааны талаар холбогдоорой.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2 grid gap-6">
            <a href={`mailto:${contactInfo.email}`} className="group p-7 bg-gradient-to-br from-card to-card/50 rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h4 className="mb-2">Email</h4>
              <p className="text-muted-foreground text-sm break-all">{contactInfo.email}</p>
            </a>

            <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="group p-7 bg-gradient-to-br from-card to-card/50 rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <h4 className="mb-2">Утас</h4>
              <p className="text-muted-foreground text-sm">{contactInfo.phone}</p>
            </a>

            <div className="group p-7 bg-gradient-to-br from-card to-card/50 rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h4 className="mb-2">Байршил</h4>
              <p className="text-muted-foreground text-sm">{contactInfo.location}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors text-center">GitHub</a>
              <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors text-center">Facebook</a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-3 p-8 lg:p-10 bg-gradient-to-br from-card to-card/50 rounded-3xl border border-border shadow-2xl">
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <label className="grid gap-2"><span className="text-sm text-muted-foreground">Нэр</span><input required minLength={2} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary transition-colors" placeholder="Таны нэр" /></label>
              <label className="grid gap-2"><span className="text-sm text-muted-foreground">Email</span><input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary transition-colors" placeholder="name@example.com" /></label>
            </div>

            <label className="grid gap-2 mb-5"><span className="text-sm text-muted-foreground">Гарчиг</span><input value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary transition-colors" placeholder="Төслийн санал, асуулт..." /></label>
            <label className="grid gap-2 mb-6"><span className="text-sm text-muted-foreground">Зурвас</span><textarea required minLength={10} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} rows={7} className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary transition-colors resize-none" placeholder="Холбогдох шалтгаан, төсөл эсвэл асуултаа бичээрэй..." /></label>

            {success && <div className="mb-5 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-green-700 dark:text-green-300">{success}</div>}
            {error && <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-700 dark:text-red-300">{error}</div>}

            <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100">
              {loading ? "Илгээж байна..." : "Зурвас илгээх"}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
