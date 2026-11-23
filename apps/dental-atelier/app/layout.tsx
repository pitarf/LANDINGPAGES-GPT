import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Atelier Oral | Odontologia Integrada",
  description: "Odontologia contemporânea com escuta, precisão e cuidado em cada detalhe.",
  metadataBase: new URL("https://example.com")
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}