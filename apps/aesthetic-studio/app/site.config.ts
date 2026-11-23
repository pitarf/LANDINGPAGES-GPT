// Replace these demo values with the client's verified business information.
const whatsappNumber = "5521999999999"; // Demo number: replace before publishing.
const whatsappMessage = "Olá! Gostaria de agendar uma avaliação.";

export const siteMetadata = { title: "Maison Aura | Estética & Bem-estar", description: "Modelo demonstrativo de clínica de estética. Personalize os dados e valide os serviços antes de publicar." } as const;

export const site = {
  name: "MAISON AURA",
  descriptor: "ESTÉTICA & BEM-ESTAR",
  city: "RIO DE JANEIRO",
  since: "DESDE 2018",
  hours: "SEG–SEX · 9H ÀS 19H",
  whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  instagramUrl: "https://instagram.com" // Replace with the client's official profile.
} as const;
