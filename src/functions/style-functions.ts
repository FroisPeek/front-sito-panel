import { Status_String } from "@/constants/order-status";

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

export const getCardStyles = (isPaidPurchase: boolean, isSelected: boolean) => {
    if (isPaidPurchase) {
        if (isSelected) {
            return "bg-rose-600 text-white border-rose-700 shadow-lg"
        }
        return "bg-rose-50 hover:bg-rose-100 border-rose-200"
    } else {
        if (isSelected) {
            return "bg-purple-600 text-white border-purple-700 shadow-lg"
        }
        return "bg-white hover:bg-gray-50 border-gray-200"
    }
}

export const getIconColor = (isPaidPurchase: boolean, isSelected: boolean) => {
    if (isPaidPurchase) {
        return isSelected ? "text-white" : "text-rose-600"
    }
    return isSelected ? "text-white" : "text-purple-600"
}

export const getLabelColor = (isPaidPurchase: boolean, isSelected: boolean) => {
    if (isPaidPurchase) {
        return isSelected ? "text-white" : "text-rose-600"
    }
    return isSelected ? "text-white" : "text-purple-600"
}

export const getTextColor = (isPaidPurchase: boolean, isSelected: boolean) => {
    return isSelected ? "text-white" : "text-black"
}

export const getSeparatorColor = (isPaidPurchase: boolean, isSelected: boolean) => {
    if (isPaidPurchase) {
        return isSelected ? "bg-white/30" : "bg-rose-200"
    }
    return isSelected ? "bg-white/30" : ""
}