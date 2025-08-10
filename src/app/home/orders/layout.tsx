"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type React from "react"

interface OrdersLayoutProps {
    children: React.ReactNode
}

const OrdersLayout = ({ children }: OrdersLayoutProps) => {
    return (
        <div className="sm:p-6 max-w-6xl mx-auto bg-purple-900 min-h-screen">
            <div className="mb-6 text-white pt-4 sm:mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <Link href="/home">
                        <Button variant="ghost" className="p-1 rounded-full h-auto">
                            <ArrowLeft className="w-6 h-6 text-white" />
                        </Button>
                    </Link>
                </div>
                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">Gerência de Pedidos</h1>
                    <p className="text-sm font-bold sm:text-base">Gerencie suas vendas e compras de forma eficiente</p>
                </div>
            </div>

            <div className="bg-white h-full max-h-screen rounded-t-xl shadow-sm border border-gray-200 overflow-hidden">
                <main>{children}</main>
            </div>
        </div>
    )
}

export default OrdersLayout
