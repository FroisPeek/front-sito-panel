'use client';

import { useAccountsModel } from "./accounts.model";
import { AccountsView } from "./accounts.view";

export default function Page() {
    const methods = useAccountsModel()

    return <AccountsView {...methods} />
}