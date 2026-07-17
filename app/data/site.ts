export const site = {
  name: "OCA Software House",
  shortName: "OCA",
  url: "https://www.ocasoftwarehouse.com.br",
  description:
    "Software house em São Paulo especializada em MVPs, aplicativos mobile e sistemas web. Construímos produtos digitais de ponta a ponta para founders e empresas.",
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
