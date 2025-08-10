import useQueryGetOrdersByStatus from "./hooks/useQueryGetOrdersByStatus"

export const usePurchaseModel = () => {
    const status = 4
    const { data, isLoading } = useQueryGetOrdersByStatus(status)

    return {
        data, isLoading
    }
}