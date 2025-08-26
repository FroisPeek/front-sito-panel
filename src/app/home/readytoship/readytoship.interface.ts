import z from "zod";

export const formSchema = z.object({
    client: z.string(),
    sale_price: z.number().min(0.1),
})