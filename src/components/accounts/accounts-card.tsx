"use client"

import type { Order } from "@/app/home/orders/order.interface"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Status_String } from "@/constants/order-status"
import { formatCurrency, formatDate, getStatusColor } from "@/functions/format-functions"
import { Calendar, Check, CheckCircle, Package, ShoppingCart, Tag, User } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"

interface iProps {
    setSelectOrder: Dispatch<SetStateAction<number[]>>
    order: Order
    selectedOrders: number[]
}

export const PurchaseCard = ({ order, setSelectOrder, selectedOrders }: iProps) => {
    const isSelected = selectedOrders.includes(order.id)
    const isPaidPurchase = order.status === Status_String.PaidPurchase

    const handleCardClick = () => {
        setSelectOrder((prev) => (isSelected ? prev.filter((id) => id !== order.id) : [...prev, order.id]))
    }

    const getCardStyles = () => {
        if (isPaidPurchase) {
            if (isSelected) {
                return "bg-green-600 text-white border-green-700 shadow-lg"
            }
            return "bg-green-50 hover:bg-green-100 border-green-200"
        } else {
            if (isSelected) {
                return "bg-purple-600 text-white border-purple-700 shadow-lg"
            }
            return "bg-white hover:bg-gray-50 border-gray-200"
        }
    }

    const getIconColor = () => {
        if (isPaidPurchase) {
            return isSelected ? "text-white" : "text-green-600"
        }
        return isSelected ? "text-white" : "text-purple-600"
    }

    const getLabelColor = () => {
        if (isPaidPurchase) {
            return isSelected ? "text-white" : "text-green-600"
        }
        return isSelected ? "text-white" : "text-purple-600"
    }

    const getTextColor = () => {
        return isSelected ? "text-white" : "text-black"
    }

    const getSeparatorColor = () => {
        if (isPaidPurchase) {
            return isSelected ? "bg-white/30" : "bg-green-200"
        }
        return isSelected ? "bg-white/30" : ""
    }

    return (
        <Card
            className={`
                w-full max-w-md cursor-pointer
                transition-colors ease-in-out duration-400
                ${getCardStyles()}
            `}
            onClick={handleCardClick}
        >
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {isPaidPurchase ? (
                            <CheckCircle className={`w-5 h-5 ${getIconColor()}`} />
                        ) : (
                            <ShoppingCart className={`w-5 h-5 ${getIconColor()}`} />
                        )}
                        <span className={`font-semibold text-lg ${getTextColor()}`}>Pedido #{order.id}</span>
                        {isPaidPurchase && <Badge className="bg-green-500 text-white text-xs">PAGO</Badge>}
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(order.status)} font-medium`}>{order.status}</Badge>
                        {isSelected && (
                            <div className="bg-white rounded-full p-1">
                                <Check className={`w-4 h-4 ${isPaidPurchase ? "text-green-600" : "text-purple-600"}`} />
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                    <User className={`w-4 h-4 ${getIconColor()}`} />
                    <span className={`text-sm ${getLabelColor()}`}>Cliente:</span>
                    <span className={`font-medium ${getTextColor()}`}>{order.client}</span>
                </div>

                <Separator className={getSeparatorColor()} />

                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Package className={`w-4 h-4 ${getIconColor()}`} />
                        <span className={`font-medium ${getTextColor()}`}>Produto</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <span className={getLabelColor()}>Marca:</span>
                            <p className={`font-medium ${getTextColor()}`}>{order.brand}</p>
                        </div>
                        <div>
                            <span className={getLabelColor()}>Código:</span>
                            <p className={`font-medium ${getTextColor()}`}>{order.code}</p>
                        </div>
                        <div>
                            <span className={getLabelColor()}>Tamanho:</span>
                            <p className={`font-medium ${getTextColor()}`}>{order.size}</p>
                        </div>
                        <div>
                            <span className={getLabelColor()}>Quantidade:</span>
                            <p className={`font-medium ${getTextColor()}`}>{order.amount}</p>
                        </div>
                    </div>
                    {order.description && (
                        <div>
                            <span className={`text-sm ${getLabelColor()}`}>Descrição:</span>
                            <p className={`text-sm font-medium mt-1 ${getTextColor()}`}>{order.description}</p>
                        </div>
                    )}
                </div>

                <Separator className={getSeparatorColor()} />

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Tag className={`w-4 h-4 ${getIconColor()}`} />
                        <span className={`text-sm ${getLabelColor()}`}>{isPaidPurchase ? "Preço Pago:" : "Preço Custo:"}</span>
                    </div>
                    <span className={`font-bold text-lg ${isSelected ? "text-white" : "text-green-600"}`}>
                        {formatCurrency(order.cost_price)}
                    </span>
                </div>

                <Separator className={getSeparatorColor()} />

                <div className="flex items-center gap-2">
                    <Calendar className={`w-4 h-4 ${getIconColor()}`} />
                    {order.status === Status_String.ConfirmSale ? (
                        <>
                            <span className={`text-sm ${getLabelColor()}`}>Data da Compra:</span>
                            <span className={`font-medium ${getTextColor()}`}>{formatDate(order.date_order)}</span>
                        </>
                    ) : (
                        <>
                            <span className={`text-sm ${getLabelColor()}`}>Data de Pagamento:</span>
                            <span className={`font-medium ${getTextColor()}`}>{formatDate(order.date_purchase_order)}</span>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
