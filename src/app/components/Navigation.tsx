import { useState, useEffect } from "react";

const navItems = [
  { href: "#about", label: "Танилцуулга" },
  { href: "#skills", label: "Ур чадвар" },
  { href: "#projects", label: "Төслүүд" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/85 backdrop-blur-lg border-b border-border shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-primary-foreground font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-lg hidden sm:block">Temuulen</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                {item.label}
              </a>
            ))}
            <a href="#contact" className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all hover:scale-105">
              Холбоо барих
            </a>
          </div>

          <a href="#contact" className="md:hidden text-sm px-4 py-2 bg-primary text-primary-foreground rounded-lg">
            Холбогдох
          </a>
        </div>
      </div>
    </nav>
  );
}
