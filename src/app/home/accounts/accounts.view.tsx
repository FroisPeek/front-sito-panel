import { AccountsList } from "@/components/accounts/accounts-list"
import { AccoutnsReceive } from "@/components/accounts/accounts-receive"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { triggerStyle } from "@/constants/style/trigger.style"
import { Package, ShoppingCart } from "lucide-react"
import { useAccountsModel } from "./accounts.model"

type AccountsViewProps = ReturnType<typeof useAccountsModel>

export const AccountsView = (props: AccountsViewProps) => {
    const { data, isLoading, selectedOrders, setSelectedOrders, totalValueToPay, onUpdate, handleCardClick, canSelectCard, firstSelectedOrder, clients, isLoadingClients } = props

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
            <Tabs defaultValue="accounts-list" className="w-full">
                <TabsList className="grid w-full grid-cols-2 p-1 h-12 bg-white">
                    <TabsTrigger value="accounts-list" className={triggerStyle}>
                        <ShoppingCart className="w-4 h-4" />
                        <span className="hidden sm:inline">Compras a Pagar</span>
                        <span className="sm:hidden">Compras a Pagar</span>
                    </TabsTrigger>
                    <TabsTrigger value="accounts-receive" className={triggerStyle}>
                        <Package className="w-4 h-4" />
                        <span className="hidden sm:inline">Compras a Receber</span>
                        <span className="sm:hidden">Compras a Receber</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="accounts-list" className="mt-0 p-4 sm:p-6">
                    <AccountsList
                        canSelectCard={canSelectCard}
                        data={data}
                        firstSelectedOrder={firstSelectedOrder}
                        handleCardClick={handleCardClick}
                        onUpdate={onUpdate}
                        selectedOrders={selectedOrders}
                        setSelectedOrders={setSelectedOrders}
                        totalValueToPay={totalValueToPay}
                    />
                </TabsContent>

                <TabsContent value="accounts-receive" className="mt-0 p-4 sm:p-6">
                    <AccoutnsReceive
                        clients={clients}
                        isLoadingClients={isLoadingClients}
                    />
                </TabsContent>
            </Tabs>


        </div>
    )
}