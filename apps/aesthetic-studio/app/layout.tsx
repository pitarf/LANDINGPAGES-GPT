import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Maison Aura | Estética & Bem-estar",
  description: "Um cuidado que revela sua melhor versão. Estética avançada, beleza natural e bem-estar.",
  metadataBase: new URL("https://example.com")
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}