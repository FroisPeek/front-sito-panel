import { useOrdersModel } from "./orders.model"

type OrdersViewProps = ReturnType<typeof useOrdersModel>

export const OrdersView = (props: OrdersViewProps) => {
    const { teste } = props

    return (
        <div>
            Order
        </div>
    )
}