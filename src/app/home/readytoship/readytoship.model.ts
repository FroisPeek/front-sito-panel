import { Status } from "@/constants/order-status"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"
import useMutationUpdateStatusOrder from "../orders/hooks/useMutateUpdateStatusOrder"
import useQueryGetOrdersByStatus from "../orders/hooks/useQueryGetOrdersByStatus"
import { formSchema } from "./readytoship.interface"

export const useReadyToShipModel = () => {
    const { data, isLoading } = useQueryGetOrdersByStatus(Status.ReadyForDelivery)
    const { mutateAsync: updateStautsOrderAync, isPending: isPendingUpdateStatusOrder } = useMutationUpdateStatusOrder()

    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            client: "",
            sale_price: 0
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    async function onUpdate(orders: number[], value: number) {
        await updateStautsOrderAync({ orders: orders, value: value })
        queryClient.invalidateQueries({
            queryKey: ["getOrdersByStatus"],
            exact: true
        })
    }

    return {
        data, isLoading,
        form,
        onSubmit,
        onUpdate, isPendingUpdateStatusOrder
    }
}