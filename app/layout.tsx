import type { Metadata } from "next"
import Header from "@/components/Header"
import "@/styles/globals.css"
import Script from "next/script"

export const metadata: Metadata = {
  title: "AgileCoder - Innovate. Build. Deliver.",
  description: "From cutting-edge dev tools and plugins to full-fledged websites — we craft and ship modern digital experiences at speed.",
  icons: {
    icon: "/agilecoder-dark.png",
  },
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

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
      <body>
        <div id="top" />
        <Header />
        {children}
      </body>
    </html>
  )
}
