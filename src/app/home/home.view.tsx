import { CardHome } from "@/components/home/card-home"
import { HeaderHome } from "@/components/home/header.home"
import { Input } from "@/components/ui/input"
import { modules } from "@/constants/module"
import { useHomeModel } from "./home.model"

type HomeViewProps = ReturnType<typeof useHomeModel>

export const HomeView = (props: HomeViewProps) => {
    const { currentDate, exitFunction, router, decodedCookie } = props

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black">
            <HeaderHome
                exitFunction={exitFunction}
            />

            <main className="bg-white rounded-t-3xl mt-2 min-h-[calc(100vh-80px)] p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Bem-vindo, {decodedCookie ? JSON.parse(decodedCookie) : "carregando"}!</h1>
                        <p className="text-gray-600 text-sm sm:text-base">Explore seus recursos abaixo.</p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <p className="text-gray-500 text-sm capitalize">{currentDate}</p>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">Explore seus Módulos</h2>
                        <div className="relative w-full sm:w-64">
                            <Input
                                type="text"
                                placeholder="Buscar módulos..."
                                className="pl-4 pr-4 h-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                        {modules.map((module, idx) => {
                            return (
                                <CardHome
                                    key={idx}
                                    color={module.color}
                                    description={module.description}
                                    icon={module.icon}
                                    id={module.id}
                                    route={module.route}
                                    title={module.title}
                                />
                            )
                        })}
                    </div>
                </div>

                <footer className="text-center py-6 border-t border-gray-200 mt-8">
                    <p className="text-gray-500 text-sm">©2025 Todos os direitos reservados.</p>
                </footer>
            </main>
        </div>
    )
}