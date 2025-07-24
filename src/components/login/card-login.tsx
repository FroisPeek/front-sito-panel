import { loginSchema } from "@/app/login.interface"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

interface iProps {
    form: UseFormReturn<z.infer<typeof loginSchema>>
    onSubmit: (values: z.infer<typeof loginSchema>) => void
    router: AppRouterInstance
}

export const CardLogin = ({ form, onSubmit, router }: iProps) => {
    const [viewControl, setViewControl] = useState<boolean>(false)

    return (
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                    Bem-vindo de volta
                </CardTitle>
                <CardDescription className="text-gray-600">
                    Entre na sua conta para acessar o painel
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="login"
                                            className="h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 font-medium">Senha</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={viewControl ? "text" : "password"}
                                                placeholder="••••••••"
                                                className="h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500 pr-10"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                tabIndex={-1}
                                                onClick={() => setViewControl(!viewControl)}
                                            >
                                                {viewControl ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center justify-between text-sm">
                            <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                                Esqueceu a senha?
                            </a>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 bg-purple-600 hover:bg-purple-700 text-white font-medium"
                            onClick={() => router.push("/home")}
                        >
                            Entrar no Painel
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}