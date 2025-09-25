"use client"

import type React from "react"

import type { ExpenseFormData, Expenses } from "@/app/home/expenses/expenses.interface"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dispatch, SetStateAction, useEffect } from "react"

interface ExpenseFormModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: ExpenseFormData) => void
    expense?: Expenses | null
    formData: ExpenseFormData
    setFormData: Dispatch<SetStateAction<ExpenseFormData>>
    handleSaveExpense: () => void
    handleUpdateExpense: (expense: Expenses) => Promise<void>
}

export const ExpenseFormModal = ({ isOpen, onClose, onSubmit, expense, formData, setFormData, handleSaveExpense, handleUpdateExpense }: ExpenseFormModalProps) => {
    useEffect(() => {
        if (expense) {
            setFormData({
                description: expense.description,
                price: expense.price,
                expense_date: expense.expense_date,
                payment_date: expense.payment_date || new Date().toISOString().split("T")[0],
                performed_at: expense.performed_at,
                processed_at: expense.processed_at || new Date().toISOString().split("T")[0],
            })
        } else {
            setFormData({
                description: "",
                price: 0,
                expense_date: new Date().toISOString().split("T")[0],
                payment_date: new Date().toISOString().split("T")[0],
                processed_at: new Date().toISOString().split("T")[0],
                performed_at: new Date().toISOString().split("T")[0],
            })
        }
    }, [expense, isOpen])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (expense) {
            handleUpdateExpense({ ...expense, ...formData })
            onClose()
        } else {
            handleSaveExpense()
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{expense ? "Editar Despesa" : "Nova Despesa"}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Input
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Ex: Almoço no restaurante"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Valor</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) || 0 })}
                                placeholder="0,00"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="expense_date">Data da Despesa</Label>
                            <Input
                                id="expense_date"
                                type="date"
                                value={formData.expense_date}
                                onChange={(e) => setFormData({ ...formData, expense_date: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="performed_at">Data de Realização</Label>
                            <Input
                                id="performed_at"
                                type="date"
                                value={formData.performed_at}
                                onChange={(e) => setFormData({ ...formData, performed_at: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="processed_at">Data de Processamento</Label>
                            <Input
                                id="processed_at"
                                type="date"
                                value={formData.processed_at}
                                onChange={(e) => setFormData({ ...formData, processed_at: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="payment_date">Data de Pagamento</Label>
                        <Input
                            id="payment_date"
                            type="date"
                            value={formData.payment_date}
                            onChange={(e) => setFormData({ ...formData, payment_date: e.target.value })}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit">{expense ? "Atualizar" : "Cadastrar"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
