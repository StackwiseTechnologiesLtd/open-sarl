import type { Metadata } from "next";
import { Hanken_Grotesk, IBM_Plex_Sans, Inter } from "next/font/google";
import { headers } from "next/headers";
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
  title: "OPEN",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = (await headers()).get("x-locale") === "en" ? "en" : "fr";

  return (
    <html lang={locale} className={`${hanken.variable} ${inter.variable} ${plex.variable}`}>
      <body className="bg-surface font-body-md text-body-md text-on-surface antialiased">{children}</body>
    </html>
  );
}
