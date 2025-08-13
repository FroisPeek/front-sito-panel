import { Status } from "@/constants/order-status"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import useMutationUpdateStatusOrder from "../orders/hooks/useMutateUpdateStatusOrder"
import { Order } from "../orders/order.interface"
import useQueryGetOrdersByStatus from "./hooks/useQueryGetOrdersByStatus"

export const useAccountsModel = () => {
    const { data, isLoading } = useQueryGetOrdersByStatus(Status.ConfirmSale)
    const { mutateAsync } = useMutationUpdateStatusOrder();

    const [selectedOrders, setSelectedOrders] = useState<number[]>([])

    const queryClient = useQueryClient();

    function totalValueToPay(codes: number[], data: Order[]) {
        return data
            .filter(order => codes.includes(order.id))
            .reduce((total, order) => total + (order.cost_price ?? 0), 0);
    }

    async function onUpdate(orders: number[], value: number) {
        await mutateAsync({ orders: orders, value: value })
        setSelectedOrders([])
        queryClient.invalidateQueries({
            queryKey: ["getOrdersByStatus"],
            exact: true
        })
    }

    return {
        data, isLoading,
        setSelectedOrders, selectedOrders,
        totalValueToPay,
        onUpdate
    }
}