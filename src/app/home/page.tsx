"use client"

import { useHomeModel } from "./home.model"
import { HomeView } from "./home.view"

export default function Page() {
    const methods = useHomeModel()

    return <HomeView {...methods} />
}
