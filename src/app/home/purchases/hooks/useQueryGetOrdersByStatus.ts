import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

async function getOrdersByStatus(status: number) {
    const response = await api.get(`/orders/${status}`)

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

export default function useQueryGetOrdersByStatus(status: number) {
    return useQuery({
        queryKey: ["getOrdersByStatus"],
        queryFn: () => getOrdersByStatus(status),
        enabled: !!status
    })
}