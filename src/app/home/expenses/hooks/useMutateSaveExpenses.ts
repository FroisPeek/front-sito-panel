import api from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ExpenseFormData } from "../expenses.interface";

async function CreateExpense(data: ExpenseFormData) {
    const response = await api.post("/expenses", data);

    if (!response.data.flag) {
        toast.error("Erro ao salvar pedidos no banco")
    }

    return response.data.data
}

export default function useMutationCreateExpense() {
    return useMutation({
        mutationFn: (data: ExpenseFormData) => CreateExpense(data),
        mutationKey: ["CreateExpense"],
        onSuccess: () => {
            toast.success("Sucesso a cadastrar pedidos")
        }
    })
}