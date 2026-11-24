// Replace demo values with verified business information before publishing.
const whatsappNumber = "";
const whatsappMessage = "Olá! Gostaria de agendar uma avaliação.";

export const siteMetadata = { title: "Atelier Oral | Odontologia Integrada", description: "Modelo demonstrativo de clínica odontológica. Personalize os dados, equipe e credenciais antes de publicar." } as const;

export const site = {
  name: "ATELIER ORAL",
  descriptor: "ODONTOLOGIA INTEGRADA",
  city: "",
  hours: "",
  address: "",
  phone: "",
  email: "",
  whatsappUrl: whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}` : "#contato",
  instagramUrl: ""
} as const;

// Use verified professional registration details and authorized patient material only.
export const professionals: { name: string; role: string; credential: string; bio: string; photo: string }[] = [];
export const testimonials: { quote: string; author: string; context: string }[] = [];
export const resultsGallery: { title: string; description: string; image: string; alt: string }[] = [];
