import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { loginSchema } from "./login.interface"

export const useLoginModel = () => {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof loginSchema>) {
        console.log(values)
    }

    return {
        form, onSubmit
    }
}
