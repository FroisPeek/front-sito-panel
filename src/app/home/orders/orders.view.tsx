"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { triggerStyle } from "@/constants/style/trigger.style"
import { Package, ShoppingCart } from "lucide-react"
import { SalesForm } from "../../../components/order/sales.form"
import { ShoppingView } from "../../../components/order/shopping.view"
import type { useOrdersModel } from "./orders.model"

type OrdersViewProps = ReturnType<typeof useOrdersModel>

export const OrdersView = (props: OrdersViewProps) => {
  const {
    onSubmit,
    form,
    addToList,
    valuesForm,
    isPending,
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
  } = props

  return (
    <div>
      <Tabs defaultValue="shopping" className="w-full">
        <TabsList className="grid w-full grid-cols-2 p-1 h-12 bg-white">
          <TabsTrigger value="shopping" className={triggerStyle}>
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Compras</span>
            <span className="sm:hidden">Compras</span>
          </TabsTrigger>
          <TabsTrigger value="sales" className={triggerStyle}>
            <Package className="w-4 h-4" />
            <span className="hidden sm:inline">Vendas</span>
            <span className="sm:hidden">Vendas</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shopping" className="mt-0 p-4 sm:p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Histórico de Compras</h2>
            <p className="text-gray-600 text-sm">Visualize e gerencie suas compras realizadas</p>
          </div>
          <ShoppingView
            data={data}
            isLoading={isLoading}
            confirmedOrder={confirmedOrder}
            setConfirmedOrder={setConfirmedOrder}
            onUpdate={onUpdate}
            showAllSensitiveInfo={showAllSensitiveInfo}
            setShowAllSensitiveInfo={setShowAllSensitiveInfo}
            toggleFieldVisibility={toggleFieldVisibility}
            isFieldVisible={isFieldVisible}
            shouldShowField={shouldShowField}
          />
        </TabsContent>

        <TabsContent value="sales" className="mt-0 p-4 sm:p-6">
          <SalesForm
            form={form}
            onSubmit={onSubmit}
            addToList={addToList}
            ordersList={valuesForm}
            isPending={isPending}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
