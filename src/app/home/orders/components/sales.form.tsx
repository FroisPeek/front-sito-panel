"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { UseFormReturn } from "react-hook-form"
import type z from "zod"
import type { output } from "zod"
import type { orderSchema } from "../order.interface"

interface iProps {
    form: UseFormReturn<z.infer<typeof orderSchema>>
    onSubmit: (values: output<typeof orderSchema>) => void
}

export const SalesForm = ({ form, onSubmit }: iProps) => {
    return (
        <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="p-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="client"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium">Cliente</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nome do cliente"
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
                                name="brand"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium">Marca</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Marca do produto"
                                                className="h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium">Código</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Código do produto"
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
                                name="size"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium">Tamanho</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Tamanho"
                                                className="h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 font-medium">Descrição</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Descrição do produto"
                                            className="min-h-[100px] border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium">Quantidade</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="1"
                                                placeholder="1"
                                                className="h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cost_price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium">Preço de Custo</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                min="0.01"
                                                placeholder="0,00"
                                                className="h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="sale_price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium">Preço de Venda</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                min="0.01"
                                                placeholder="0,00"
                                                className="h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="total_price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium">Preço Total</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                min="0.01"
                                                readOnly
                                                placeholder="0,00"
                                                className="h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <p className="text-sm text-gray-600">Esses campo não é editável</p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium">Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                                                    <SelectValue placeholder="Selecione o status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="pendente">Pendente</SelectItem>
                                                <SelectItem value="concluida">Concluída</SelectItem>
                                                <SelectItem value="cancelada">Cancelada</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex w-full gap-2 pt-6 border-t border-gray-200">
                            <Button
                                type="submit"
                                className="h-11 bg-purple-600 hover:bg-purple-700 text-white font-medium"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting ? "Salvando..." : "Salvar Venda"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="h-11 border-gray-300 hover:bg-gray-50 bg-transparent"
                                onClick={() => form.reset()}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
