import { useEffect, useState } from "react";
import { getSiteData, Project } from "../lib/api";

const fallbackProjects: Project[] = [
  {
    title: "Personal Portfolio Website",
    description: "Өөрийн танилцуулга, ур чадвар, төслүүд, холбоо барих хэсэгтэй responsive portfolio website.",
    tags: ["React", "Tailwind CSS", "Responsive"],
    gradient: "from-blue-500/10 to-cyan-500/10",
    accentColor: "bg-blue-500",
    url: "https://github.com/Online6510",
  },
  {
    title: "Student Project Dashboard",
    description: "Оюутны даалгавар, төсөл, явцыг цэгцтэй харах dashboard загвар. Энгийн, ойлгомжтой UI-тэй.",
    tags: ["TypeScript", "UI Design", "Dashboard"],
    gradient: "from-purple-500/10 to-pink-500/10",
    accentColor: "bg-purple-500",
    url: "https://github.com/Online6510",
  },
  {
    title: "Online Shop UI Concept",
    description: "Бүтээгдэхүүн, сагс, хайлт, дэлгэрэнгүй хуудастай онлайн худалдааны frontend загвар.",
    tags: ["HTML", "CSS", "JavaScript"],
    gradient: "from-green-500/10 to-emerald-500/10",
    accentColor: "bg-green-500",
    url: "https://github.com/Online6510",
  },
  {
    title: "Fullstack Contact System",
    description: "Хэрэглэгчээс ирсэн зурвасыг backend API-аар хүлээн авч хадгалах жижиг fullstack систем.",
    tags: ["Node.js", "Express", "Database"],
    gradient: "from-orange-500/10 to-red-500/10",
    accentColor: "bg-orange-500",
    url: "https://github.com/Online6510",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    getSiteData()
      .then((data) => {
        if (data.projects?.length) setProjects(data.projects);
      })
      .catch(() => setProjects(fallbackProjects));
  }, []);

  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent"></div>
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20 mb-6"><div className="w-2 h-2 rounded-full bg-primary"></div>Портфолио</span>
          <h2 className="mb-6 text-4xl lg:text-5xl">Онцлох төслүүд</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Миний хийж туршсан болон цааш хөгжүүлэх боломжтой веб төслийн санаанууд.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={project.id || index} className="group relative p-8 bg-card rounded-3xl border border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${project.accentColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  </div>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity" aria-label={`${project.title} link`}>
                      <svg className="w-5 h-5 text-muted-foreground hover:text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  )}
                </div>
                <h3 className="mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg border border-border group-hover:border-primary/20 transition-colors">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
