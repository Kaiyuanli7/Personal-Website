import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import localFont from 'next/font/local';
import dynamic from 'next/dynamic';
import "./globals.css";
import "../styles/cursor.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { ScrollProvider } from "@/context/ScrollContext";
import { CursorProvider } from "@/context/CursorContext";
import { ContactProvider } from "@/context/ContactContext";
import ScrollToTop from "./ScrollToTop";
import { Analytics } from "@vercel/analytics/react";

// Dynamically import non-critical UI components
const Cursor = dynamic(() => import('@/components/ui/Cursor'), {
  ssr: false,
});

const CursorTrail = dynamic(() => import('@/components/ui/CursorTrail'), {
  ssr: false,
});

const SocialOverlay = dynamic(() => import('@/components/ui/SocialOverlay'), {
  ssr: false,
});

// Dynamically import contact overlay with loading state
const ContactOverlay = dynamic(() => import('@/components/ui/ContactOverlay'), {
  ssr: false,
  loading: () => <div className="hidden">Loading contact form...</div>,
});

const titillium = Titillium_Web({ 
  subsets: ["latin"],
  weight: ['200', '300', '400', '600', '700', '900'],
  variable: '--font-titillium'
});

const luxurious = localFont({
  src: '../lib/LuxuriousScript-Regular.ttf',
  variable: '--font-luxurious',
});

export const metadata: Metadata = {
  title: "Kai",
  description: "My creative portfolio showcasing my work and projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${titillium.className} ${luxurious.variable} ${titillium.variable}`}>
        <ScrollProvider>
          <CursorProvider>
            <ContactProvider>
            <Cursor />
            <CursorTrail />
            <Navigation />
            <main>{children}</main>
            <Footer />
            <SocialOverlay />
            <ContactOverlay />
            <ScrollToTop />
            </ContactProvider>
          </CursorProvider>
        </ScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}
