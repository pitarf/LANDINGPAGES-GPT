// Replace demo values with verified business information before publishing.
const whatsappNumber = "";
const whatsappMessage = "Olá! Gostaria de agendar uma avaliação.";

export const siteMetadata = { title: "Maison Aura | Estética & Bem-estar", description: "Modelo demonstrativo de clínica de estética. Personalize os dados e valide os serviços antes de publicar." } as const;

export const site = {
  name: "MAISON AURA",
  descriptor: "ESTÉTICA & BEM-ESTAR",
  city: "",
  since: "MODELO DEMONSTRATIVO",
  hours: "",
  address: "",
  phone: "",
  email: "",
  whatsappUrl: whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}` : "#contato",
  instagramUrl: ""
} as const;

// Add only professionals and client-approved material supplied by the business.
export const professionals: { name: string; role: string; credential: string; bio: string; photo: string }[] = [];
export const testimonials: { quote: string; author: string; context: string }[] = [];
export const resultsGallery: { title: string; description: string; image: string; alt: string }[] = [];
