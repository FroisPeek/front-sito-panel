import { Order } from "@/app/home/orders/order.interface"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Status_String } from "@/constants/order-status"
import { returnDateInStatus } from "@/functions/format-functions"
import { Check, DollarSign, Hash, Package, Ruler, Tag, User } from "lucide-react"
import type React from "react"
import { type Dispatch, type SetStateAction, useState } from "react"

interface AccordionOrderCardProps {
    order: Order
    index: number
    handleSelectOrder: Dispatch<SetStateAction<number[]>>
}

export const AccordionOrderCard = ({
    order,
    index,
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
        <Card
            className={`border-2 transition-colors duration-200 ${isSelected ? "bg-purple-600 border-purple-600 text-white" : "bg-white border-gray-200 hover:border-purple-600"
                }`}
        >
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={`order-${index}`} className="border-none">
                    <AccordionTrigger className="hover:no-underline p-4 sm:p-6">
                        <div className="flex items-center justify-between w-full gap-2 sm:gap-4 min-w-0">
                            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                                {order.status === Status_String.PendingPurchase && (
                                    <div
                                        className="flex items-center cursor-pointer p-1 rounded-lg hover:bg-black/10 flex-shrink-0"
                                        onClick={handleCheckboxChange}
                                    >
                                        <div
                                            className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center transition-colors ${isSelected ? "bg-white border-white" : "bg-transparent border-gray-300 hover:border-purple-600"
                                                }`}
                                        >
                                            {isSelected && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />}
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col text-left gap-1 min-w-0 flex-1">
                                    <h3 className={`text-sm sm:text-base font-bold truncate ${isSelected ? "text-white" : "text-black"}`}>
                                        Pedido #{index + 1}
                                    </h3>
                                    <p className={`text-xs sm:text-sm truncate ${isSelected ? "text-white/80" : "text-gray-600"}`}>
                                        {order.client}
                                    </p>
                                    <Badge variant={isSelected ? "secondary" : "outline"} className="w-fit text-xs">
                                        {order.status}
                                    </Badge>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 flex-shrink-0">
                                <div className="text-right">
                                    <p
                                        className={`text-base sm:text-lg font-bold whitespace-nowrap ${isSelected ? "text-white" : "text-black"}`}
                                    >
                                        R$ {totalValue.toFixed(2)}
                                    </p>
                                    <p className={`text-xs ${isSelected ? "text-white/80" : "text-gray-600"}`}>
                                        {order.amount} {order.amount === 1 ? "item" : "itens"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                        <div className="space-y-4 sm:space-y-6 pt-4">
                            <div className="block sm:hidden">
                                <div className={`text-s, ${isSelected ? "text-white/80" : "text-black"}`}>
                                    Última atulização: {returnDateInStatus(order)}
                                </div>
                            </div>

                            <div
                                className={`rounded-lg p-4 sm:p-5 border ${isSelected ? "bg-white/10 border-white/20" : "bg-gray-50 border-gray-200"
                                    }`}
                            >
                                <h4
                                    className={`text-sm font-bold mb-4 flex items-center gap-2 ${isSelected ? "text-white" : "text-black"
                                        }`}
                                >
                                    <Package className="w-4 h-4" />
                                    Detalhes do Produto
                                </h4>

                                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
                                    {[
                                        { icon: User, label: "Cliente", value: order.client },
                                        { icon: Tag, label: "Marca", value: order.brand },
                                        { icon: Hash, label: "Código", value: order.code },
                                        { icon: Ruler, label: "Tamanho", value: order.size },
                                    ].map(({ icon: Icon, label, value }) => (
                                        <div key={label} className="flex items-center gap-3 min-w-0">
                                            <Icon
                                                className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-white" : "text-purple-600"}`}
                                            />
                                            <div className="min-w-0 flex-1">
                                                <p
                                                    className={`text-xs font-medium uppercase tracking-wide mb-1 ${isSelected ? "text-white/70" : "text-gray-500"}`}
                                                >
                                                    {label}
                                                </p>
                                                <p
                                                    className={`font-semibold truncate ${isSelected ? "text-white" : "text-black"}`}
                                                >
                                                    {value}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                    {order.description && (
                                        <div className={`flex items-start gap-3 min-w-0 sm:col-span-2 pt-4 border-t ${isSelected ? "border-white/20" : "border-gray-200"}`}
                                        >
                                            <Package
                                                className={`w-4 h-4 mt-1 flex-shrink-0 ${isSelected ? "text-white" : "text-purple-600"}`}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-xs font-medium uppercase tracking-wide mb-1 ${isSelected ? "text-white/70" : "text-gray-500"}`}
                                                >
                                                    Descrição
                                                </p>
                                                <p
                                                    className={`font-medium leading-relaxed break-words ${isSelected ? "text-white" : "text-black"}`}
                                                >
                                                    {order.description}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>


                            <div
                                className={`rounded-lg p-4 sm:p-5 border ${isSelected ? "bg-white/10 border-white/20" : "bg-gray-50 border-gray-200"
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <DollarSign className={`w-4 h-4 ${isSelected ? "text-white" : "text-purple-600"}`} />
                                    <h4 className={`text-sm font-bold ${isSelected ? "text-white" : "text-black"}`}>
                                        Análise Financeira
                                    </h4>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div
                                        className={`text-center p-3 sm:p-4 rounded-lg border ${isSelected ? "bg-white/5 border-white/20" : "bg-white border-gray-200"
                                            }`}
                                    >
                                        <p className={`text-xs font-medium mb-1 ${isSelected ? "text-white/70" : "text-gray-500"}`}>
                                            Custo Unit.
                                        </p>
                                        <p className={`font-bold text-sm sm:text-base ${isSelected ? "text-white" : "text-black"}`}>
                                            R$ {order.cost_price.toFixed(2)}
                                        </p>
                                    </div>
                                    <div
                                        className={`text-center p-3 sm:p-4 rounded-lg border ${isSelected ? "bg-white/5 border-white/20" : "bg-white border-gray-200"
                                            }`}
                                    >
                                        <p className={`text-xs font-medium mb-1 ${isSelected ? "text-white/70" : "text-gray-500"}`}>
                                            Venda Unit.
                                        </p>
                                        <p className={`font-bold text-sm sm:text-base ${isSelected ? "text-white" : "text-black"}`}>
                                            R$ {order.sale_price.toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={`text-center p-3 sm:p-4 rounded-lg mb-4 ${isSelected ? "bg-purple-600 text-white" : "bg-purple-600 text-white"
                                        }`}
                                >
                                    <p className="text-xs font-medium text-white/80 mb-1">Total do Pedido</p>
                                    <p className="font-bold text-lg sm:text-xl text-white">R$ {totalValue.toFixed(2)}</p>
                                    <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-2 text-xs">
                                        <span>Lucro: R$ {(profit * order.amount).toFixed(2)}</span>
                                        <span>Margem: {profitMargin}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    )
}
