"use client"

import type { Order } from "@/app/home/orders/order.interface"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Status_String } from "@/constants/order-status"
import { returnDateInStatus } from "@/functions/format-functions"
import { Check, DollarSign, Hash, Package, Ruler, Tag, User, Eye, EyeOff } from "lucide-react"
import type React from "react"
import type { Dispatch, SetStateAction } from "react"
import { ButtonReadyToSend } from "./button-ready-to-send"

interface AccordionOrderCardProps {
  order: Order
  index: number
  handleSelectOrder: Dispatch<SetStateAction<number[]>>
  confirmedOrder: number[]
  onUpdate: (orders: number[], value: number) => void
  showAllSensitiveInfo: boolean
  toggleFieldVisibility: (orderId: number, fieldName: string) => void
  isFieldVisible: (orderId: number, fieldName: string) => boolean
  shouldShowField: (orderId: number, fieldName: string) => boolean
}

export const AccordionOrderCard = ({
  order,
  index,
  handleSelectOrder,
  confirmedOrder,
  onUpdate,
  showAllSensitiveInfo,
  toggleFieldVisibility,
  isFieldVisible,
  shouldShowField,
}: AccordionOrderCardProps) => {
  const profit = order.sale_price - order.cost_price
  const profitMargin = ((profit / order.sale_price) * 100).toFixed(1)
  const totalValue = order.sale_price * order.amount

  const isSelected = confirmedOrder.includes(order.id)

  const handleCheckboxChange = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (isSelected) {
      handleSelectOrder((prev) => prev?.filter((selectedOrder) => selectedOrder !== order.id) ?? [])
    } else {
      handleSelectOrder((prev) => [...(prev ?? []), order.id])
    }
  }

  const renderSensitiveField = (fieldName: string, icon: React.ElementType, label: string, value: string) => {
    const Icon = icon
    const shouldShow = showAllSensitiveInfo || shouldShowField(order.id, fieldName)
    const isIndividuallyVisible = isFieldVisible(order.id, fieldName)

    return (
      <div key={label} className="flex items-center gap-3 min-w-0">
        <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-white" : "text-purple-600"}`} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between mb-1">
            <p
              className={`text-xs font-medium uppercase tracking-wide ${isSelected ? "text-white/70" : "text-gray-500"}`}
            >
              {label}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 w-6 p-0 ${isSelected ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
              onClick={(e) => {
                e.stopPropagation()
                toggleFieldVisibility(order.id, fieldName)
              }}
            >
              {isIndividuallyVisible ? (
                <EyeOff className={`w-3 h-3 ${isSelected ? "text-white/70" : "text-gray-500"}`} />
              ) : (
                <Eye className={`w-3 h-3 ${isSelected ? "text-white/70" : "text-gray-500"}`} />
              )}
            </Button>
          </div>
          <p className={`font-semibold truncate ${isSelected ? "text-white" : "text-black"}`}>
            {shouldShow ? value : "••••••••"}
          </p>
        </div>
      </div>
    )
  }

  const renderSensitiveFinancialData = (label: string, value: number, fieldName: string) => {
    const shouldShow = shouldShowField(order.id, fieldName)
    const isIndividuallyVisible = isFieldVisible(order.id, fieldName)

    return (
      <div
        className={`text-center p-3 sm:p-4 rounded-lg border ${isSelected ? "bg-white/5 border-white/20" : "bg-white border-gray-200"}`}
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <p className={`text-xs font-medium ${isSelected ? "text-white/70" : "text-gray-500"}`}>{label}</p>
          <Button
            variant="ghost"
            size="sm"
            className={`h-4 w-4 p-0 ${isSelected ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
            onClick={(e) => {
              e.stopPropagation()
              toggleFieldVisibility(order.id, fieldName)
            }}
          >
            {isIndividuallyVisible ? (
              <EyeOff className={`w-3 h-3 ${isSelected ? "text-white/70" : "text-gray-500"}`} />
            ) : (
              <Eye className={`w-3 h-3 ${isSelected ? "text-white/70" : "text-gray-500"}`} />
            )}
          </Button>
        </div>
        <p className={`font-bold text-sm sm:text-base ${isSelected ? "text-white" : "text-black"}`}>
          {shouldShow ? `R$ ${value.toFixed(2)}` : "R$ ••••"}
        </p>
      </div>
    )
  }

  return (
    <Card
      className={`border-2 transition-colors duration-200 ${
        isSelected ? "bg-purple-600 border-purple-600 text-white" : "bg-white border-gray-200 hover:border-purple-600"
      }`}
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={`order-${index}`} className="border-none">
          <AccordionTrigger className="hover:no-underline p-4 sm:p-6">
            <div className="flex items-center justify-between w-full gap-2 sm:gap-4 min-w-0">
              <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                {order.status === Status_String.PendingPurchase && (
                  <div
                    className="flex items-center cursor-pointer p-1 rounded-lg hover:bg-black/10 flex-shrink-0"
                    onClick={handleCheckboxChange}
                  >
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center transition-colors ${
                        isSelected ? "bg-white border-white" : "bg-transparent border-gray-300 hover:border-purple-600"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />}
                    </div>
                  </div>
                )}

                <div className="flex flex-col text-left gap-1 min-w-0 flex-1">
                  <h3 className={`text-sm sm:text-base font-bold truncate ${isSelected ? "text-white" : "text-black"}`}>
                    Pedido {order.id}
                  </h3>
                  <p className={`text-xs sm:text-sm truncate ${isSelected ? "text-white/80" : "text-gray-600"}`}>
                    {order.client_infos.client_name}
                  </p>
                  <Badge variant={isSelected ? "secondary" : "outline"} className="w-fit text-xs">
                    {order.status}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 flex-shrink-0">
                <div className="text-right">
                  <p
                    className={`text-base sm:text-lg font-bold whitespace-nowrap ${isSelected ? "text-white" : "text-black"}`}
                  >
                    {shouldShowField(order.id, "totalValue") ? `R$ ${totalValue.toFixed(2)}` : "R$ ••••••"}
                  </p>
                  <p className={`text-xs ${isSelected ? "text-white/80" : "text-gray-600"}`}>
                    {order.amount} {order.amount === 1 ? "item" : "itens"}
                  </p>
                </div>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-4 sm:px-6 pb-1 sm:pb-1">
            <div className="space-y-4 sm:space-y-6 pt-4">
              <div className="block sm:hidden">
                <div className={`text-s, ${isSelected ? "text-white/80" : "text-black"}`}>
                  Última atulização: {returnDateInStatus(order)}
                </div>
              </div>

              <div
                className={`rounded-lg p-4 sm:p-5 border ${
                  isSelected ? "bg-white/10 border-white/20" : "bg-gray-50 border-gray-200"
                }`}
              >
                <h4
                  className={`text-sm font-bold mb-4 flex items-center gap-2 ${
                    isSelected ? "text-white" : "text-black"
                  }`}
                >
                  <Package className="w-4 h-4" />
                  Detalhes do Produto
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
                  {renderSensitiveField("clientName", User, "Cliente", order.client_infos.client_name)}
                  <div className="flex items-center gap-3 min-w-0">
                    <Tag className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-white" : "text-purple-600"}`} />
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-xs font-medium uppercase tracking-wide mb-1 ${isSelected ? "text-white/70" : "text-gray-500"}`}
                      >
                        Marca
                      </p>
                      <p className={`font-semibold truncate ${isSelected ? "text-white" : "text-black"}`}>
                        {order.brand}
                      </p>
                    </div>
                  </div>
                  {renderSensitiveField("code", Hash, "Código", order.code.toString())}
                  <div className="flex items-center gap-3 min-w-0">
                    <Ruler className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-white" : "text-purple-600"}`} />
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-xs font-medium uppercase tracking-wide mb-1 ${isSelected ? "text-white/70" : "text-gray-500"}`}
                      >
                        Tamanho
                      </p>
                      <p className={`font-semibold truncate ${isSelected ? "text-white" : "text-black"}`}>
                        {order.size}
                      </p>
                    </div>
                  </div>

                  {order.description && (
                    <div
                      className={`flex items-start gap-3 min-w-0 sm:col-span-2 pt-4 border-t ${isSelected ? "border-white/20" : "border-gray-200"}`}
                    >
                      <Package
                        className={`w-4 h-4 mt-1 flex-shrink-0 ${isSelected ? "text-white" : "text-purple-600"}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-xs font-medium uppercase tracking-wide mb-1 ${isSelected ? "text-white/70" : "text-gray-500"}`}
                        >
                          Descrição
                        </p>
                        <p
                          className={`font-medium leading-relaxed break-words ${isSelected ? "text-white" : "text-black"}`}
                        >
                          {order.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`rounded-lg p-4 sm:p-5 border ${
                  isSelected ? "bg-white/10 border-white/20" : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className={`w-4 h-4 ${isSelected ? "text-white" : "text-purple-600"}`} />
                  <h4 className={`text-sm font-bold ${isSelected ? "text-white" : "text-black"}`}>
                    Análise Financeira
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  {renderSensitiveFinancialData("Custo Unit.", order.cost_price, "costPrice")}
                  {renderSensitiveFinancialData("Venda Unit.", order.sale_price, "salePrice")}
                </div>

                <div
                  className={`text-center p-3 sm:p-4 rounded-lg mb-4 ${
                    isSelected ? "bg-purple-600 text-white" : "bg-purple-600 text-white"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <p className="text-xs font-medium text-white/80">Total do Pedido</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-white/10"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFieldVisibility(order.id, "totalValue")
                      }}
                    >
                      {isFieldVisible(order.id, "totalValue") ? (
                        <EyeOff className="w-3 h-3 text-white/70" />
                      ) : (
                        <Eye className="w-3 h-3 text-white/70" />
                      )}
                    </Button>
                  </div>
                  <p className="font-bold text-lg sm:text-xl text-white">
                    {shouldShowField(order.id, "totalValue") ? `R$ ${totalValue.toFixed(2)}` : "R$ ••••••"}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-2 text-xs">
                    <span>
                      Lucro:{" "}
                      {shouldShowField(order.id, "totalValue") ? `R$ ${(profit * order.amount).toFixed(2)}` : "R$ ••••"}
                    </span>
                    <span>Margem: {profitMargin}%</span>
                  </div>
                </div>
              </div>
              {order.status === Status_String.PaidPurchase && <ButtonReadyToSend order={order} onUpdate={onUpdate} />}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}
