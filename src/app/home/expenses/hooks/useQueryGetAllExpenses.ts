import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

async function getAllExpenses() {
    const response = await api.get("/expenses");

    if (!response.data.flag) {
        toast.error("Erro ao buscars dispesas", {
            description: response.data.message,
            duration: 5000,
            closeButton: true
        })
        return []
    }

    return response.data.data
}

export default function useQueryGetAllExpenses() {
    return useQuery({
        queryKey: ["getAllExpenses"],
        queryFn: getAllExpenses
    })
}