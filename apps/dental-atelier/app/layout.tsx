import type { Metadata } from "next";
import { siteMetadata } from "./site.config";
import "./globals.css";

export const metadata: Metadata = {
  applicationName: "Atelier Oral",
  title: siteMetadata.title,
  description: siteMetadata.description,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: "Atelier Oral"
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
