import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import useMutationCreateOrder from "./hooks/useMutateCreateOrder"
import useQueryGetAllOrders from "./hooks/useQueryGetAllOrders"
import { CreateOrderSchema, Order, orderSchema } from "./order.interface"

export const useOrdersModel = () => {
    const { data, isLoading } = useQueryGetAllOrders()
    const { mutateAsync, isPending } = useMutationCreateOrder()

    const [valuesForm, setValuesForm] = useState<CreateOrderSchema[]>([])
    const [confirmedOrder, setConfirmedOrder] = useState<Order[] | null>(null)

    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof orderSchema>>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            client: "",
            brand: "",
            code: "",
            description: "",
            size: "",
            amount: 0,
            cost_price: 0,
            sale_price: 0,
            total_price: 0
        }
    })

    function onSubmit() {
        mutateAsync(valuesForm)
        form.reset()
        setValuesForm([])
        queryClient.invalidateQueries({
            queryKey: ["getAllOrders"],
            exact: true
        })
    }

    function addToList() {
        const data = form.getValues()
        setValuesForm(prev => [...prev, data])
        form.reset()
    }

    form.setValue("total_price", (form.watch("sale_price") ?? 0) * (form.watch("amount") ?? 1));

    return {
        form,
        onSubmit,
        mutateAsync, isPending,
        valuesForm, setValuesForm,
        addToList,
        data, isLoading,
        confirmedOrder, setConfirmedOrder
    }
}