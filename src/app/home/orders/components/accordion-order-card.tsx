"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DollarSign, Edit, Hash, Package, Ruler, Tag, Trash2, User } from "lucide-react"
import type { CreateOrderSchema } from "../order.interface"

interface AccordionOrderCardProps {
    order: CreateOrderSchema
    index: number
    onEdit?: (order: CreateOrderSchema, index: number) => void
    onDelete?: (index: number) => void
    editButtonText?: string
    deleteButtonText?: string
    showButtons?: boolean
}

export const AccordionOrderCard = ({
    order,
    index,
    onEdit,
    onDelete,
    editButtonText = "Editar",
    deleteButtonText = "Remover",
    showButtons = true,
}: AccordionOrderCardProps) => {
    const profit = order.sale_price - order.cost_price
    const profitMargin = ((profit / order.sale_price) * 100).toFixed(1)
    const totalValue = order.sale_price * order.amount

    return (
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-md hover:shadow-lg transition-all duration-200">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={`order-${index}`} className="border-none">
                    <AccordionTrigger className="hover:no-underline px-6 py-4">
                        <div className="flex items-center justify-between w-full mr-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                    {index + 1}
                                </div>
                                <div className="text-left">
                                    <h3 className="text-lg font-semibold text-purple-900">Pedido #{index + 1}</h3>
                                    <p className="text-sm text-gray-600">
                                        {order.client} • {order.brand}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Badge variant="secondary" className="bg-purple-200 text-purple-800">
                                    {order.amount} {order.amount === 1 ? "item" : "itens"}
                                </Badge>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">R$ {totalValue.toFixed(2)}</p>
                                    <p className="text-xs text-gray-500">Total</p>
                                </div>
                            </div>
                        </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pb-6">
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg p-4 border border-purple-200">
                                <h4 className="text-sm font-semibold text-purple-900 mb-4 flex items-center gap-2">
                                    <Package className="w-4 h-4" />
                                    Detalhes do Produto
                                </h4>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-purple-600" />
                                        <div>
                                            <p className="text-xs text-gray-600 uppercase tracking-wide">Cliente</p>
                                            <p className="font-medium text-gray-900">{order.client}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Tag className="w-4 h-4 text-purple-600" />
                                        <div>
                                            <p className="text-xs text-gray-600 uppercase tracking-wide">Marca</p>
                                            <p className="font-medium text-gray-900">{order.brand}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Hash className="w-4 h-4 text-purple-600" />
                                        <div>
                                            <p className="text-xs text-gray-600 uppercase tracking-wide">Código</p>
                                            <p className="font-medium text-gray-900">{order.code}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Ruler className="w-4 h-4 text-purple-600" />
                                        <div>
                                            <p className="text-xs text-gray-600 uppercase tracking-wide">Tamanho</p>
                                            <p className="font-medium text-gray-900">{order.size}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex items-start gap-2">
                                        <Package className="w-4 h-4 text-purple-600 mt-1" />
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-600 uppercase tracking-wide">Descrição</p>
                                            <p className="font-medium text-gray-900 leading-relaxed">{order.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 border border-purple-200">
                                <div className="flex items-center gap-2 mb-4">
                                    <DollarSign className="w-4 h-4 text-purple-600" />
                                    <h4 className="text-sm font-semibold text-purple-900">Análise Financeira</h4>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                                        <p className="text-xs text-red-600 font-medium">Custo Unitário</p>
                                        <p className="font-bold text-red-700">R$ {order.cost_price.toFixed(2)}</p>
                                    </div>

                                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                                        <p className="text-xs text-green-600 font-medium">Venda Unitária</p>
                                        <p className="font-bold text-green-700">R$ {order.sale_price.toFixed(2)}</p>
                                    </div>

                                    <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                                        <p className="text-xs text-blue-600 font-medium">Lucro Unitário</p>
                                        <p className="font-bold text-blue-700">R$ {profit.toFixed(2)}</p>
                                    </div>

                                    <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                                        <p className="text-xs text-purple-600 font-medium">Margem</p>
                                        <p className="font-bold text-purple-700">{profitMargin}%</p>
                                    </div>

                                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                                        <p className="text-xs text-gray-600 font-medium">Total Geral</p>
                                        <p className="font-bold text-gray-700">R$ {totalValue.toFixed(2)}</p>
                                    </div>
                                </div>

                                {/* Resumo Adicional */}
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <p className="text-xs text-gray-500">Custo Total</p>
                                            <p className="font-semibold text-red-600">R$ {(order.cost_price * order.amount).toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Lucro Total</p>
                                            <p className="font-semibold text-blue-600">R$ {(profit * order.amount).toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Quantidade</p>
                                            <p className="font-semibold text-purple-600">{order.amount} un</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {showButtons && (
                                <div className="flex gap-3 pt-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 bg-transparent"
                                        onClick={() => onEdit?.(order, index)}
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        {editButtonText}
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 bg-transparent"
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
