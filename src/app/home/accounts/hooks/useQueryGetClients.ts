import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Clients } from "../accounts.interface";

async function getClients() {
    const response = await api.get(`/general/clients`)

    if (!response.data.flag) {
        toast.error("Erro ao buscars clientes", {
            description: response.data.message,
            duration: 5000,
            closeButton: true
        })
        return []
    }

    const data: Clients[] = response.data.data;
    return data;
}

export default function useQueryGetClients() {
    return useQuery({
        queryKey: ["getClients"],
        queryFn: getClients,
    })
}