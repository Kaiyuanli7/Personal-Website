import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import "../styles/cursor.css";
import Navigation from "@/src/components/layout/Navigation";
import Footer from "@/src/components/layout/Footer";
import { ScrollProvider } from "@/src/context/ScrollContext";
import { CursorProvider } from "@/src/context/CursorContext";
import Cursor from "@/src/components/ui/Cursor";
import CursorTrail from "@/src/components/ui/CursorTrail";
import SocialOverlay from "@/src/components/ui/SocialOverlay";

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
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${luxurious.variable}`}>
        <ScrollProvider>
          <CursorProvider>
            <Cursor />
            <CursorTrail />
            <Navigation />
            <main>{children}</main>
            <Footer />
            <SocialOverlay />
          </CursorProvider>
        </ScrollProvider>
      </body>
    </html>
  );
}
