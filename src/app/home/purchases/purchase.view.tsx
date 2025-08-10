import { usePurchaseModel } from "./purchase.model"

type PurchasesViewProps = ReturnType<typeof usePurchaseModel>

export const PurchasesView = (props: PurchasesViewProps) => {
    const { data } = props

    if (data.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pedido encontrado</h3>
                <p className="text-gray-500">Adicione alguns pedidos para começar a visualizá-los aqui.</p>
            </div>
        )
    }

    return (
        <div>test4e</div>
    )
}