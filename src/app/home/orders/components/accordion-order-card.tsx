"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, DollarSign, Edit, Hash, Package, Ruler, Tag, Trash2, User } from "lucide-react"
import type React from "react"
import { type Dispatch, type SetStateAction, useState } from "react"
import type { Order } from "../order.interface"

interface AccordionOrderCardProps {
    order: Order
    index: number
    onEdit?: (order: Order, index: number) => void
    onDelete?: (index: number) => void
    editButtonText?: string
    deleteButtonText?: string
    showButtons?: boolean
    handleSelectOrder: Dispatch<SetStateAction<number[]>>
}

export const AccordionOrderCard = ({
    order,
    index,
    onEdit,
    onDelete,
    editButtonText = "Editar",
    deleteButtonText = "Remover",
    showButtons = true,
    handleSelectOrder,
}: AccordionOrderCardProps) => {
    const [isSelected, setIsSelected] = useState(false)
    const profit = order.sale_price - order.cost_price
    const profitMargin = ((profit / order.sale_price) * 100).toFixed(1)
    const totalValue = order.sale_price * order.amount

    const handleCheckboxChange = (e: React.MouseEvent) => {
        e.stopPropagation()
        const newSelectedState = !isSelected
        setIsSelected(newSelectedState)

        if (newSelectedState) {
            handleSelectOrder((prev) => [...(prev ?? []), order.id])
        } else {
            handleSelectOrder((prev) => prev?.filter((selectedOrder) => !(selectedOrder === order.id)) ?? [])
        }
    }

    return (
        <Card className="bg-purple-50 border-2 border-gray-200 hover:border-purple-600 transition-all duration-200 overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={`order-${index}`} className="border-none">
                    <AccordionTrigger className="hover:no-underline p-4">
                        <div className="flex items-center justify-between w-full gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                    {index + 1}
                                </div>
                                <div className="flex flex-col text-left gap-1">
                                    <h3 className="text-sm font-semibold text-black">Pedido #{index + 1}</h3>
                                    <p className="text-xs text-gray-600">{order.client}</p>
                                    <p className="text-xs text-gray-900 bg-white rounded p-1">{order.status}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-sm font-bold text-black">R$ {totalValue.toFixed(2)}</p>
                                    <Badge variant="outline" className="text-xs">
                                        {order.amount} {order.amount === 1 ? "item" : "itens"}
                                    </Badge>
                                </div>

                                <div className="flex items-center gap-2 cursor-pointer p-1" onClick={handleCheckboxChange}>
                                    <div
                                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${isSelected
                                            ? "bg-purple-600 border-purple-600"
                                            : "bg-white border-gray-300 hover:border-purple-600"
                                            }`}
                                    >
                                        {isSelected && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-4 pb-4">
                        <div className="space-y-4 pt-2">
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <h4 className="text-sm font-semibold text-black mb-3 flex items-center gap-2">
                                    <Package className="w-4 h-4 text-purple-600" />
                                    Detalhes do Produto
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-purple-600 flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-xs text-gray-600 uppercase tracking-wide">Cliente</p>
                                            <p className="font-medium text-black truncate">{order.client}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Tag className="w-4 h-4 text-purple-600 flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-xs text-gray-600 uppercase tracking-wide">Marca</p>
                                            <p className="font-medium text-black truncate">{order.brand}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Hash className="w-4 h-4 text-purple-600 flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-xs text-gray-600 uppercase tracking-wide">Código</p>
                                            <p className="font-medium text-black truncate">{order.code}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Ruler className="w-4 h-4 text-purple-600 flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-xs text-gray-600 uppercase tracking-wide">Tamanho</p>
                                            <p className="font-medium text-black truncate">{order.size}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                    <div className="flex items-start gap-2">
                                        <Package className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-600 uppercase tracking-wide">Descrição</p>
                                            <p className="font-medium text-black leading-relaxed text-sm">{order.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center gap-2 mb-3">
                                    <DollarSign className="w-4 h-4 text-purple-600" />
                                    <h4 className="text-sm font-semibold text-black">Análise Financeira</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                                        <p className="text-xs text-gray-600 font-medium">Custo Unitário</p>
                                        <p className="font-bold text-black">R$ {order.cost_price.toFixed(2)}</p>
                                    </div>
                                    <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                                        <p className="text-xs text-gray-600 font-medium">Venda Unitária</p>
                                        <p className="font-bold text-black">R$ {order.sale_price.toFixed(2)}</p>
                                    </div>
                                    <div className="text-center p-3 bg-white rounded-lg border-2 border-purple-600">
                                        <p className="text-xs text-purple-600 font-medium">Lucro Unitário</p>
                                        <p className="font-bold text-purple-600">R$ {profit.toFixed(2)}</p>
                                    </div>
                                    <div className="text-center p-3 bg-purple-600 rounded-lg">
                                        <p className="text-xs text-white font-medium">Margem</p>
                                        <p className="font-bold text-white">{profitMargin}%</p>
                                    </div>
                                </div>
                                <div className="text-center p-3 bg-black rounded-lg mb-3">
                                    <p className="text-xs text-white font-medium">Total Geral</p>
                                    <p className="font-bold text-white text-lg">R$ {totalValue.toFixed(2)}</p>
                                </div>
                                <div className="grid grid-cols-3 gap-3 text-center">
                                    <div>
                                        <p className="text-xs text-gray-500">Custo Total</p>
                                        <p className="font-semibold text-black text-sm">
                                            R$ {(order.cost_price * order.amount).toFixed(2)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Lucro Total</p>
                                        <p className="font-semibold text-purple-600 text-sm">R$ {(profit * order.amount).toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Quantidade</p>
                                        <p className="font-semibold text-black text-sm">{order.amount} un</p>
                                    </div>
                                </div>
                            </div>

                            {showButtons && (
                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white bg-white transition-all"
                                        onClick={() => onEdit?.(order, index)}
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        {editButtonText}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 border-2 border-black text-black hover:bg-black hover:text-white bg-white transition-all"
                                        onClick={() => onDelete?.(index)}
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        {deleteButtonText}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    )
}
