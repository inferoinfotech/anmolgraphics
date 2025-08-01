import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Scroll } from "lucide-react";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const geistSans = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"], // Ensuring all weights are included
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"], // Ensuring all weights are included
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "Anmol Graphics",
  description: "Manufacturers of School ID Cards, Company ID Cards, and RFID Cards.",
  icons: "/assets/images/icon.png"
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className="bg-white text-gray-900">
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ScrollToTopButton />
      </body>
    </html >
  );
}
