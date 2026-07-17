import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { site } from "./data/site";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "OCA Software House - Desenvolvimento de Software Personalizado",
    template: "%s | OCA Software House",
  },
  description: site.description,
  keywords: [
    "desenvolvimento de software",
    "aplicativos mobile",
    "desenvolvimento web",
    "app react native",
    "website next.js",
    "mvp startup",
    "software house",
    "software house são paulo",
    "desenvolvimento personalizado",
  ],
  authors: [{ name: "Lucas Annunziato", url: site.linkedin }],
  creator: "Lucas Annunziato",
  publisher: site.name,
  applicationName: site.name,
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(site.url),
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
    },
  },
  openGraph: {
    title: "OCA Software House - Desenvolvimento de Software Personalizado",
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OCA Software House - Desenvolvimento de Software Personalizado",
    description: site.description,
    images: ["/images/og-image.jpg"],
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  category: "technology",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/icon.svg" }],
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#131110",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/icon.svg`,
      description: site.description,
      address: {
        "@type": "PostalAddress",
        addressLocality: "São Paulo",
        addressRegion: "SP",
        addressCountry: "BR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: site.phone,
        contactType: "sales",
        availableLanguage: ["Portuguese", "English"],
      },
      founder: {
        "@type": "Person",
        name: "Lucas Annunziato",
        url: site.linkedin,
      },
      sameAs: [site.github, site.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      inLanguage: "pt-BR",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${bricolage.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-terra text-areia">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
