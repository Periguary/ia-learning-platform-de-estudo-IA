import React from "react";
import { ArrowRight, TrendingUp, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { careerCatalog } from "@/data/careerCatalog";

export default function Careers() {
  const [, navigate] = useLocation();
  const careers = careerCatalog;

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-16 border-b border-border">
        <div className="container space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Oportunidades de Carreira</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Explore 6 perfis profissionais em IA com diferentes especializações e níveis de experiência.
          </p>
        </div>
      </section>

      {/* Careers Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careers.map((career, index) => (
              <button
                key={`career-${career.id}`}
                onClick={() => navigate(`/career/${career.id}`)}
                className="group h-full p-6 border border-border rounded-xl bg-card hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col text-left"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                  {/* Icon */}
                  <div className="text-5xl mb-4">{career.icon}</div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {career.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 flex-1">
                    {career.description}
                  </p>

                  {/* Salary */}
                  <div className="mb-4 p-3 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Salário Médio</p>
                    <p className="font-semibold text-primary">{career.salary}</p>
                  </div>

                  {/* Experience */}
                  <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    <span>{career.experience}</span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <span className="text-xs font-semibold text-muted-foreground">
                      {career.skills.length} habilidades
                    </span>
                    <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                      <span className="text-sm font-semibold">Explorar</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 border-t border-border bg-card/50">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold">Comparação de Carreiras</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Veja como as diferentes carreiras em IA se comparam.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold">Profissão</th>
                  <th className="text-left py-4 px-4 font-semibold">Dificuldade</th>
                  <th className="text-left py-4 px-4 font-semibold">Salário</th>
                  <th className="text-left py-4 px-4 font-semibold">Experiência</th>
                </tr>
              </thead>
              <tbody>
                {careers.map((career) => (
                  <tr key={career.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 font-medium">{career.title}</td>
                    <td className="py-4 px-4 text-muted-foreground">Intermediário</td>
                    <td className="py-4 px-4 text-primary font-semibold">{career.salary}</td>
                    <td className="py-4 px-4 text-muted-foreground">{career.experience}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border">
        <div className="container text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Escolha Seu Caminho</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cada carreira tem seu próprio roadmap personalizado. Comece sua trilha de aprendizado hoje.
            </p>
          </div>

          <button
            onClick={() => navigate("/learning-path")}
            className="btn-primary inline-flex items-center gap-2"
          >
            Explorar Trilha de Aprendizado <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
