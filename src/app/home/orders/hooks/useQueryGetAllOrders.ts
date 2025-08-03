import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

async function getAllOrders() {
    const response = await api.get("/orders");

    if (!response.data.flag) {
        toast.error("Erro ao buscars pedidos", {
            description: response.data.message,
            duration: 5000,
            closeButton: true
        })
        return []
    }

    return response.data.data
}

export default function useQueryGetAllOrders() {
    return useQuery({
        queryKey: ["getAllOrders"],
        queryFn: getAllOrders
    })
}