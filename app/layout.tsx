import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
    default: "OCA Software House - Desenvolvimento de Software Personalizado",
    template: "%s | OCA Software House",
  },
  description:
    "Especialistas em desenvolvimento de software, aplicativos mobile, sistemas web e MVPs personalizados para transformar ideias em produtos digitais de sucesso.",
  keywords: [
    "desenvolvimento de software",
    "aplicativos mobile",
    "desenvolvimento web",
    "app react native",
    "website next.js",
    "mvp startup",
    "software house",
    "desenvolvimento personalizado",
  ],
  authors: [
    {
      name: "Lucas Annunziato",
      url: "https://www.linkedin.com/in/lucasannunziato/",
    },
  ],
  creator: "Lucas Annunziato",
  publisher: "OCA Software House",
  applicationName: "OCA Software House",
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://www.ocasoftwarehouse.com.br"),
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
    },
  },
  openGraph: {
    title: "OCA Software House - Desenvolvimento de Software Personalizado",
    description:
      "Especialistas em desenvolvimento de software, aplicativos mobile, sistemas web e MVPs personalizados para transformar ideias em produtos digitais de sucesso.",
    url: "https://www.ocasoftwarehouse.com.br",
    siteName: "OCA Software House",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OCA Software House",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OCA Software House - Desenvolvimento de Software Personalizado",
    description:
      "Especialistas em desenvolvimento de software, aplicativos mobile, sistemas web e MVPs personalizados.",
    images: ["/images/og-image.jpg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  category: "technology",
  icons: {
    icon: "/images/logo-icon.svg",
    shortcut: "/images/logo-icon.svg",
    apple: "/images/logo-icon.svg",
    other: {
      rel: "apple-touch-icon",
      url: "/images/logo-icon.svg",
    },
  },
  themeColor: "#171717",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#171717" />
      </head>
      <body className="bg-gray-900">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
