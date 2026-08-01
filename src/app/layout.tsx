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
    default: "Reclu — Bolsa de trabajo tech by ProgramBI",
    template: "%s | Reclu",
  },
  description:
    "Encuentra empleos de programación, data y tech en Latinoamérica. Perfiles profesionales y empresas verificadas. By ProgramBI.",
  keywords: [
    "bolsa de trabajo",
    "empleos programación",
    "tech jobs LATAM",
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
