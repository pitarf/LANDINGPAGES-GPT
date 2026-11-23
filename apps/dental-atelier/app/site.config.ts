// Replace these demo values with the client's verified business information.
const whatsappNumber = "5521999999999"; // Demo number: replace before publishing.
const whatsappMessage = "Olá! Gostaria de agendar uma avaliação.";

export const siteMetadata = { title: "Atelier Oral | Odontologia Integrada", description: "Modelo demonstrativo de clínica odontológica. Personalize os dados e valide serviços, equipe e credenciais antes de publicar." } as const;

export const site = {
  name: "ATELIER ORAL",
  descriptor: "ODONTOLOGIA INTEGRADA",
  city: "RIO DE JANEIRO",
  hours: "SEG–SEX · 8H ÀS 19H",
  whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  instagramUrl: "https://instagram.com" // Replace with the client's official profile.
} as const;
