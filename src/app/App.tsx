import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Admin from "./components/Admin";

export default function App() {
  const isAdmin = typeof window !== "undefined" && window.location.pathname.startsWith("/admin");

  if (isAdmin) {
    return <Admin />;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />

      <footer className="relative py-12 text-center border-t border-border bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">T</span>
            </div>
            <p className="text-muted-foreground">
              Temuulen — Web Developer Portfolio
            </p>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6"></div>

          <p className="text-muted-foreground/60 text-sm">
            &copy; 2026 Temuulen Portfolio. Бүх эрх хуулиар хамгаалагдсан.
          </p>
        </div>
      </footer>
    </div>
  );
}
