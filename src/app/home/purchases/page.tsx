'use client';

import { usePurchaseModel } from "./purchase.model";
import { PurchasesView } from "./purchase.view";

export default function Page() {
    const methods = usePurchaseModel()

    return <PurchasesView {...methods} />
}