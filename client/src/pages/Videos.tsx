import React, { useState } from "react";
import { ExternalLink, Play, Video, Youtube } from "lucide-react";
import { videoCatalog, type VideoCategory, type VideoItem } from "@/data/videoCatalog";
import { Button } from "@/components/ui/button";
import { ShareActions } from "@/components/ShareActions";

const categories: VideoCategory[] = ["Fundamentos", "Machine Learning", "LLMs e Transformers", "IA Responsável"];

export default function Videos() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(videoCatalog[0]);

  const filteredVideos = selectedCategory === "Todos" ? videoCatalog : videoCatalog.filter(video => video.category === selectedCategory);

  return (
    <div className="w-full">
      <section className="border-b border-border bg-gradient-to-br from-red-500/10 via-background to-primary/10 py-16">
        <div className="container space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-sm text-red-400">
            <Video className="size-4" />
            Vídeo-aulas gratuitas de IA
          </div>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Aprenda IA assistindo e praticando</h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Playlists e cursos oficiais gratuitos sobre fundamentos, Machine Learning, LLMs e IA responsável. Os vídeos permanecem hospedados nas plataformas originais.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant={selectedCategory === "Todos" ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory("Todos")}>Todos os vídeos</Button>
            {categories.map(category => (
              <Button key={category} variant={selectedCategory === category ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(category)}>{category}</Button>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
            <div className="aspect-video bg-black">
              {selectedVideo.embedUrl.includes("youtube.com") ? (
                <iframe className="h-full w-full" src={selectedVideo.embedUrl} title={selectedVideo.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center text-white">
                  <Video className="size-12 text-primary" />
                  <p>Este recurso é uma aula oficial hospedada na página do Google AI.</p>
                  <Button asChild><a href={selectedVideo.sourceUrl} target="_blank" rel="noreferrer">Abrir aula oficial <ExternalLink className="ml-2 size-4" /></a></Button>
                </div>
              )}
            </div>
            <div className="space-y-4 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{selectedVideo.category}</span>
                <ShareActions title={selectedVideo.title} text={`Assista à aula gratuita de IA: ${selectedVideo.title}`} url={selectedVideo.sourceUrl} />
              </div>
              <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{selectedVideo.description}</p>
              <p className="text-xs text-secondary">{selectedVideo.freeNote} Fonte: {selectedVideo.provider}.</p>
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm"><a href={selectedVideo.sourceUrl} target="_blank" rel="noreferrer"><Youtube className="mr-2 size-4 text-red-400" />Abrir fonte original</a></Button>
                {selectedVideo.colabUrl && <Button asChild variant="outline" size="sm"><a href={selectedVideo.colabUrl} target="_blank" rel="noreferrer">Abrir Colab / prática</a></Button>}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Catálogo gratuito</p>
            {filteredVideos.map(video => (
              <button key={video.id} type="button" onClick={() => setSelectedVideo(video)} className={`flex w-full gap-3 rounded-xl border p-4 text-left transition-all ${selectedVideo.id === video.id ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/40"}`}>
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400"><Play className="size-5 fill-current" /></div>
                <span className="min-w-0"><strong className="block truncate text-sm">{video.title}</strong><span className="mt-1 block text-xs text-muted-foreground">{video.provider} · {video.durationLabel}</span></span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
