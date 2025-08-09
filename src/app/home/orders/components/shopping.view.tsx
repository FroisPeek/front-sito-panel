"use client"

import { Button } from "@/components/ui/button"
import { Status } from "@/constants/order-status"
import { Dispatch, SetStateAction } from "react"
import type { Order } from "../order.interface"
import { AccordionOrderCard } from "./accordion-order-card"
interface iProps {
    data: Order[]
    isLoading: boolean
    onEditOrder?: (order: Order, index: number) => void
    onDeleteOrder?: (index: number) => void
    confirmedOrder: number[]
    setConfirmedOrder: Dispatch<SetStateAction<number[]>>
    onUpdate: (orders: number[], value: number) => void
}

export const ShoppingView = ({ data, isLoading, onEditOrder, onDeleteOrder, confirmedOrder, setConfirmedOrder, onUpdate }: iProps) => {
    const handleEdit = (order: Order, index: number) => {
        console.log("Editando pedido:", order, "índice:", index)
        onEditOrder?.(order, index)
    }

    const handleDelete = (index: number) => {
        console.log("Removendo pedido no índice:", index)
        onDeleteOrder?.(index)
    }

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                    <div
                        key={index}
                        className="h-20 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg animate-pulse"
                    />
                ))}
            </div>
        )
    }

    if (data.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pedido encontrado</h3>
                <p className="text-gray-500">Adicione alguns pedidos para começar a visualizá-los aqui.</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-lg border border-purple-200 p-4 mb-6">
                <div className="flex items-center justify-between">
                    <div className="pr-4">
                        <h2 className="text-xl font-semibold text-purple-900">Lista de Pedidos ({data.length})</h2>
                        <p className="text-sm text-gray-600 mt-1">Gerencie seus pedidos de forma detalhada</p>
                    </div>

                    <div className="text-right">
                        <p className="text-sm text-gray-600">Total Geral</p>
                        <p className="text-2xl font-bold text-purple-600 whitespace-nowrap">
                            R$ {data.reduce((total, order) => total + order.sale_price * order.amount, 0).toFixed(2)}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                        <p className="text-xs text-gray-500">Total de Itens</p>
                        <p className="font-semibold text-gray-900">{data.reduce((total, order) => total + order.amount, 0)}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-gray-500">Custo Total</p>
                        <p className="font-semibold text-red-600">
                            R$ {data.reduce((total, order) => total + order.cost_price * order.amount, 0).toFixed(2)}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-gray-500">Receita Total</p>
                        <p className="font-semibold text-green-600">
                            R$ {data.reduce((total, order) => total + order.sale_price * order.amount, 0).toFixed(2)}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-gray-500">Lucro Total</p>
                        <p className="font-semibold text-blue-600">
                            R${" "}
                            {data
                                .reduce((total, order) => total + (order.sale_price - order.cost_price) * order.amount, 0)
                                .toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <Button
                    className="w-full"
                    onClick={() => onUpdate(confirmedOrder, Status.ConfirmSale)}
                >
                    Efetivar pedido(s)
                </Button>
            </div>

            <div className="space-y-3">
                {data.map((order, index) => (
                    <AccordionOrderCard
                        key={`order-${index}-${order.code}`}
                        order={order}
                        index={index}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        editButtonText="Editar Pedido"
                        deleteButtonText="Remover Pedido"
                        showButtons={true}
                        handleSelectOrder={setConfirmedOrder}
                    />
                ))}
            </div>

            {data.length > 0 && (
                <div className="bg-white rounded-lg border border-purple-200 p-4 mt-6">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            {data.length} {data.length === 1 ? "pedido" : "pedidos"} carregado{data.length === 1 ? "" : "s"}
                        </div>

                        <div className="flex gap-2">
                            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">Exportar Lista</button>
                            <span className="text-gray-300">•</span>
                            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">Limpar Tudo</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
