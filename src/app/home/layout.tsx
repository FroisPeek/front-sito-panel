"use client"

import { HeaderHome } from "@/components/home/header.home"
import type React from "react"
import { useHomeModel } from "./home.model"

interface OrdersLayoutProps {
    children: React.ReactNode
}

const OrdersLayout = ({ children }: OrdersLayoutProps) => {
    const { exitFunction } = useHomeModel()

    return (
        <div className="min-h-screen bg-purple-900">
            <HeaderHome exitFunction={exitFunction} />

            <main>{children}</main>
        </div>
    )
}

export default OrdersLayout
