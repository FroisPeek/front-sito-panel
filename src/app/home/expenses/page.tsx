'use client';

import { useExpensesModel } from "./expenses.model";
import { ExpensesView } from "./expenses.view";

export default function Page() {
    const methods = useExpensesModel()

    return <ExpensesView {...methods} />
}