import { useEffect, useState } from "react";
import { getSiteData, SkillCategory } from "../lib/api";

const fallbackSkills: SkillCategory[] = [
  {
    name: "Frontend",
    icon: "code",
    skills: [
      { name: "HTML", level: 88 },
      { name: "CSS", level: 86 },
      { name: "JavaScript", level: 82 },
      { name: "React", level: 78 },
    ],
  },
  {
    name: "Backend",
    icon: "server",
    skills: [
      { name: "Node.js", level: 74 },
      { name: "Express API", level: 70 },
      { name: "REST API", level: 72 },
      { name: "Authentication basics", level: 68 },
    ],
  },
  {
    name: "Database",
    icon: "database",
    skills: [
      { name: "SQL", level: 74 },
      { name: "SQLite", level: 72 },
      { name: "PostgreSQL basics", level: 68 },
      { name: "Data modeling", level: 70 },
    ],
  },
  {
    name: "Tools & Design",
    icon: "settings",
    skills: [
      { name: "Git & GitHub", level: 80 },
      { name: "Figma", level: 76 },
      { name: "Responsive Design", level: 84 },
      { name: "Deployment basics", level: 70 },
    ],
  },
];

function SkillIcon({ type }: { type?: string }) {
  if (type === "server") {
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    );
  }

  if (type === "database") {
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4-3.582 4-8 4-8-1.79-8-4zm0 5c0 2.21 3.582 4 8 4s8-1.79 8-4M4 17c0 2.21 3.582 4 8 4s8-1.79 8-4" />
      </svg>
    );
  }

  if (type === "settings") {
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  }

  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState<SkillCategory[]>(fallbackSkills);

  useEffect(() => {
    getSiteData()
      .then((data) => {
        if (data.skills?.length) setSkills(data.skills);
      })
      .catch(() => setSkills(fallbackSkills));
  }, []);

  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            Чадвар
          </span>
          <h2 className="mb-6 text-4xl lg:text-5xl">Ур чадвар</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Веб сайт хийхэд ашигладаг үндсэн технологи, хэрэгслүүд.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skillGroup, index) => (
            <div
              key={skillGroup.id || index}
              className="group p-8 bg-gradient-to-br from-card to-card/50 rounded-2xl border border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/50 text-primary-foreground flex items-center justify-center group-hover:scale-110 transition-transform">
                  <SkillIcon type={skillGroup.icon} />
                </div>
                <h3 className="text-primary">{skillGroup.name}</h3>
              </div>

              <div className="space-y-4">
                {skillGroup.skills.map((skill, skillIndex) => (
                  <div key={skill.id || skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-foreground">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
