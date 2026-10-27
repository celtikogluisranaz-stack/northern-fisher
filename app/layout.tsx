import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://yourdomain.ca'),
  title: 'Northern Fishers | Ice Fishing Tip-Up Flags',
  description: 'Durable ice fishing tip-up flags built for Canadian winters.',
  openGraph: {
    title: 'Northern Fishers',
    description: 'Durable ice fishing tip-up flags built for Canadian winters.',
    url: 'https://yourdomain.ca',
    siteName: 'Northern Fishers',
    locale: 'en_CA',
    type: 'website',
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (

  <ClerkProvider>

    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >


      
      <body className="min-h-full flex flex-col">{children} <Analytics /> </body>
  

    </html>

</ClerkProvider>

  );
}
