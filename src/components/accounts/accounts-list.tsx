import { Order } from "@/app/home/orders/order.interface";
import { Status, Status_String } from "@/constants/order-status";
import { CheckCircle2, Package, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { PurchaseCard } from "./accounts-card";

interface iProps {
    data: Order[]
    selectedOrders: number[]
    totalValueToPay: (codes: number[], data: Order[]) => number
    firstSelectedOrder: Order | null
    onUpdate: (orders: number[], value: number) => Promise<void>
    setSelectedOrders: Dispatch<SetStateAction<number[]>>
    handleCardClick: (isSelected: boolean, order: Order) => void
    canSelectCard: (order: Order) => boolean
}

export const AccountsList = ({ data, selectedOrders, totalValueToPay, firstSelectedOrder, onUpdate, setSelectedOrders, handleCardClick, canSelectCard }: iProps) => {
    return (
        <>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 mb-4 z-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Pedidos de Compra</h2>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {data.length} {data.length === 1 ? "pedido" : "pedidos"}
                    </span>
                </div>
            </div>

            {selectedOrders.length > 0 && (
                <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                                Pedidos de Compra
                            </h2>
                            <p className="text-sm font-gray-600">
                                Total de todos os valores selecionados: R${totalValueToPay(selectedOrders, data)}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <Package className="w-4 h-4" />
                                    {data.length} {data.length === 1 ? "pedido" : "pedidos"}
                                </span>

                                <span className="flex items-center gap-1 text-purple-600">
                                    <CheckCircle2 className="w-4 h-4" />
                                    {selectedOrders.length} selecionado
                                    {selectedOrders.length !== 1 ? "s" : ""}
                                </span>
                            </div> </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                                    {selectedOrders.length} selecionado
                                    {selectedOrders.length !== 1 ? "s" : ""}
                                </Badge>
                                <span className="text-sm text-gray-600">
                                    Ações em lote disponíveis
                                </span>
                            </div>

                            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 w-full sm:w-auto"
                                    onClick={() => {
                                        firstSelectedOrder?.status === Status_String.ConfirmSale ?
                                            onUpdate(selectedOrders, Status.PaidPurchase) :
                                            onUpdate(selectedOrders, Status.Checked)
                                    }}
                                >
                                    <CheckCircle2 className="w-4 h-4" />
                                    {firstSelectedOrder?.status === Status_String.ConfirmSale ? `Efetivar compra` : `Conferir comprar`}
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => setSelectedOrders([])}
                                    className="gap-2 w-full sm:w-auto"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Limpar Seleção
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="px-4 space-y-4 mt-4">
                {data.map((order: Order, index: number) => (
                    <div
                        key={`order-${order.id}-${index}`}
                        className="transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <PurchaseCard
                            idx={index + 1}
                            key={order.id}
                            order={order}
                            selectedOrders={selectedOrders}
                            handleCardClick={handleCardClick}
                            canSelectCard={canSelectCard}
                        />
                    </div>
                ))}
            </div>

            <div className="mt-8 px-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-500">Mostrando todos os {data.length} pedidos</p>
                </div>
            </div>
        </>
    )
}