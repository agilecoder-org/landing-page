import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import "./globals.css"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ""

export const metadata: Metadata = {
  title: "AgileCoder - Innovate. Build. Deliver.",
  description:
    "From cutting-edge dev tools and plugins to full-fledged websites — we craft and ship modern digital experiences at speed.",
  icons: {
    icon: "/agilecoder-dark.png",
  },
  openGraph: {
    title: "AgileCoder - Innovate. Build. Deliver.",
    description:
      "From cutting-edge dev tools and plugins to full-fledged websites — we craft and ship modern digital experiences at speed.",
    url: "https://www.agilecoder.in",
    siteName: "AgileCoder",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.agilecoder.in/default-og.png", // default OG image
        width: 1200,
        height: 630,
        alt: "AgileCoder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgileCoder - Innovate. Build. Deliver.",
    description:
      "From cutting-edge dev tools and plugins to full-fledged websites — we craft and ship modern digital experiences at speed.",
    images: ["https://www.agilecoder.in/default-og.png"],
    creator: "@agilecoder_in",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.agilecoder.in",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div id="top" />
        <Header />
        {children}
      </body>
    </html>
  )
}
