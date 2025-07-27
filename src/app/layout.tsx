import { ContextWrapper } from "@/components/global/ContextWrapper";
import type { Metadata } from "next";
import type React from "react";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "SitoPanel - Sistema de Gerenciamento de Dropshipping",
  description:
    "Sistema completo de gerenciamento de dropshipping com analytics avançado e controle total dos seus pedidos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContextWrapper>
      <html lang="pt-BR">
        <body className="antialiased">
          {children}
          <Toaster richColors expand />
        </body>
      </html>
    </ContextWrapper>
  );
}
