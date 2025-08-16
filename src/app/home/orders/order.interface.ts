import z from "zod";

export const orderSchema = z.object({
    client: z.string().min(2).max(50),
    brand: z.string().min(1),
    code: z.string().min(1),
    description: z.string(),
    size: z.string().min(1),
    amount: z.number().min(1),
    cost_price: z.number().min(0.1),
    sale_price: z.number().min(0.1),
    total_price: z.number().min(0.1),
})

export type Order = {
    id: number;
    code: number;
    description?: string;
    size: string;
    amount: number;
    cost_price: number;
    sale_price: number;
    total_price: number;
    status: string;
    date_creation_order: string;
    tenant_id: number;
    brand: string;
    date_order?: string | undefined;
    date_purchase_order?: string | undefined;
    status_conference: string | undefined;
    client_infos: {
        client_id: number;
        client_name: string;
    }
};

export type CreateOrderSchema = {
    client: string;
    code: string;
    description: string;
    size: string;
    amount: number;
    cost_price: number;
    sale_price: number;
    brand: string;
};