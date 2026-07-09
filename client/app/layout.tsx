import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Nilswa Cloud Services (NCS)",
  description: "Enterprise SaaS platform for CRM and API services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ThemeRegistry>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
