import api from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export interface UpdatePaidPriceDto {
    order_id: number;
    paid_price: number;
}

async function updatePaidPrice(dtos: UpdatePaidPriceDto[]) {
    const response = await api.patch("/orders/update-paid-price", dtos);

    if (!response.data.flag) {
        toast.error(response.data.message || "Erro ao atualizar preço pago");
        throw new Error(response.data.message);
    }

    return response.data.data;
}
export default function useMutateUpdatePaidPrice() {
    return useMutation({
        mutationFn: (dtos: UpdatePaidPriceDto[]) => updatePaidPrice(dtos),
        mutationKey: ["updatePaidPrice"],
        onError: (error: any) => {
            toast.error(error.message || "Erro inesperado");
        },
    });
}
