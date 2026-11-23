import type { Metadata } from "next";
import { siteMetadata } from "./site.config";
import "./globals.css";
export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  robots: { index: false, follow: false }
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}