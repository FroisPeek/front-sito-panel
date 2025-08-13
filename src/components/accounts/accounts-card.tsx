import { Order } from "@/app/home/orders/order.interface"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatCurrency, formatDate, getStatusColor } from "@/functions/format-functions"
import { Calendar, Check, Package, ShoppingCart, Tag, User } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"

interface iProps {
    setSelectOrder: Dispatch<SetStateAction<number[]>>
    order: Order
    selectedOrders: number[]
}

export const PurchaseCard = ({ order, setSelectOrder, selectedOrders }: iProps) => {
    const isSelected = selectedOrders.includes(order.id)

    const handleCardClick = () => {
        setSelectOrder((prev) => (isSelected ? prev.filter((id) => id !== order.id) : [...prev, order.id]))
    }

    return (
        <Card
            className={`
        w-full max-w-md cursor-pointer
        transition-colors ease-in-out duration-400
        ${isSelected
                    ? "bg-purple-600 text-white border-purple-700 shadow-lg"
                    : "bg-white hover:bg-gray-50 border-gray-200"}`}
            onClick={handleCardClick}
        >
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShoppingCart className={`w-5 h-5 ${isSelected ? "text-white" : "text-purple-600"}`} />
                        <span className={`font-semibold text-lg ${isSelected ? "text-white" : "text-black"}`}>
                            Pedido #{order.id}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(order.status)} font-medium`}>{order.status}</Badge>
                        {isSelected && (
                            <div className="bg-white rounded-full p-1">
                                <Check className="w-4 h-4 text-purple-600" />
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                    <User className={`w-4 h-4 ${isSelected ? "text-white" : "text-purple-500"}`} />
                    <span className={`text-sm ${isSelected ? "text-white" : "text-purple-600"}`}>Cliente:</span>
                    <span className={`font-medium ${isSelected ? "text-white" : "text-black"}`}>{order.client}</span>
                </div>

                <Separator className={isSelected ? "bg-white/30" : ""} />

                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Package className={`w-4 h-4 ${isSelected ? "text-white" : "text-purple-500"}`} />
                        <span className={`font-medium ${isSelected ? "text-white" : "text-purple-900"}`}>Produto</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <span className={`${isSelected ? "text-white" : "text-purple-600"}`}>Marca:</span>
                            <p className={`font-medium ${isSelected ? "text-white" : "text-black"}`}>{order.brand}</p>
                        </div>
                        <div>
                            <span className={`${isSelected ? "text-white" : "text-purple-600"}`}>Código:</span>
                            <p className={`font-medium ${isSelected ? "text-white" : "text-black"}`}>{order.code}</p>
                        </div>
                        <div>
                            <span className={`${isSelected ? "text-white" : "text-purple-600"}`}>Tamanho:</span>
                            <p className={`font-medium ${isSelected ? "text-white" : "text-black"}`}>{order.size}</p>
                        </div>
                        <div>
                            <span className={`${isSelected ? "text-white" : "text-purple-600"}`}>Quantidade:</span>
                            <p className={`font-medium ${isSelected ? "text-white" : "text-black"}`}>{order.amount}</p>
                        </div>
                    </div>

                    {order.description && (
                        <div>
                            <span className={`text-sm ${isSelected ? "text-white" : "text-purple-600"}`}>Descrição:</span>
                            <p className={`text-sm font-medium mt-1 ${isSelected ? "text-white" : "text-black"}`}>
                                {order.description}
                            </p>
                        </div>
                    )}
                </div>

                <Separator className={isSelected ? "bg-white/30" : ""} />

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Tag className={`w-4 h-4 ${isSelected ? "text-white" : "text-purple-500"}`} />
                        <span className={`text-sm ${isSelected ? "text-white" : "text-purple-600"}`}>Preço Custo:</span>
                    </div>
                    <span className={`font-bold text-lg ${isSelected ? "text-white" : "text-green-600"}`}>
                        {formatCurrency(order.cost_price)}
                    </span>
                </div>

                <Separator className={isSelected ? "bg-white/30" : ""} />

                <div className="flex items-center gap-2">
                    <Calendar className={`w-4 h-4 ${isSelected ? "text-white" : "text-purple-500"}`} />
                    <span className={`text-sm ${isSelected ? "text-white" : "text-purple-600"}`}>Data da Compra:</span>
                    <span className={`font-medium ${isSelected ? "text-white" : "text-black"}`}>
                        {formatDate(order.date_order)}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
