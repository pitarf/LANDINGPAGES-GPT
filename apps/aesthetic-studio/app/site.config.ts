// Replace these demo values with the client's verified business information.
// Configure with the client verified WhatsApp number before publishing.
const whatsappNumber = "";
const whatsappMessage = "Olá! Gostaria de agendar uma avaliação.";

export const siteMetadata = { title: "Maison Aura | Estética & Bem-estar", description: "Modelo demonstrativo de clínica de estética. Personalize os dados e valide os serviços antes de publicar." } as const;

export const site = {
  name: "MAISON AURA",
  descriptor: "ESTÉTICA & BEM-ESTAR",
  city: "SUA CIDADE",
  since: "MODELO DEMONSTRATIVO",
  hours: "HORÁRIOS A DEFINIR",
  whatsappUrl: whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}` : "#contato",
  instagramUrl: "https://instagram.com" // Replace with the client's official profile.
} as const;
