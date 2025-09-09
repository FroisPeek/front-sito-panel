"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Status } from "@/constants/order-status"
import { Eye, EyeOff } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"
import type { Order } from "../../app/home/orders/order.interface"
import { IsLoadingCard } from "../global/isloading-card"
import { NotFoundOrder } from "../global/not-found-order"
import { AccordionOrderCard } from "./accordion-order-card"

interface iProps {
  data: Order[]
  isLoading: boolean
  onEditOrder?: (order: Order, index: number) => void
  onDeleteOrder?: (index: number) => void
  confirmedOrder: number[]
  setConfirmedOrder: Dispatch<SetStateAction<number[]>>
  onUpdate: (orders: number[], value: number) => void
  showAllSensitiveInfo: boolean
  setShowAllSensitiveInfo: (show: boolean) => void
  toggleFieldVisibility: (orderId: number, fieldName: string) => void
  isFieldVisible: (orderId: number, fieldName: string) => boolean
  shouldShowField: (orderId: number, fieldName: string) => boolean
}

export const ShoppingView = ({
  data,
  isLoading,
  confirmedOrder,
  setConfirmedOrder,
  onUpdate,
  showAllSensitiveInfo,
  setShowAllSensitiveInfo,
  toggleFieldVisibility,
  isFieldVisible,
  shouldShowField,
}: iProps) => {
  if (isLoading) return <IsLoadingCard />

  if (data.length === 0) return <NotFoundOrder />

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-purple-200 p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {showAllSensitiveInfo ? (
              <Eye className="w-5 h-5 text-purple-600" />
            ) : (
              <EyeOff className="w-5 h-5 text-gray-400" />
            )}
            <Label htmlFor="show-sensitive" className="text-sm font-medium">
              Mostrar todas as informações sensíveis
            </Label>
            <Switch id="show-sensitive" checked={showAllSensitiveInfo} onCheckedChange={setShowAllSensitiveInfo} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="pr-4">
            <h2 className="text-xl font-semibold text-purple-900">Lista de Pedidos ({data.length})</h2>
            <p className="text-sm text-gray-600 mt-1">Gerencie seus pedidos de forma detalhada</p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-600">Total Geral</p>
            <p className="text-2xl font-bold text-purple-600 whitespace-nowrap">
              {showAllSensitiveInfo
                ? `R$ ${data.reduce((total, order) => total + order.sale_price * order.amount, 0).toFixed(2)}`
                : "R$ ••••••••"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500">Total de Itens</p>
            <p className="font-semibold text-gray-900">{data.reduce((total, order) => total + order.amount, 0)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Custo Total</p>
            <p className="font-semibold text-red-600">
              {showAllSensitiveInfo
                ? `R$ ${data.reduce((total, order) => total + order.cost_price * order.amount, 0).toFixed(2)}`
                : "R$ ••••••"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Receita Total</p>
            <p className="font-semibold text-green-600">
              {showAllSensitiveInfo
                ? `R$ ${data.reduce((total, order) => total + order.sale_price * order.amount, 0).toFixed(2)}`
                : "R$ ••••••"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Lucro Total</p>
            <p className="font-semibold text-blue-600">
              {showAllSensitiveInfo
                ? `R$ ${data.reduce((total, order) => total + (order.sale_price - order.cost_price) * order.amount, 0).toFixed(2)}`
                : "R$ ••••••"}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Button className="w-full" onClick={() => onUpdate(confirmedOrder, Status.ConfirmSale)}>
          Efetivar pedido(s)
        </Button>
      </div>

      <div className="space-y-3">
        {data.map((order, index) => (
          <AccordionOrderCard
            key={`order-${index}-${order.code}`}
            order={order}
            index={index}
            handleSelectOrder={setConfirmedOrder}
            confirmedOrder={confirmedOrder}
            onUpdate={onUpdate}
            showAllSensitiveInfo={showAllSensitiveInfo}
            toggleFieldVisibility={toggleFieldVisibility}
            isFieldVisible={isFieldVisible}
            shouldShowField={shouldShowField}
          />
        ))}
      </div>

      {data.length > 0 && (
        <div className="bg-white rounded-lg border border-purple-200 p-4 mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {data.length} {data.length === 1 ? "pedido" : "pedidos"} carregado{data.length === 1 ? "" : "s"}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
