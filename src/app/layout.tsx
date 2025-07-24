import type { Metadata } from "next"
import type React from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "SitoPanel - Sistema de Gerenciamento de Dropshipping",
  description:
    "Sistema completo de gerenciamento de dropshipping com analytics avançado e controle total dos seus pedidos",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  )
}
