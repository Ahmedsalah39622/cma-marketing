import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SuperFooter from '@/components/sections/super-footer';
import MainNavbar from '@/components/layout/main-navbar';
import { ClientAnimations } from '@/components/layout/client-animations';
import { WhatsAppButton } from '@/components/animations/WhatsAppButton';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Novix - Software Engineering Solutions",
  description: "Your partner in digital transformation",
  icons: {
    icon: '/novix-logo-blue.png',
    apple: '/novix-logo-blue.png',
  },
  metadataBase: new URL('https://novix.com'),
  openGraph: {
    images: '/novix-logo-blue.png',
    title: 'Novix - Software Engineering Solutions',
    description: 'Your partner in digital transformation',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <link rel="icon" href="/novix-logo-blue.png" />
        <link rel="apple-touch-icon" href="/novix-logo-blue.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=5" />
        <style>{`html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; } :host { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }`}</style>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <ClientAnimations>
          <MainNavbar />
          {children}
          <SuperFooter />
          <WhatsAppButton />
        </ClientAnimations>
      </body>
    </html>
  );
}
