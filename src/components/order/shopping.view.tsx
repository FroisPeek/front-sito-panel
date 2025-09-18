"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Status } from "@/constants/order-status"
import { Eye, EyeOff, Search } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"
import { useMemo, useState } from "react"
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
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data

    const searchLower = searchTerm.toLowerCase().trim()

    return data.filter((order) => {
      // Search in basic fields
      const basicFields = [
        order.code,
        order.description,
        order.size,
        order.status,
        order.brand,
        order.status_conference,
        order.client_infos.client_name,
      ].some((field) => field?.toString().toLowerCase().includes(searchLower))

      // Search in numeric fields (converted to string)
      const numericFields = [
        order.id,
        order.amount,
        order.cost_price,
        order.sale_price,
        order.total_price,
        order.tenant_id,
        order.client_infos.client_id,
        order.paid_price,
      ].some((field) => field?.toString().includes(searchLower))

      // Search in date fields
      const dateFields = [
        order.date_creation_order,
        order.date_order,
        order.date_purchase_order,
        order.date_conference,
      ].some((field) => field?.toString().toLowerCase().includes(searchLower))

      return basicFields || numericFields || dateFields
    })
  }, [data, searchTerm])

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

        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Filtrar pedidos por qualquer informação (código, descrição, cliente, status, etc.)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          {searchTerm && (
            <p className="text-xs text-gray-500 mt-1">
              {filteredData.length} de {data.length} pedidos encontrados
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="pr-4">
            <h2 className="text-xl font-semibold text-purple-900">
              Lista de Pedidos ({filteredData.length}
              {searchTerm && ` de ${data.length}`})
            </h2>
            <p className="text-sm text-gray-600 mt-1">Gerencie seus pedidos de forma detalhada</p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-600">Total Geral</p>
            <p className="text-2xl font-bold text-purple-600 whitespace-nowrap">
              {showAllSensitiveInfo
                ? `R$ ${filteredData.reduce((total, order) => total + order.sale_price * order.amount, 0).toFixed(2)}`
                : "R$ ••••••••"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500">Total de Itens</p>
            <p className="font-semibold text-gray-900">
              {filteredData.reduce((total, order) => total + order.amount, 0)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Custo Total</p>
            <p className="font-semibold text-red-600">
              {showAllSensitiveInfo
                ? `R$ ${filteredData.reduce((total, order) => total + order.cost_price * order.amount, 0).toFixed(2)}`
                : "R$ ••••••"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Receita Total</p>
            <p className="font-semibold text-green-600">
              {showAllSensitiveInfo
                ? `R$ ${filteredData.reduce((total, order) => total + order.sale_price * order.amount, 0).toFixed(2)}`
                : "R$ ••••••"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Lucro Total</p>
            <p className="font-semibold text-blue-600">
              {showAllSensitiveInfo
                ? `R$ ${filteredData.reduce((total, order) => total + (order.sale_price - order.cost_price) * order.amount, 0).toFixed(2)}`
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

      {filteredData.length === 0 && searchTerm ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum pedido encontrado para "{searchTerm}"</p>
          <Button variant="outline" onClick={() => setSearchTerm("")} className="mt-2">
            Limpar filtro
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredData.map((order, index) => (
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
      )}

      {filteredData.length > 0 && (
        <div className="bg-white rounded-lg border border-purple-200 p-4 mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {filteredData.length} {filteredData.length === 1 ? "pedido" : "pedidos"}
              {searchTerm
                ? ` encontrado${filteredData.length === 1 ? "" : "s"}`
                : ` carregado${filteredData.length === 1 ? "" : "s"}`}
              {searchTerm && ` de ${data.length} total`}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
