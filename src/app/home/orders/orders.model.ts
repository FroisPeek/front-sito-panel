import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import useMutationCreateOrder from "./hooks/useMutateCreateOrder"
import { CreateOrderSchema, orderSchema } from "./order.interface"

export const useOrdersModel = () => {
    const { mutateAsync, isPending } = useMutationCreateOrder()
    const [valuesForm, setValuesForm] = useState<CreateOrderSchema[]>([])

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
        addToList
    }
}