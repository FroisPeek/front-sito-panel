'use client';

import { useOrdersModel } from "./orders.model";
import { OrdersView } from "./orders.view";

export default function Page() {
    const methods = useOrdersModel()

    return <OrdersView {...methods} />
}