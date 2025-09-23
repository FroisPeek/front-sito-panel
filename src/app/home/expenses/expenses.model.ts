import { useMemo, useState } from "react";
import { Expenses } from "./expenses.interface";
import useQueryGetAllExpenses from "./hooks/useQueryGetAllExpenses";

export const useExpensesModel = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [showSensitiveData, setShowSensitiveData] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingExpense, setEditingExpense] = useState<Expenses | null>(null)

    const { data, isLoading } = useQueryGetAllExpenses();

    const filteredData = useMemo(() => {
        if (!searchTerm.trim()) return data

        const searchLower = searchTerm.toLowerCase()
        return data.filter((expense: Expenses) => {
            return (
                expense.description.toLowerCase().includes(searchLower) ||
                expense.price.toString().includes(searchLower) ||
                expense.id.toString().includes(searchLower) ||
                expense.expense_date.includes(searchLower)
            )
        })
    }, [data, searchTerm])

    const totalExpenses = useMemo(() => {
        return filteredData?.reduce((sum: number, expense: Expenses) => sum + expense.price, 0)
    }, [filteredData])

    const handleAddExpense = () => {
        setEditingExpense(null)
        setIsModalOpen(true)
    }

    const handleEditExpense = (expense: Expenses) => {
        setEditingExpense(expense)
        setIsModalOpen(true)
    }


    return {
        data, isLoading,
        searchTerm, setSearchTerm,
        showSensitiveData, setShowSensitiveData,
        isModalOpen, setIsModalOpen,
        editingExpense, setEditingExpense,
        totalExpenses,
        handleAddExpense,
        handleEditExpense,
        filteredData
    }
}