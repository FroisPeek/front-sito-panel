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