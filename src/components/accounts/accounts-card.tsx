"use client"

import type { Order } from "@/app/home/orders/order.interface"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Status_String } from "@/constants/order-status"
import { formatCurrency, formatDate } from "@/functions/format-functions"
import {
    getCardStyles,
    getIconColor,
    getLabelColor,
    getSeparatorColor,
    getStatusColor,
    getTextColor,
} from "@/functions/style-functions"
import { Calendar, Check, CheckCircle, Package, ShoppingCart, Tag, User } from "lucide-react"

interface iProps {
    order: Order
    selectedOrders: number[]
    handleCardClick: (isSelected: boolean, order: Order) => void
    canSelectCard?: (order: Order) => boolean
    idx: number
}

export const PurchaseCard = ({ order, selectedOrders, handleCardClick, canSelectCard, idx }: iProps) => {
    const isSelected = selectedOrders.includes(order.id)
    const isPaidPurchase = order.status === Status_String.PaidPurchase
    const isSelectable = canSelectCard ? canSelectCard(order) : true

    return (
        <Card
            className={`
                w-full max-w-md cursor-pointer
                transition-colors ease-in-out duration-400
                ${getCardStyles(isPaidPurchase, isSelected)}
                ${!isSelectable && !isSelected ? "opacity-50 cursor-not-allowed" : ""} 
            `}
            onClick={() => {
                if (isSelectable || isSelected) {
                    handleCardClick(isSelected, order)
                }
            }}
        >
            <CardHeader className="pb-3">
                <div className="flex flex-col items-start justify-between">
                    <div className="flex items-center gap-2">
                        {isPaidPurchase ? (
                            <CheckCircle className={`w-5 h-5 ${getIconColor(isPaidPurchase, isSelected)}`} />
                        ) : (
                            <ShoppingCart className={`w-5 h-5 ${getIconColor(isPaidPurchase, isSelected)}`} />
                        )}
                        <span className={`font-semibold text-lg ${getTextColor(isPaidPurchase, isSelected)}`}>
                            Pedido #{idx}
                        </span>
                        {isPaidPurchase && <Badge className="bg-rose-500 text-white text-xs">PAGO</Badge>}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <Badge className={`${getStatusColor(order.status)} font-medium`}>{order.status} </Badge>
                        {order.status_conference ? (
                            <Badge
                                className={`font-medium ${order.status_conference === Status_String.ToCheck ? "bg-black" : "bg-fuchsia-600"}`}
                            >
                                {`${order.status_conference}`}
                            </Badge>
                        ) : null}
                        {order.date_conference ? <Badge className={` font-medium`}>{new Date(order.date_conference).toLocaleDateString()} </Badge> : null}
                        {isSelected && (
                            <div className="bg-white rounded-full p-1">
                                <Check className={`w-4 h-4 ${isPaidPurchase ? "text-rose-600" : "text-purple-600"}`} />
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                    <User className={`w-4 h-4 ${getIconColor(isPaidPurchase, isSelected)}`} />
                    <span className={`text-sm ${getLabelColor(isPaidPurchase, isSelected)}`}>Cliente:</span>
                    <span className={`font-medium ${getTextColor(isPaidPurchase, isSelected)}`}>
                        {order.client_infos.client_name}
                    </span>
                </div>

                <Separator className={getSeparatorColor(isPaidPurchase, isSelected)} />

                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Package className={`w-4 h-4 ${getIconColor(isPaidPurchase, isSelected)}`} />
                        <span className={`font-medium ${getTextColor(isPaidPurchase, isSelected)}`}>Produto</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <span className={getLabelColor(isPaidPurchase, isSelected)}>Marca:</span>
                            <p className={`font-medium ${getTextColor(isPaidPurchase, isSelected)}`}>{order.brand}</p>
                        </div>
                        <div>
                            <span className={getLabelColor(isPaidPurchase, isSelected)}>Código:</span>
                            <p className={`font-medium ${getTextColor(isPaidPurchase, isSelected)}`}>{order.code}</p>
                        </div>
                        <div>
                            <span className={getLabelColor(isPaidPurchase, isSelected)}>Tamanho:</span>
                            <p className={`font-medium ${getTextColor(isPaidPurchase, isSelected)}`}>{order.size}</p>
                        </div>
                        <div>
                            <span className={getLabelColor(isPaidPurchase, isSelected)}>Quantidade:</span>
                            <p className={`font-medium ${getTextColor(isPaidPurchase, isSelected)}`}>{order.amount}</p>
                        </div>
                    </div>
                    {order.description && (
                        <div>
                            <span className={`text-sm ${getLabelColor(isPaidPurchase, isSelected)}`}>Descrição:</span>
                            <p className={`text-sm font-medium mt-1 ${getTextColor(isPaidPurchase, isSelected)}`}>
                                {order.description}
                            </p>
                        </div>
                    )}
                </div>

                <Separator className={getSeparatorColor(isPaidPurchase, isSelected)} />

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Tag className={`w-4 h-4 ${getIconColor(isPaidPurchase, isSelected)}`} />
                        <span className={`text-sm ${getLabelColor(isPaidPurchase, isSelected)}`}>
                            {isPaidPurchase ? "Preço Pago:" : "Preço Custo:"}
                        </span>
                    </div>
                    <span className={`font-bold text-lg ${isSelected ? "text-white" : "text-black"}`}>
                        {formatCurrency(order.cost_price)}
                    </span>
                </div>

                <Separator className={getSeparatorColor(isPaidPurchase, isSelected)} />

                <div className="flex items-center gap-2">
                    <Calendar className={`w-4 h-4 ${getIconColor(isPaidPurchase, isSelected)}`} />
                    {order.status === Status_String.ConfirmSale ? (
                        <>
                            <span className={`text-sm ${getLabelColor(isPaidPurchase, isSelected)}`}>Data da Compra:</span>
                            <span className={`font-medium ${getTextColor(isPaidPurchase, isSelected)}`}>
                                {formatDate(order.date_order)}
                            </span>
                        </>
                    ) : (
                        <>
                            <span className={`text-sm ${getLabelColor(isPaidPurchase, isSelected)}`}>Data de Pagamento:</span>
                            <span className={`font-medium ${getTextColor(isPaidPurchase, isSelected)}`}>
                                {formatDate(order.date_purchase_order)}
                            </span>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
