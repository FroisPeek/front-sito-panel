import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutateLogin } from "./hook/useMutateAuthLogin"
import { loginSchema } from "./login.interface"

export const useLoginModel = () => {
    const { mutateAsync, isPending } = useMutateLogin();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof loginSchema>) {
        console.log(values)
        mutateAsync(values)
    }

    return {
        form, onSubmit,
        mutateAsync, isPending
    }
}
