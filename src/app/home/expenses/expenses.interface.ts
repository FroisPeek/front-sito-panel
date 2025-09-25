export interface Expenses {
    id: number
    expense_date: string
    description: string
    price: number
    performed_at: string
    processed_at?: string | null
    payment_date?: string | null
    tenant_id: number
}

export interface ExpenseFormData {
    description: string
    price: number
    expense_date: string
    performed_at: string
    processed_at: string
    payment_date: string
}
