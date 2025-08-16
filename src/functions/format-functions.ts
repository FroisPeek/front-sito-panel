import { Order } from "@/app/home/orders/order.interface";
import { Status_String } from "@/constants/order-status";

export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

export const formatDate = (dateString: string | undefined) => {
    if (dateString == undefined) return ""
    return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
}

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