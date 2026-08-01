import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { RecluStoreProvider } from "@/lib/store/reclu-store";
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
  title: {
    default: "Reclu — Bolsa de trabajo by ProgramBI",
    template: "%s | Reclu",
  },
  description:
    "Encuentra empleo en Latinoamérica. Perfiles profesionales, vacantes claras y chat con reclutadores. By ProgramBI.",
  keywords: [
    "bolsa de trabajo",
    "empleos LATAM",
    "trabajo Latinoamérica",
    "ProgramBI",
    "Reclu",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <RecluStoreProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </RecluStoreProvider>
      </body>
    </html>
  );
}
