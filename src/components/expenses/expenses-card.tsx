"use client"

import { Expenses } from "@/app/home/expenses/expenses.interface"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatCurrency, formatDate } from "@/functions/format-functions"
import { Calendar, Clock, DollarSign, Edit, FileText } from "lucide-react"

interface ExpenseCardProps {
    expense: Expenses
    onEdit: (expense: Expenses) => void
    showSensitiveData: boolean
}

export const ExpenseCard = ({ expense, onEdit, showSensitiveData }: ExpenseCardProps) => {
    const getStatus = () => {
        if (expense.payment_date) return "paid"
        if (expense.processed_at) return "processed"
        return "pending"
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "paid":
                return "bg-green-100 text-green-800 border-green-200"
            case "processed":
                return "bg-blue-100 text-blue-800 border-blue-200"
            case "pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const status = getStatus()

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <h3 className="font-semibold text-gray-900 text-sm">{expense.description}</h3>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{formatDate(expense.expense_date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>Criado: {formatDate(expense.performed_at)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(status)}>
                            {status === "paid" ? "Pago" : status === "processed" ? "Processado" : "Pendente"}
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="font-bold text-lg text-green-600">
                                {showSensitiveData ? formatCurrency(expense.price) : "••••••"}
                            </span>
                        </div>
                        <div className="text-xs text-gray-500">
                            <span className="font-medium">ID:</span> #{expense.id}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => onEdit(expense)} className="h-8 w-8 p-0">
                            <Edit className="h-3 w-3" />
                        </Button>
                    </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                        {expense.processed_at && (
                            <div>
                                <span className="font-medium">Processado:</span> {formatDate(expense.processed_at)}
                            </div>
                        )}
                        {expense.payment_date && (
                            <div>
                                <span className="font-medium">Data Pagamento:</span> {formatDate(expense.payment_date)}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
