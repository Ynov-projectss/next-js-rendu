import type { Metadata } from "next";
import { PrismicPreview } from "@prismicio/next";
import { Geist, Geist_Mono } from "next/font/google";

import { AppHeader } from "@/components/header/AppHeader";
import { repositoryName } from "@/prismicio";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Offres d'emploi",
  description: "Mini-application de consultation d'offres d'emploi avec Prismic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppHeader />
        <div className="flex-1">{children}</div>
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
