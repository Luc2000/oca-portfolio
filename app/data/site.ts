export const site = {
  name: "OCA Software House",
  shortName: "OCA",
  url: "https://oca.dev.br",
  description:
    "Software house em São Paulo especializada em MVPs, aplicativos, sistemas e produtos com IA. Mais de 40 mil pessoas usam o que a gente construiu.",
  phone: "+55 11 94962-9527",
  whatsapp: "5511949629527",
  location: "São Paulo, SP - Brasil",
  github: "https://github.com/Luc2000",
  linkedin: "https://www.linkedin.com/in/lucasannunziato/",
};

export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsappMessage =
  "Olá Lucas, vim pelo site da OCA e gostaria de discutir um projeto.";
