import { Status } from "@/constants/order-status"
import { useState } from "react"
import useQueryGetOrdersByStatus from "./hooks/useQueryGetOrdersByStatus"

export const usePurchaseModel = () => {
    const { data, isLoading } = useQueryGetOrdersByStatus(Status.ConfirmSale)

    const [selectedOrders, setSelectedOrders] = useState<number[]>([])

    return {
        data, isLoading,
        setSelectedOrders, selectedOrders
    }
}