"use client"

import type { Order } from "@/app/home/orders/order.interface"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { formatCurrency, formatDate } from "@/functions/format-functions"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarDays, CreditCard, DollarSign, Eye, EyeOff, Package, User } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { IsLoadingCard } from "../global/isloading-card"

interface iProps {
  isLoadingPending: boolean
  orders: Order[]
  update: (dto: { order_id: number; paid_price: number; }[]) => Promise<void>
  isPending: boolean
}

const paymentSchema = z.object({
  payments: z.record(
    z.string(),
    z.object({
      amount: z
        .string()
        .min(1, "Valor é obrigatório")
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Valor deve ser um número positivo"),
    }),
  ),
})

type PaymentFormData = z.infer<typeof paymentSchema>

export const AccountsReceive = ({ isLoadingPending, orders, isPending, update }: iProps) => {
  const [selectedOrders, setSelectedOrders] = useState<Set<number>>(new Set())
  const [visibleFields, setVisibleFields] = useState<Record<number, Set<string>>>({})
  const [showAllSensitiveInfo, setShowAllSensitiveInfo] = useState(false)

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      payments: {},
    },
  })

  const calculatePendingAmount = (order: Order) => {
    return order.total_price - order.paid_price
  }

  const toggleOrderSelection = (orderId: number) => {
    const newSelected = new Set(selectedOrders)
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId)
    } else {
      newSelected.add(orderId)
    }
    setSelectedOrders(newSelected)
  }

  const toggleFieldVisibility = (orderId: number, fieldName: string) => {
    setVisibleFields((prev) => {
      const current = prev[orderId] ?? new Set<string>()
      const newSet = new Set(current)
      if (newSet.has(fieldName)) {
        newSet.delete(fieldName)
      } else {
        newSet.add(fieldName)
      }
      return { ...prev, [orderId]: newSet }
    })
  }

  const isFieldVisible = (orderId: number, fieldName: string) => {
    return visibleFields[orderId]?.has(fieldName) ?? false
  }

  const shouldShowField = (orderId: number, fieldName: string) => {
    return showAllSensitiveInfo || isFieldVisible(orderId, fieldName)
  }

  const onSubmit = async (data: PaymentFormData) => {
    const payments = Object.entries(data.payments).map(([orderId, payment]) => ({
      order_id: Number(orderId),
      paid_price: Number(payment.amount),
    }))

    try {
      await update(payments)

      toast("Pagamentos processados", {
        description: `${payments.length} pagamento(s) foram registrados com sucesso.`,
      })

      form.reset()
      setSelectedOrders(new Set())
      setShowAllSensitiveInfo(false)
      setVisibleFields({})
    } catch (err) {
      toast.error("Erro ao processar pagamentos")
    }
  }


  if (isLoadingPending) <IsLoadingCard />

  return (
    <div className="space-y-6">
      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma conta pendente</h3>
            <p className="text-muted-foreground text-center">Todos os pedidos foram pagos integralmente.</p>
          </CardContent>
        </Card>
      ) : (

        <Form {...form}>
          <div className="flex w-full">
            <Button variant="default" onClick={() => setShowAllSensitiveInfo((prev) => !prev)} className="w-full">
              {showAllSensitiveInfo ? "Ocultar tudo" : "Mostrar tudo"}
            </Button>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4">
              {orders.map((order) => {
                const pendingAmount = calculatePendingAmount(order)
                const isSelected = selectedOrders.has(order.id)

                return (
                  <Card
                    key={order.id}
                    className={`transition-all cursor-pointer ${isSelected ? "ring-2 ring-primary border-primary" : "hover:shadow-md"
                      }`}
                    onClick={() => toggleOrderSelection(order.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <CardTitle className="text-lg">Pedido #{order.code}</CardTitle>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Valor pendente</p>
                          <p className="text-lg font-bold text-destructive flex items-center gap-2">
                            {shouldShowField(order.id, "pendingAmount") ? formatCurrency(pendingAmount) : "R$ ••••"}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFieldVisibility(order.id, "pendingAmount")
                              }}
                            >
                              {isFieldVisible(order.id, "pendingAmount") ? (
                                <EyeOff className="h-3 w-3 text-gray-500" />
                              ) : (
                                <Eye className="h-3 w-3 text-gray-500" />
                              )}
                            </Button>
                          </p>
                        </div>
                      </div>

                      <CardDescription className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{order?.client_infos?.client_name}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <CalendarDays className="h-3 w-3" />
                          <span>{formatDate(order.date_creation_order)}</span>
                        </span>
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Produto</p>
                          <p className="text-sm text-muted-foreground">{order.description || "Sem descrição"}</p>
                          <p className="text-xs text-muted-foreground">
                            Tamanho: {order.size} | Qtd: {order.amount}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <p className="text-sm font-medium">Valores</p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm items-center">
                              <span>Total:</span>
                              <span className="flex items-center gap-2">
                                {shouldShowField(order.id, "totalAmount")
                                  ? formatCurrency(order.total_price)
                                  : "R$ ••••"}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 w-4 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleFieldVisibility(order.id, "totalAmount")
                                  }}
                                >
                                  {isFieldVisible(order.id, "totalAmount") ? (
                                    <EyeOff className="h-3 w-3 text-gray-500" />
                                  ) : (
                                    <Eye className="h-3 w-3 text-gray-500" />
                                  )}
                                </Button>
                              </span>
                            </div>
                            <div className="flex justify-between text-sm items-center">
                              <span>Pago:</span>
                              <span className="flex items-center gap-2 text-green-600">
                                {shouldShowField(order.id, "paidAmount") ? formatCurrency(order.paid_price) : "R$ ••••"}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 w-4 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleFieldVisibility(order.id, "paidAmount")
                                  }}
                                >
                                  {isFieldVisible(order.id, "paidAmount") ? (
                                    <EyeOff className="h-3 w-3 text-gray-500" />
                                  ) : (
                                    <Eye className="h-3 w-3 text-gray-500" />
                                  )}
                                </Button>
                              </span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-sm font-medium items-center">
                              <span>Pendente:</span>
                              <span className="flex items-center gap-2 text-destructive">
                                {shouldShowField(order.id, "pendingAmount") ? formatCurrency(pendingAmount) : "R$ ••••"}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 w-4 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleFieldVisibility(order.id, "pendingAmount")
                                  }}
                                >
                                  {isFieldVisible(order.id, "pendingAmount") ? (
                                    <EyeOff className="h-3 w-3 text-gray-500" />
                                  ) : (
                                    <Eye className="h-3 w-3 text-gray-500" />
                                  )}
                                </Button>
                              </span>
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="space-y-2">
                            <FormField
                              control={form.control}
                              name={`payments.${order.id}.amount`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center space-x-1">
                                    <DollarSign className="h-3 w-3" />
                                    <span>Valor a pagar</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      placeholder="0,00"
                                      {...field}
                                      onClick={(e) => e.stopPropagation()}
                                      onChange={(e) => {
                                        const value = Number(e.target.value)
                                        if (value > pendingAmount) {
                                          field.onChange(pendingAmount.toString())
                                        } else {
                                          field.onChange(e.target.value)
                                        }
                                        e.stopPropagation()
                                      }}
                                      max={pendingAmount}
                                    />
                                  </FormControl>
                                  <FormDescription>Máximo: {formatCurrency(pendingAmount)}</FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        )}
                      </div>

                      {!isSelected && (
                        <div className="text-center py-2">
                          <p className="text-sm text-muted-foreground">
                            Clique para selecionar e definir valor do pagamento
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {selectedOrders.size > 0 && (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border rounded-2xl shadow-sm bg-muted/50">
                <div className="space-y-1">
                  <p className="text-lg font-semibold">{selectedOrders.size} pedido(s) selecionado(s)</p>
                  <p className="text-sm text-muted-foreground">Defina os valores e confirme os pagamentos</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedOrders(new Set())
                      form.reset()
                      setShowAllSensitiveInfo(false)
                      setVisibleFields({})
                    }}
                    className="flex-1 sm:flex-none"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1 sm:flex-none">
                    Processar Pagamentos
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>
      )}
    </div>
  )
}
