// Replace these demo values with the client's verified business information.
const whatsappNumber = "";
const whatsappMessage = "Olá! Gostaria de agendar uma avaliação.";

export const siteMetadata = { title: "Atelier Oral | Odontologia Integrada", description: "Modelo demonstrativo de clínica odontológica. Personalize os dados e valide serviços, equipe e credenciais antes de publicar." } as const;

export const site = {
  name: "ATELIER ORAL",
  descriptor: "ODONTOLOGIA INTEGRADA",
  city: "SUA CIDADE",
  hours: "HORÁRIOS A DEFINIR",
  whatsappUrl: whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}` : "#contato",
  instagramUrl: ""
} as const;
