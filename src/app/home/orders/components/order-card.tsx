import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DollarSign, Hash, Package, Ruler, Tag, User } from "lucide-react"
import type { CreateOrderSchema } from "../order.interface"

interface OrderCardProps {
    order: CreateOrderSchema
    index: number
}

export const OrderCard = ({ order, index }: OrderCardProps) => {
    const profit = order.sale_price - order.cost_price
    const profitMargin = ((profit / order.sale_price) * 100).toFixed(1)

    return (
        <Card className="bg-purple-100 border-purple-200 shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                        </div>
                        <h3 className="text-lg font-semibold text-purple-900">Pedido #{index + 1}</h3>
                    </div>
                    <Badge variant="secondary" className="bg-purple-200 text-purple-800">
                        {order.amount} {order.amount === 1 ? "item" : "itens"}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
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

                <div className="flex items-start gap-2">
                    <Package className="w-4 h-4 text-purple-600 mt-1" />
                    <div className="flex-1">
                        <p className="text-xs text-gray-600 uppercase tracking-wide">Descrição</p>
                        <p className="font-medium text-gray-900 leading-relaxed">{order.description}</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center gap-2 mb-3">
                        <DollarSign className="w-4 h-4 text-purple-600" />
                        <p className="text-xs text-gray-600 uppercase tracking-wide font-medium">Informações Financeiras</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <p className="text-xs text-gray-500">Custo</p>
                            <p className="font-bold text-red-600">R$ {order.cost_price.toFixed(2)}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-gray-500">Venda</p>
                            <p className="font-bold text-green-600">R$ {order.sale_price.toFixed(2)}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-gray-500">Lucro</p>
                            <p className="font-bold text-blue-600">R$ {profit.toFixed(2)}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-gray-500">Margem</p>
                            <p className="font-bold text-purple-600">{profitMargin}%</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
