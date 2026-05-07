const highlights = [
  { title: "Суралцагч", text: "Програм хангамжийн чиглэлээр 3 дахь жилдээ суралцаж байна." },
  { title: "Цэвэр код", text: "Ойлгомжтой бүтэц, дахин ашиглах боломжтой компонент бичихийг зорьдог." },
  { title: "UI мэдрэмж", text: "Хэрэглэхэд хялбар, цэгцтэй, responsive интерфэйс хийх дуртай." },
];

export default function About() {
  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-background via-secondary/10 to-background">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            Танилцуулга
          </span>
          <h2 className="mb-6 text-4xl lg:text-5xl">Миний тухай</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Би Temuulen. Веб хөгжүүлэлт, програм хангамж, хэрэглэгчид ойлгомжтой интерфэйс бүтээх чиглэлээр суралцаж байна.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3 space-y-8">
            <div className="p-8 bg-card rounded-3xl border border-border shadow-xl">
              <p className="text-lg text-foreground/90 leading-relaxed mb-5">
                Сайн байна уу! 👋 Би Их Засаг олон улсын их сургуулийн КПХ-322 бүлгийн програм хангамжийн оюутан.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Миний зорилго бол орчин үеийн технологи ашиглан хурдан, цэвэрхэн, хэрэглэхэд хялбар веб сайт болон веб аппликейшн бүтээх. Шинэ зүйл сурах, өөрийн кодоо сайжруулах, бодит хэрэглээнд ойр төсөл хийхийг илүүд үздэг.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {["HTML", "CSS", "JavaScript", "React", "Node.js", "Tailwind CSS", "Git", "Figma", "Database"].map((tech) => (
                <span key={tech} className="px-4 py-2 bg-primary/5 text-primary border border-primary/20 rounded-lg text-sm hover:bg-primary/10 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 grid gap-6">
            <div className="p-6 bg-card rounded-2xl border border-border">
              <h3 className="mb-4">Үндсэн мэдээлэл</h3>
              <div className="space-y-4 text-sm">
                <div><p className="text-muted-foreground">Нэр</p><p className="font-medium">Temuulen</p></div>
                <div><p className="text-muted-foreground">Чиглэл</p><p className="font-medium">Web Developer</p></div>
                <div><p className="text-muted-foreground">Сургууль</p><p className="font-medium">Их Засаг ОУИС, КПХ-322</p></div>
                <div><p className="text-muted-foreground">Байршил</p><p className="font-medium">3,4-р хороолол, Улаанбаатар</p></div>
              </div>
            </div>

            <div className="grid gap-4">
              {highlights.map((item) => (
                <div key={item.title} className="group p-5 bg-gradient-to-br from-card to-card/50 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300">
                  <h4 className="mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
