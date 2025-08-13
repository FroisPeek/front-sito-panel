import { Order } from "@/app/home/orders/order.interface";
import { Status_String } from "@/constants/order-status";

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
    const statusColors: Record<Status_String, string> = {
        [Status_String.PendingPurchase]: "bg-yellow-100 text-yellow-800 border-yellow-200",
        [Status_String.SaleToRecive]: "bg-blue-100 text-blue-800 border-blue-200",
        [Status_String.ReadyForDelivery]: "bg-purple-100 text-purple-800 border-purple-200",
        [Status_String.ConfirmSale]: "bg-green-100 text-green-800 border-green-200",
        [Status_String.PaidPurchase]: "bg-green-200 text-green-900 border-green-300",
    };

    const matchedKey = Object.values(Status_String).find(v => v === status);
    return matchedKey ? statusColors[matchedKey] : "bg-gray-100 text-gray-800 border-gray-200";
};

export const returnDateInStatus = (order: Order) => {
    if (!order) return null;

    const statusDateMap: Record<Status_String, keyof Order> = {
        [Status_String.ConfirmSale]: "date_order",
        [Status_String.PaidPurchase]: "date_purchase_order",
        [Status_String.PendingPurchase]: "date_creation_order",
        [Status_String.ReadyForDelivery]: "date_creation_order",
        [Status_String.SaleToRecive]: "date_creation_order",
    };

    const status = order.status as Status_String;
    const dateFieldKey = statusDateMap[status];
    if (!dateFieldKey || !order[dateFieldKey]) return null;

    const date = new Date(order[dateFieldKey] as string);
    return `${date.toLocaleDateString()} às ${date.toLocaleTimeString()}`;
};