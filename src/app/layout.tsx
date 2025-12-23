import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SuperFooter from '@/components/sections/super-footer';
import MainNavbar from '@/components/layout/main-navbar';
import { LanguageProvider } from '@/context/LanguageContext';
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
  title: "CMA Marketing | Digital Marketing Agency",
  description: "CMA Marketing is a digital marketing agency specializing in SEO, social media marketing, paid ads, and brand growth to help businesses scale online.",
  icons: {
    icon: '/Tab_Icon.png',
    apple: '/Tab_Icon.png',
  },
  metadataBase: new URL('https://novix.com'),
  openGraph: {
    images: '/Tab_Icon.png',
    title: 'CMA - Software Engineering Solutions',
    description: 'CMA Marketing is a digital marketing agency specializing in SEO, social media marketing, paid ads, and brand growth to help businesses scale online.',
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
        <link rel="icon" href="/cma-logo.png" />
        <link rel="apple-touch-icon" href="/cma-logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=5" />
        <style>{`html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; } :host { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }`}</style>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <LanguageProvider>
          <ClientAnimations>
            <MainNavbar />
            {children}
            <SuperFooter />
            <WhatsAppButton />
          </ClientAnimations>
        </LanguageProvider>
      </body>
    </html>
  );
}
