import api from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Expenses } from "../expenses.interface";

async function UpdateExpense(data: Expenses) {
    const response = await api.patch("/expenses", data);

    if (!response.data.flag) {
        toast.error("Erro ao salvar pedidos no banco")
    }

    return response.data.data
}

export default function useMutationUpdateExpense() {
    return useMutation({
        mutationFn: (data: Expenses) => UpdateExpense(data),
        mutationKey: ["UpdateExpense"],
        onSuccess: () => {
            toast.success("Sucesso a cadastrar pedidos")
        }
    })
}