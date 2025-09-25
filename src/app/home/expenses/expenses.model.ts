import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ExpenseFormData, Expenses } from "./expenses.interface";
import useMutationUpdateExpense from "./hooks/useMutateEditExpenses";
import useMutationCreateExpense from "./hooks/useMutateSaveExpenses";
import useQueryGetAllExpenses from "./hooks/useQueryGetAllExpenses";

export const useExpensesModel = () => {
    const queryClient = useQueryClient()

    const [searchTerm, setSearchTerm] = useState("")
    const [showSensitiveData, setShowSensitiveData] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingExpense, setEditingExpense] = useState<Expenses | null>(null)
    const [formData, setFormData] = useState<ExpenseFormData>({
        description: "",
        price: 0,
        expense_date: new Date().toISOString().split("T")[0],
        payment_date: new Date().toISOString().split("T")[0],
        processed_at: new Date().toISOString().split("T")[0],
        performed_at: new Date().toISOString().split("T")[0],
    })

    const { data, isLoading } = useQueryGetAllExpenses();
    const { mutateAsync } = useMutationCreateExpense()
    const { mutateAsync: updateAsyn } = useMutationUpdateExpense()

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
        setFormData({
            description: "",
            price: 0,
            expense_date: new Date().toISOString().split("T")[0],
            payment_date: new Date().toISOString().split("T")[0],
            processed_at: new Date().toISOString().split("T")[0],
            performed_at: new Date().toISOString().split("T")[0],
        })
    }

    const handleOpenEditExpenses = (expense: Expenses) => {
        setEditingExpense(expense)
        setIsModalOpen(true)
        setFormData({
            description: expense.description ?? "",
            price: expense.price ?? 0,
            expense_date: expense.expense_date ?? new Date().toISOString().split("T")[0],
            payment_date: expense.payment_date ?? new Date().toISOString().split("T")[0],
            processed_at: expense.processed_at ?? new Date().toISOString().split("T")[0],
            performed_at: expense.performed_at ?? new Date().toISOString().split("T")[0],
        })
    }

    const handleSaveExpense = async () => {
        await mutateAsync(formData)
        queryClient.invalidateQueries({ queryKey: ["getAllExpenses"] })
    }

    const handleEditExpense = async (expense: Expenses) => {
        await updateAsyn(expense)
        queryClient.invalidateQueries({ queryKey: ["getAllExpenses"] })
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
        filteredData,
        formData, setFormData,
        handleSaveExpense,
        handleOpenEditExpenses
    }
}