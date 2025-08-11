import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatDate, getStatusColor } from "@/functions/format-functions";
import { Calendar, Package, ShoppingCart, Tag, User } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Order } from "../../app/home/orders/order.interface";

interface iProps {
    setSelectOrder: Dispatch<SetStateAction<number[]>>;
    order: Order;
    selectedOrders: number[];
}

export const PurchaseCard = ({ order, setSelectOrder, selectedOrders }: iProps) => {
    const isChecked = selectedOrders.includes(order.id);

    const handleCheckboxChange = (checked: boolean) => {
        setSelectOrder((prev) =>
            checked ? [...prev, order.id] : prev.filter((id) => id !== order.id)
        );
    };

    return (
        <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold text-lg">Pedido #{order.id}</span>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} font-medium`}>
                        {order.status}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-purple-600">Cliente:</span>
                        <span className="font-medium">{order.client}</span>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <span className="text-sm text-purple-600">Selecionar</span>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => handleCheckboxChange(e.target.checked)}
                            className="w-5 h-5 accent-purple-600 rounded border-gray-300"
                        />
                    </label>
                </div>

                <Separator />

                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-purple-500" />
                        <span className="font-medium text-purple-900">Produto</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <span className="text-purple-600">Marca:</span>
                            <p className="font-medium">{order.brand}</p>
                        </div>
                        <div>
                            <span className="text-purple-600">Código:</span>
                            <p className="font-medium">{order.code}</p>
                        </div>
                        <div>
                            <span className="text-purple-600">Tamanho:</span>
                            <p className="font-medium">{order.size}</p>
                        </div>
                        <div>
                            <span className="text-purple-600">Quantidade:</span>
                            <p className="font-medium">{order.amount}</p>
                        </div>
                    </div>

                    {order.description && (
                        <div>
                            <span className="text-purple-600 text-sm">Descrição:</span>
                            <p className="text-sm font-medium mt-1">{order.description}</p>
                        </div>
                    )}
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-purple-600">Preço Custo:</span>
                    </div>
                    <span className="font-bold text-lg text-green-600">
                        {formatCurrency(order.cost_price)}
                    </span>
                </div>

                <Separator />

                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-purple-600">Data da Compra:</span>
                    <span className="font-medium">{formatDate(order.date_order)}</span>
                </div>
            </CardContent>
        </Card>
    );
};
