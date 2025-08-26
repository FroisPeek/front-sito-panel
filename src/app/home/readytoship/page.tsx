'use client';

import { useReadyToShipModel } from "./readytoship.model";
import { ReadyToShipView } from "./readytoship.view";

export default function Page() {
    const methods = useReadyToShipModel()

    return <ReadyToShipView {...methods} />
}