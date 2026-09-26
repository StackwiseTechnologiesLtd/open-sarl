import type { Metadata } from "next";
import { Hanken_Grotesk, IBM_Plex_Sans, Inter } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-hanken",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-plex",
});

export const metadata: Metadata = {
  title: {
    default: "OPEN | Conseil stratégique en infrastructures publiques",
    template: "%s | OPEN",
  },
  description:
    "OPEN SARL conseille les décideurs publics pour transformer les priorités d'infrastructure en programmes bancables et en exécution ancrée localement.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${hanken.variable} ${inter.variable} ${plex.variable}`}>
      <body className="bg-surface font-body-md text-body-md text-on-surface antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-white focus:px-4 focus:py-2"
        >
          Aller au contenu
        </a>
        <Header />
        <div id="contenu">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
