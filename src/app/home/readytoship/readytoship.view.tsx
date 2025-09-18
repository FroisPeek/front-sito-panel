"use client"

import { IsLoadingCard } from "@/components/global/isloading-card"
import { NotFoundOrder } from "@/components/global/not-found-order"
import { ReadyToShipCard } from "@/components/readytoship/readytoship-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Search } from "lucide-react"
import { useMemo, useState } from "react"
import type { Order } from "../orders/order.interface"
import type { useReadyToShipModel } from "./readytoship.model"

type ReadyToShipViewProps = ReturnType<typeof useReadyToShipModel>

export const ReadyToShipView = (props: ReadyToShipViewProps) => {
    const { data, isLoading, form, onSubmit } = props

    const [searchTerm, setSearchTerm] = useState("")
    const [showSensitiveData, setShowSensitiveData] = useState(false)

    const filteredData = useMemo(() => {
        if (!searchTerm.trim()) return data

        const searchLower = searchTerm.toLowerCase()
        return data.filter((order: Order) => {
            return (
                order.code.toString().toLowerCase().includes(searchLower) ||
                order.description.toLowerCase().includes(searchLower) ||
                order.size.toLowerCase().includes(searchLower) ||
                order.brand.toLowerCase().includes(searchLower) ||
                order.status.toLowerCase().includes(searchLower) ||
                order.client_infos?.client_name?.toLowerCase().includes(searchLower) ||
                order.cost_price.toString().includes(searchLower) ||
                order.sale_price.toString().includes(searchLower) ||
                order.total_price.toString().includes(searchLower) ||
                order.amount.toString().includes(searchLower)
            )
        })
    }, [data, searchTerm])

    if (isLoading) return <IsLoadingCard />

    if (data.length === 0) return <NotFoundOrder />

    return (
        <div className="flex flex-col gap-4">
            <div className="px-2 mb-1 bg-white rounded py-2 border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Visualize todos seus pedidos</h2>
                        <p className="text-gray-600 text-sm">Esse é o local onde vamos cadastrar um novo cliente</p>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowSensitiveData(!showSensitiveData)}
                        className="flex items-center gap-2"
                    >
                        {showSensitiveData ? (
                            <>
                                <EyeOff className="h-4 w-4" />
                                Ocultar valores
                            </>
                        ) : (
                            <>
                                <Eye className="h-4 w-4" />
                                Mostrar valores
                            </>
                        )}
                    </Button>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Pesquisar por código, descrição, cliente, marca, status..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                    />
                </div>

                {searchTerm && (
                    <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                        <span>
                            {filteredData.length} de {data.length} pedidos encontrados
                        </span>
                        {filteredData.length === 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSearchTerm("")}
                                className="text-blue-600 hover:text-blue-700"
                            >
                                Limpar filtro
                            </Button>
                        )}
                    </div>
                )}
            </div>

            {filteredData.length === 0 && searchTerm ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 mb-2">Nenhum pedido encontrado para "{searchTerm}"</p>
                    <Button variant="outline" onClick={() => setSearchTerm("")} className="text-blue-600 hover:text-blue-700">
                        Limpar filtro
                    </Button>
                </div>
            ) : (
                filteredData.map((item: Order) => (
                    <ReadyToShipCard
                        key={item.id}
                        order={item}
                        form={form}
                        onSubmit={onSubmit}
                        showSensitiveData={showSensitiveData}
                    />
                ))
            )}
        </div>
    )
}
