"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import type z from "zod"
import useMutationCreateOrder from "./hooks/useMutateCreateOrder"
import useMutationUpdateStatusOrder from "./hooks/useMutateUpdateStatusOrder"
import useQueryGetAllOrders from "./hooks/useQueryGetAllOrders"
import { type CreateOrderSchema, orderSchema } from "./order.interface"

export const useOrdersModel = () => {
    const { data, isLoading } = useQueryGetAllOrders()
    const { mutateAsync, isPending } = useMutationCreateOrder()
    const { mutateAsync: updateStautsOrderAync, isPending: isPendingUpdateStatusOrder } = useMutationUpdateStatusOrder()

    const [valuesForm, setValuesForm] = useState<CreateOrderSchema[]>([])
    const [confirmedOrder, setConfirmedOrder] = useState<number[]>([])

    const queryClient = useQueryClient()

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
            total_price: 0,
        },
    })

    async function onSubmit() {
        await mutateAsync(valuesForm)
        form.reset()
        setValuesForm([])
        queryClient.invalidateQueries({
            queryKey: ["getAllOrders"],
            exact: true,
        })
    }

    async function onUpdate(orders: number[], value: number) {
        await updateStautsOrderAync({ orders: orders, value: value })
        setConfirmedOrder([])
        queryClient.invalidateQueries({
            queryKey: ["getAllOrders"],
            exact: true,
        })
    }

    function addToList() {
        const data = form.getValues()
        setValuesForm((prev) => [...prev, data])
        form.reset()
    }

    form.setValue("total_price", (form.watch("sale_price") ?? 0) * (form.watch("amount") ?? 1))

    return {
        form,
        onSubmit,
        mutateAsync,
        isPending,
        valuesForm,
        setValuesForm,
        addToList,
        data,
        isLoading,
        confirmedOrder,
        setConfirmedOrder,
        isPendingUpdateStatusOrder,
        onUpdate,
    }
}
