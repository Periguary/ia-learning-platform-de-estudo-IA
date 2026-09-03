import { FormEvent, useState } from "react";
import { CheckCircle2, HeartHandshake, Handshake, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

const offers = [
  { title: "Apoie o conteúdo gratuito", description: "Ajude a manter aulas, laboratórios e recursos abertos para mais alunos.", icon: HeartHandshake, accent: "text-cyan-300" },
  { title: "Mentoria e revisão", description: "Demonstre interesse em encontros, revisão de portfólio ou acompanhamento de projetos.", icon: Sparkles, accent: "text-lime-300" },
  { title: "Parcerias educacionais", description: "Converse sobre workshops, desafios corporativos e trilhas para equipes.", icon: Handshake, accent: "text-violet-300" },
];

export default function Support() {
  const [form, setForm] = useState({ name: "", email: "", interest: "mentoria" as "apoio" | "mentoria" | "produto" | "parceria", message: "", consent: false });
  const [submitted, setSubmitted] = useState(false);
  const submitInterest = trpc.monetization.submitInterest.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm({ name: "", email: "", interest: "mentoria", message: "", consent: false });
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);
    if (!form.consent) return;
    submitInterest.mutate({ ...form, consent: true });
  };

  return (
    <main className="futurist-grid min-h-screen py-12">
      <div className="container space-y-12">
        <header className="max-w-3xl space-y-5">
          <p className="futurist-kicker">Apoie a IA Academy</p>
          <h1 className="text-4xl font-black uppercase tracking-[-0.05em] md:text-6xl">Aprendizado aberto. Próximos passos sustentáveis.</h1>
          <p className="text-lg leading-8 text-muted-foreground">A trilha principal, o Laboratório Profissional e os recursos gratuitos continuam disponíveis. Esta página organiza formas opcionais de apoiar o projeto ou demonstrar interesse em experiências complementares.</p>
          <div className="rounded-xl border border-cyan-400/25 bg-cyan-400/5 p-4 text-sm text-muted-foreground"><strong className="text-cyan-200">Transparência:</strong> não há cobrança automática nesta página, não existe promessa de renda ou emprego e nenhum certificado externo é emitido pela IA Academy.</div>
        </header>

        <section className="grid gap-5 md:grid-cols-3" aria-label="Formas de apoiar a plataforma">
          {offers.map(({ title, description, icon: Icon, accent }) => (
            <article key={title} className="futurist-panel p-6 transition-transform duration-200 hover:-translate-y-1">
              <Icon className={`mb-5 size-7 ${accent}`} aria-hidden="true" />
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            <p className="futurist-kicker">Oferta opcional</p>
            <h2 className="text-3xl font-bold">O que pode ser desenvolvido depois</h2>
            <p className="leading-7 text-muted-foreground">Com demanda validada, a plataforma poderá oferecer produtos próprios, como notebooks comentados, projetos de portfólio, encontros de revisão e trilhas avançadas. O conteúdo gratuito não será bloqueado por essas ofertas.</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {["Projetos completos com critérios de avaliação", "Revisão humana de portfólio e currículo", "Workshops ao vivo para pequenos grupos", "Materiais próprios com licença de uso clara"].map(item => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-lime-300" />{item}</li>)}
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="futurist-panel space-y-5 p-6" aria-labelledby="interest-title">
            <div><p className="futurist-kicker">Lista de interesse</p><h2 id="interest-title" className="mt-2 text-2xl font-bold">Conte qual experiência interessa a você</h2><p className="mt-2 text-sm text-muted-foreground">Usaremos estes dados apenas para responder ao seu interesse. O consentimento é obrigatório.</p></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium">Nome<input required minLength={2} maxLength={160} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary" /></label>
              <label className="space-y-2 text-sm font-medium">E-mail<input required type="email" maxLength={320} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary" /></label>
            </div>
            <label className="block space-y-2 text-sm font-medium">Interesse<select value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value as typeof form.interest })} className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary"><option value="apoio">Apoiar o conteúdo gratuito</option><option value="mentoria">Mentoria e revisão</option><option value="produto">Produto digital próprio</option><option value="parceria">Parceria educacional</option></select></label>
            <label className="block space-y-2 text-sm font-medium">Mensagem opcional<textarea maxLength={2000} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4} className="mt-1 w-full resize-y rounded-md border border-border bg-background/60 px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary" placeholder="Que resultado você gostaria de alcançar?" /></label>
            <label className="flex items-start gap-3 text-sm text-muted-foreground"><input required type="checkbox" checked={form.consent} onChange={e => setForm({ ...form, consent: e.target.checked })} className="mt-1 size-4 accent-cyan-400" />Aceito que a IA Academy use meu nome e e-mail para responder a este interesse. Não enviaremos mensagens sem relação com este contato.</label>
            {submitInterest.error && <p role="alert" className="text-sm text-red-300">{submitInterest.error.message}</p>}
            {submitted && <p role="status" className="flex items-center gap-2 text-sm text-lime-300"><CheckCircle2 className="size-4" />Interesse registrado. Obrigado pelo apoio ao projeto.</p>}
            <Button type="submit" disabled={submitInterest.isPending} className="futurist-button w-full sm:w-auto"><Mail className="mr-2 size-4" />{submitInterest.isPending ? "Registrando..." : "Demonstrar interesse"}</Button>
          </form>
        </section>
      </div>
    </main>
  );
}
