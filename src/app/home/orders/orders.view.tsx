"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { triggerStyle } from "@/constants/style/trigger.style"
import { Package, ShoppingCart } from "lucide-react"
import { SalesForm } from "./components/sales.form"
import { ShoppingView } from "./components/shopping.view"
import type { useOrdersModel } from "./orders.model"

type OrdersViewProps = ReturnType<typeof useOrdersModel>

export const OrdersView = (props: OrdersViewProps) => {
    const { onSubmit, form } = props

    return (
        <div className="sm:p-6 max-w-6xl mx-auto bg-purple-600">
            <div className="mb-6 text-white pt-4 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
                    Gerência de Pedidos
                </h1>
                <p className="text-center text-sm font-bold sm:text-base">
                    Gerencie suas vendas e compras de forma eficiente
                </p>
            </div>

            <div className="bg-white rounded-t-xl shadow-sm border border-gray-200 overflow-hidden">
                <Tabs defaultValue="sales" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 p-1 h-12">
                        <TabsTrigger
                            value="sales"
                            className={triggerStyle}
                        >
                            <Package className="w-4 h-4" />
                            <span className="hidden sm:inline">Vendas</span>
                            <span className="sm:hidden">Vendas</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="shopping"
                            className={triggerStyle}
                        >
                            <ShoppingCart className="w-4 h-4" />
                            <span className="hidden sm:inline">Compras</span>
                            <span className="sm:hidden">Compras</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="sales" className="mt-0 p-4 sm:p-6">
                        <SalesForm
                            form={form}
                            onSubmit={onSubmit}
                        />
                    </TabsContent>

                    <TabsContent value="shopping" className="mt-0 p-4 sm:p-6">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">Histórico de Compras</h2>
                            <p className="text-gray-600 text-sm">Visualize e gerencie suas compras realizadas</p>
                        </div>
                        <ShoppingView />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
