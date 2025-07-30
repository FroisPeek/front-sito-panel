import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { orderSchema } from "./order.interface"

export const useOrdersModel = () => {
    const form = useForm<z.infer<typeof orderSchema>>({
        resolver: zodResolver(orderSchema),
    })

    function onSubmit(values: z.infer<typeof orderSchema>) {
        console.log(values)
    }

    form.setValue("total_price", (form.watch("sale_price") ?? 0) * (form.watch("amount") ?? 1));

    return {
        form,
        onSubmit,

    }
}