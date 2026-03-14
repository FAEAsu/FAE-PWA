import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header"

export const metadata: Metadata = {
  title: "FAE Team App",
  description: "Application interne équipe Valorant",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#09090b",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}