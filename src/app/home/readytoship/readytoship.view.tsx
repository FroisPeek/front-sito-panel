import { IsLoadingCard } from "@/components/global/isloading-card"
import { NotFoundOrder } from "@/components/global/not-found-order"
import { ReadyToShipCard } from "@/components/readytoship/readytoship-card"
import { Order } from "../orders/order.interface"
import { useReadyToShipModel } from "./readytoship.model"

type ReadyToShipViewProps = ReturnType<typeof useReadyToShipModel>

export const ReadyToShipView = (props: ReadyToShipViewProps) => {
    const { data, isLoading, form, onSubmit } = props

    if (isLoading) return <IsLoadingCard />

    if (data.length === 0) return <NotFoundOrder />

    return (
        <div className="flex flex-col gap-4">
            <div className="px-2 mb-1 bg-white rounded py-2 border ">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Visualize todos seus pedidos</h2>
                <p className="text-gray-600 text-sm">Esse é o local onde vamos cadastrar um novo cliente</p>
            </div>
            {data.map((item: Order) => (
                <ReadyToShipCard
                    order={item}
                    form={form}
                    onSubmit={onSubmit}
                />
            ))}
        </div>
    )
}