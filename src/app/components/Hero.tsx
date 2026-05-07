const socialLinks = [
  { label: "GitHub", href: "https://github.com/Online6510", icon: "github" },
  { label: "Facebook", href: "https://www.facebook.com/search/top?q=Erdenesaruul%20Temuulen", icon: "facebook" },
  { label: "Email", href: "mailto:tk20060320@gmail.com", icon: "email" },
];

function SocialIcon({ type }: { type: string }) {
  if (type === "github") {
    return <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />;
  }

  if (type === "facebook") {
    return <path d="M22 12.06C22 6.49 17.52 2 12 2S2 6.49 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.23 0-1.62.77-1.62 1.56v1.87h2.76l-.44 2.91h-2.32V22C18.34 21.24 22 17.08 22 12.06z" />;
  }

  return <path d="M2 5.5A2.5 2.5 0 014.5 3h15A2.5 2.5 0 0122 5.5v13a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 012 18.5v-13zm2.5-.5a.5.5 0 00-.5.5v.64l8 5.2 8-5.2V5.5a.5.5 0 00-.5-.5h-15zm15 14a.5.5 0 00.5-.5V8.52l-7.46 4.85a1 1 0 01-1.08 0L4 8.52v9.98a.5.5 0 00.5.5h15z" />;
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-accent/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-40 left-20 w-20 h-20 border border-primary/20 rounded-lg rotate-12 animate-[float_6s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-40 right-20 w-16 h-16 border border-accent/20 rounded-full animate-[float_8s_ease-in-out_infinite]" style={{ animationDelay: "2s" }}></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 lg:text-left text-center animate-[fadeIn_0.8s_ease-out]">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-primary">Web Developer Portfolio</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl leading-tight">
                Сайн уу, би<br />
                <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent animate-gradient">Temuulen</span>
              </h1>

              <p className="text-xl lg:text-2xl text-muted-foreground">Web Developer • Програм хангамжийн оюутан</p>
              <p className="text-base text-muted-foreground/80 max-w-xl lg:mx-0 mx-auto leading-relaxed">
                Их Засаг ОУИС-ийн КПХ-322 бүлгийн 3-р курсын оюутан. Цэвэрхэн дизайнтай, ойлгомжтой, responsive веб сайт хөгжүүлэхэд төвлөрдөг.
              </p>
            </div>

            <div className="flex gap-4 lg:justify-start justify-center flex-wrap">
              <a href="#projects" className="group px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                Төслүүд үзэх
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </a>
              <a href="#contact" className="px-8 py-4 bg-background text-foreground rounded-xl border-2 border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:scale-105">Холбоо барих</a>
            </div>

            <div className="flex gap-4 lg:justify-start justify-center pt-4">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target={social.href.startsWith("http") ? "_blank" : undefined} rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={social.label} className="w-12 h-12 rounded-xl bg-secondary/50 hover:bg-primary border border-border hover:border-primary/50 flex items-center justify-center hover:text-primary-foreground transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><SocialIcon type={social.icon} /></svg>
                </a>
              ))}
            </div>
          </div>

          <div className="relative animate-[fadeIn_1s_ease-out_0.3s_both] lg:block hidden">
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 backdrop-blur-sm"></div>
              <div className="absolute inset-8 rounded-full border-2 border-primary/30 border-dashed animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-16 rounded-full border-2 border-accent/20 border-dashed animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="absolute inset-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl"><div className="text-primary-foreground text-6xl">👨‍💻</div></div>
              <div className="absolute top-10 right-10 px-4 py-2 bg-background rounded-lg shadow-xl border border-border animate-[float_4s_ease-in-out_infinite]"><p className="text-sm">React</p></div>
              <div className="absolute bottom-20 left-0 px-4 py-2 bg-background rounded-lg shadow-xl border border-border animate-[float_5s_ease-in-out_infinite]" style={{ animationDelay: "1s" }}><p className="text-sm">Tailwind CSS</p></div>
              <div className="absolute top-40 left-10 px-4 py-2 bg-background rounded-lg shadow-xl border border-border animate-[float_6s_ease-in-out_infinite]" style={{ animationDelay: "2s" }}><p className="text-sm">Node.js</p></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-20 animate-[fadeIn_1.2s_ease-out_0.6s_both]">
          <div className="text-center p-5 md:p-6 rounded-2xl bg-gradient-to-br from-background to-secondary/20 border border-border"><div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">3</div><p className="text-muted-foreground text-sm md:text-base">Жил суралцаж байна</p></div>
          <div className="text-center p-5 md:p-6 rounded-2xl bg-gradient-to-br from-background to-secondary/20 border border-border"><div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">10+</div><p className="text-muted-foreground text-sm md:text-base">Технологи ашигладаг</p></div>
          <div className="text-center p-5 md:p-6 rounded-2xl bg-gradient-to-br from-background to-secondary/20 border border-border"><div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">100%</div><p className="text-muted-foreground text-sm md:text-base">Суралцах хүсэл</p></div>
        </div>
      </div>
    </section>
  );
}
