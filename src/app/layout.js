import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTopButton from "@/components/ScrollToTopButton";

import MainWrapper from "@/components/MainWrapper";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  metadataBase: new URL("https://anmolgraphics.in"),
  title: {
    default: "Anmol Graphics | ID Card, Lanyard & Badge Manufacturers",
    template: "%s | Anmol Graphics",
  },
  description: "Leading manufacturer and supplier of School ID Cards, Corporate ID Cards, RFID Smart Cards, Custom Lanyards, Badges, and Identification Accessories.",
  keywords: [
    "School ID Cards",
    "Company ID Cards",
    "Corporate ID Cards",
    "RFID Cards",
    "Smart Cards",
    "Custom Lanyards",
    "ID Card Manufacturer",
    "Card Holders",
    "Badges",
    "Anmol Graphics",
  ],
  authors: [{ name: "Anmol Graphics", url: "https://anmolgraphics.in" }],
  creator: "Anmol Graphics",
  publisher: "Anmol Graphics",
  icons: {
    icon: "/assets/images/icon.png",
    shortcut: "/assets/images/icon.png",
    apple: "/assets/images/icon.png",
  },
  alternates: {
    canonical: "https://anmolgraphics.in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Anmol Graphics | ID Card, Lanyard & Badge Manufacturers",
    description: "Leading manufacturer and supplier of School ID Cards, Corporate ID Cards, RFID Smart Cards, Custom Lanyards, Badges, and Identification Accessories.",
    url: "https://anmolgraphics.in",
    siteName: "Anmol Graphics",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/assets/images/icon.png",
        width: 512,
        height: 512,
        alt: "Anmol Graphics Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anmol Graphics | ID Card, Lanyard & Badge Manufacturers",
    description: "Leading manufacturer and supplier of School ID Cards, Corporate ID Cards, RFID Smart Cards, Custom Lanyards, and Badges.",
    images: ["/assets/images/icon.png"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="sitemap" type="application/xml" href="https://anmolgraphics.in/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Anmol Graphics",
              "url": "https://anmolgraphics.in/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://anmolgraphics.in/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
        {/* Google Analytics GA4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Y8BWR6NX27"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Y8BWR6NX27');
            `,
          }}
        />
      </head>
      <body
        className="bg-white text-gray-900">
        <Navbar />
        <MainWrapper>{children}</MainWrapper>
        <Footer />
        <WhatsAppButton />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
