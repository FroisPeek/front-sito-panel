"use client"

import type { Order } from "@/app/home/orders/order.interface"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Status } from "@/constants/order-status"
import { formatCurrency, formatDate } from "@/functions/format-functions"
import { Loader2, Package } from "lucide-react"
import { useState } from "react"

interface iProps {
    onUpdate: (orders: number[], value: number) => void
    order: Order
    disabled?: boolean
}

export const ButtonReadyToSend = ({ onUpdate, order, disabled = false }: iProps) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleConfirm = async () => {
        setIsLoading(true)
        try {
            await onUpdate([order.id], Status.ReadyForDelivery)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="w-full" disabled={disabled || isLoading} variant="default">
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processando...
                        </>
                    ) : (
                        <>
                            <Package className="mr-2 h-4 w-4" />
                            Confirmar pronta entrega
                        </>
                    )}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar pronta entrega</AlertDialogTitle>
                    <AlertDialogDescription asChild>
                        <div className="space-y-2">
                            <p>Deseja confirmar que o pedido está pronto para entrega?</p>
                            <div className="bg-muted p-3 rounded-md space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span className="font-medium">Cliente:</span>
                                    <span>{order.client_infos.client_name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Código:</span>
                                    <span>#{order.code}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Valor total:</span>
                                    <span className="font-semibold">{formatCurrency(order.total_price)}</span>
                                </div>
                                {order.description && (
                                    <div className="flex justify-between">
                                        <span className="font-medium">Descrição:</span>
                                        <span className="text-right max-w-[200px] truncate">{order.description}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="font-medium">Data do pedido:</span>
                                    <span>{formatDate(order.date_creation_order)}</span>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">Esta ação não pode ser desfeita.</p>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Confirmando...
                            </>
                        ) : (
                            "Confirmar entrega"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
