"use client"

import type React from "react"

import { ExpenseFormData, Expenses } from "@/app/home/expenses/expenses.interface"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"

interface ExpenseFormModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: ExpenseFormData) => void
    expense?: Expenses | null
}

export const ExpenseFormModal = ({ isOpen, onClose, onSubmit, expense }: ExpenseFormModalProps) => {
    const [formData, setFormData] = useState<ExpenseFormData>({
        description: "",
        price: 0,
        expense_date: new Date().toISOString().split("T")[0],
    })

    useEffect(() => {
        if (expense) {
            setFormData({
                description: expense.description,
                price: expense.price,
                expense_date: expense.expense_date,
            })
        } else {
            setFormData({
                description: "",
                price: 0,
                expense_date: new Date().toISOString().split("T")[0],
            })
        }
    }, [expense, isOpen])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
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
