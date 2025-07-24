import { CardLogin } from "@/components/login/card-login"
import { Package, TrendingUp, Truck } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLoginModel } from "./login.model"

type LoginViewProps = ReturnType<typeof useLoginModel>

export const LoginView = (props: LoginViewProps) => {
    const { form, onSubmit } = props
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black flex items-center justify-center p-4">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
                <div className="hidden lg:flex flex-col justify-center space-y-8 text-white px-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                                <Package className="w-8 h-8 text-purple-900" />
                            </div>
                            <h1 className="text-4xl font-bold">SitoPanel</h1>
                        </div>
                        <p className="text-xl text-purple-200">Sistema completo de gerenciamento de dropshipping</p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-purple-700 rounded-lg flex items-center justify-center">
                                <Truck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Gestão de Pedidos</h3>
                                <p className="text-purple-200 text-sm">Controle total dos seus pedidos e entregas</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-purple-700 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Analytics Avançado</h3>
                                <p className="text-purple-200 text-sm">Relatórios detalhados e métricas em tempo real</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-purple-700 rounded-lg flex items-center justify-center">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Gestão de Produtos</h3>
                                <p className="text-purple-200 text-sm">Organize seu catálogo de forma eficiente</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full max-w-md mx-auto">
                    <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                            <Package className="w-8 h-8 text-purple-900" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">SitoPanel</h1>
                    </div>

                    <CardLogin
                        form={form}
                        onSubmit={onSubmit}
                        router={router}
                    />

                    <div className="mt-8 text-center text-sm text-white/70">© {new Date().getFullYear()} SitoPanel. Todos os direitos reservados.</div>
                </div>
            </div>
        </div>
    )
}