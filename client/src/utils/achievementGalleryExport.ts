export type AchievementGalleryExport = {
  learnerName: string;
  unlockedBadges: string[];
  totalBadges: number;
  certificationProgress: number;
};

export function createAchievementGalleryBlob(data: AchievementGalleryExport): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (typeof document === "undefined") {
      reject(new Error("A exportação de imagem precisa de um navegador."));
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = 1600;
    canvas.height = 900;
    const context = canvas.getContext("2d");
    if (!context) {
      reject(new Error("Não foi possível preparar a imagem."));
      return;
    }

    const background = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    background.addColorStop(0, "#070812");
    background.addColorStop(0.52, "#10142b");
    background.addColorStop(1, "#1b0d2d");
    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = "rgba(0, 234, 255, 0.16)";
    context.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 48) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);
      context.stroke();
    }
    for (let y = 0; y < canvas.height; y += 48) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(canvas.width, y);
      context.stroke();
    }

    context.fillStyle = "#00eaff";
    context.font = "700 24px Inter, Arial, sans-serif";
    context.fillText("IA ACADEMY // ACHIEVEMENT GRID", 92, 92);
    context.fillStyle = "#ffffff";
    context.font = "800 58px Inter, Arial, sans-serif";
    context.fillText(data.learnerName.slice(0, 30), 92, 174);
    context.fillStyle = "#a7b1ce";
    context.font = "400 24px Inter, Arial, sans-serif";
    context.fillText("Portfólio de conquistas em Inteligência Artificial", 96, 220);

    const progress = Math.max(0, Math.min(100, Math.round(data.certificationProgress)));
    context.fillStyle = "#a7b1ce";
    context.font = "700 18px Inter, Arial, sans-serif";
    context.fillText(`PROGRESSO DE CERTIFICAÇÕES  ${progress}%`, 96, 292);
    context.fillStyle = "#232843";
    context.fillRect(96, 316, 760, 18);
    const progressGradient = context.createLinearGradient(96, 316, 856, 316);
    progressGradient.addColorStop(0, "#00eaff");
    progressGradient.addColorStop(0.55, "#a855f7");
    progressGradient.addColorStop(1, "#c8ff2e");
    context.fillStyle = progressGradient;
    context.fillRect(96, 316, 760 * (progress / 100), 18);

    context.fillStyle = "#ffffff";
    context.font = "700 26px Inter, Arial, sans-serif";
    context.fillText(`${data.unlockedBadges.length}/${data.totalBadges} emblemas desbloqueados`, 96, 416);

    data.unlockedBadges.slice(0, 6).forEach((badge, index) => {
      const column = index % 3;
      const row = Math.floor(index / 3);
      const x = 96 + column * 260;
      const y = 480 + row * 130;
      context.strokeStyle = "rgba(0, 234, 255, 0.55)";
      context.fillStyle = "rgba(0, 234, 255, 0.08)";
      context.fillRect(x, y, 232, 96);
      context.strokeRect(x, y, 232, 96);
      context.fillStyle = "#c8ff2e";
      context.font = "700 20px Inter, Arial, sans-serif";
      context.fillText("◆", x + 22, y + 40);
      context.fillStyle = "#ffffff";
      context.font = "700 16px Inter, Arial, sans-serif";
      context.fillText(badge.slice(0, 22), x + 54, y + 38);
      context.fillStyle = "#a7b1ce";
      context.font = "400 13px Inter, Arial, sans-serif";
      context.fillText("CONQUISTA VALIDADA", x + 54, y + 66);
    });

    context.fillStyle = "#a7b1ce";
    context.font = "400 16px Inter, Arial, sans-serif";
    context.fillText("ialearnhub-ndm4gtgm.manus.space", 96, 828);
    canvas.toBlob(blob => {
      if (blob) resolve(blob);
      else reject(new Error("O navegador não conseguiu gerar o PNG."));
    }, "image/png", 0.95);
  });
}

export function downloadAchievementGallery(blob: Blob, filename = "ia-academy-conquistas.png") {
  if (typeof document === "undefined") return;
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}
