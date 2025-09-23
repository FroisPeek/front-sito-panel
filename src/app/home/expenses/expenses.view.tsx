"use client"

import { ExpenseCard } from "@/components/expenses/expenses-card"
import { ExpenseFormModal } from "@/components/expenses/expenses-form-modal"
import { IsLoadingCard } from "@/components/global/isloading-card"
import { NotFoundOrder } from "@/components/global/not-found-order"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/functions/format-functions"
import { DollarSign, Eye, EyeOff, Plus, Search } from "lucide-react"
import type { Expenses } from "./expenses.interface"
import { useExpensesModel } from "./expenses.model"

type ExpensesViewProps = ReturnType<typeof useExpensesModel>

export const ExpensesView = (props: ExpensesViewProps) => {
    const { data, isLoading, editingExpense, handleAddExpense, handleEditExpense, isModalOpen, searchTerm, setEditingExpense, setIsModalOpen, setSearchTerm, setShowSensitiveData, showSensitiveData, totalExpenses, filteredData } = props

    if (isLoading) return <IsLoadingCard />

    if (data.length === 0) return <NotFoundOrder />

    return (
        <div className="flex flex-col gap-4">
            <div className="px-2 mb-1 bg-white rounded py-2 border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Visualize todas suas despesas</h2>
                        <p className="text-gray-600 text-sm">Esse é o local onde vamos cadastrar uma nova despesa</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowSensitiveData(!showSensitiveData)}
                            className="flex items-center gap-2"
                        >
                            {showSensitiveData ? (
                                <>
                                    <EyeOff className="h-4 w-4" />
                                    Ocultar valores
                                </>
                            ) : (
                                <>
                                    <Eye className="h-4 w-4" />
                                    Mostrar valores
                                </>
                            )}
                        </Button>

                        <Button onClick={handleAddExpense} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Nova Despesa
                        </Button>
                    </div>
                </div>

                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Pesquisar por descrição, valor, ID, data..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                    />
                </div>

                {searchTerm && (
                    <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                        <span>
                            {filteredData.length} de {data.length} despesas encontradas
                        </span>
                        {filteredData.length === 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSearchTerm("")}
                                className="text-blue-600 hover:text-blue-700"
                            >
                                Limpar filtro
                            </Button>
                        )}
                    </div>
                )}

                {data.length > 0 && (
                    <div className="flex items-center justify-between text-sm mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600">Total de {filteredData.length} despesas</span>
                            <div className="flex items-center gap-1 text-red-600 font-semibold">
                                <DollarSign className="h-4 w-4" />
                                <span>Total: {showSensitiveData ? formatCurrency(totalExpenses) : "••••••"}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {data.length === 0 ? (
                <NotFoundOrder />
            ) : filteredData.length === 0 && searchTerm ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 mb-2">Nenhuma despesa encontrada para "{searchTerm}"</p>
                    <Button variant="outline" onClick={() => setSearchTerm("")} className="text-blue-600 hover:text-blue-700">
                        Limpar filtro
                    </Button>
                </div>
            ) : (
                filteredData.map((expense: Expenses) => (
                    <ExpenseCard
                        key={expense.id}
                        expense={expense}
                        onEdit={handleEditExpense}
                        showSensitiveData={showSensitiveData}
                    />
                ))
            )}

            <ExpenseFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddExpense}
                expense={editingExpense}
            />
        </div>
    )
}
