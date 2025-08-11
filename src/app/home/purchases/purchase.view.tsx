import { Skeleton } from "@/components/ui/skeleton"
import { PurchaseCard } from "../../../components/purchase/purchase-card"
import { Order } from "../orders/order.interface"
import { usePurchaseModel } from "./purchase.model"

type PurchasesViewProps = ReturnType<typeof usePurchaseModel>

export const PurchasesView = (props: PurchasesViewProps) => {
    const { data, isLoading, selectedOrders, setSelectedOrders } = props

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4 p-4">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <Skeleton className="h-[125px] w-full rounded-xl" />
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
        <div className="pb-6">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 mb-4 z-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Pedidos de Compra</h2>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {data.length} {data.length === 1 ? "pedido" : "pedidos"}
                    </span>
                </div>
            </div>
            <div>{selectedOrders.length == 0 ? null : selectedOrders.toString()}</div>
            <div className="px-4 space-y-4">
                {data.map((order: Order, index: number) => (
                    <div
                        key={`order-${order.id}-${index}`}
                        className="transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <PurchaseCard
                            key={order.id}
                            order={order}
                            setSelectOrder={setSelectedOrders}
                            selectedOrders={selectedOrders}
                        />
                    </div>
                ))}
            </div>

            <div className="mt-8 px-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-500">Mostrando todos os {data.length} pedidos</p>
                </div>
            </div>
        </div>
    )
}