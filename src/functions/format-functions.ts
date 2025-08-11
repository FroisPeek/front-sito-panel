import { Status_Stringt } from "@/constants/order-status";

export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
}

export const getStatusColor = (status: string): string => {
    const statusColors: Record<Status_Stringt, string> = {
        [Status_Stringt.PendingPurchase]: "bg-yellow-100 text-yellow-800 border-yellow-200",
        [Status_Stringt.SaleToRecive]: "bg-blue-100 text-blue-800 border-blue-200",
        [Status_Stringt.ReadyForDelivery]: "bg-purple-100 text-purple-800 border-purple-200",
        [Status_Stringt.ConfirmSale]: "bg-green-100 text-green-800 border-green-200",
        [Status_Stringt.PaidPurchase]: "bg-green-200 text-green-900 border-green-300",
    };

    const matchedKey = Object.values(Status_Stringt).find(v => v === status);
    return matchedKey ? statusColors[matchedKey] : "bg-gray-100 text-gray-800 border-gray-200";
};