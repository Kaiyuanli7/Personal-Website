import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import "../styles/cursor.css";
import "../styles/pageTransition.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { ScrollProvider } from "@/context/ScrollContext";
import { CursorProvider } from "@/context/CursorContext";
import { ContactProvider } from "@/context/ContactContext";
import Cursor from "@/components/ui/Cursor";
import CursorTrail from "@/components/ui/CursorTrail";
import SocialOverlay from "@/components/ui/SocialOverlay";
import ContactOverlay from "@/components/ui/ContactOverlay";
import PageTransitionProvider from "@/components/ui/PageTransitionProvider";

const inter = Inter({ subsets: ["latin"] });
const luxurious = localFont({
  src: '../lib/luxuriousScript-Regular.ttf',
  variable: '--font-luxurious',
});

export const metadata: Metadata = {
  title: "Kai",
  description: "My creative portfolio showcasing my work and projects.",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${luxurious.variable}`}>
        <ScrollProvider>
          <CursorProvider>
            <ContactProvider>
              <PageTransitionProvider>
                <Cursor />
                <CursorTrail />
                <Navigation />
                <main>{children}</main>
                <Footer />
                <SocialOverlay />
                <ContactOverlayWrapper />
              </PageTransitionProvider>
            </ContactProvider>
          </CursorProvider>
        </ScrollProvider>
      </body>
    </html>
  );
}

// This wrapper is needed because the ContactOverlay uses hooks from contexts
// that are only available inside client components
function ContactOverlayWrapper() {
  return <ContactOverlay />
}
