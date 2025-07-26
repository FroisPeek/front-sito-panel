import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { modules } from "@/constants/module"
import { LogOut, Menu } from "lucide-react"
import { useRouter } from "next/navigation"
import { useHomeModel } from "./home.model"

type HomeViewProps = ReturnType<typeof useHomeModel>

export const HomeView = (props: HomeViewProps) => {
    const { currentDate } = props
    const router = useRouter()

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black">
            <header className="bg-slate-800/90 backdrop-blur-sm p-4 flex items-center justify-between">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <Menu className="w-6 h-6" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <LogOut className="w-6 h-6" />
                </Button>
            </header>

            <main className="bg-white rounded-t-3xl mt-2 min-h-[calc(100vh-80px)] p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Bem-vindo, Usuário!</h1>
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
                        {modules.map((module) => {
                            const IconComponent = module.icon
                            return (
                                <Card key={module.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                    <CardContent className="p-2 text-center">
                                        <div
                                            className={`w-16 h-16 ${module.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                                        >
                                            <IconComponent className="w-8 h-8 text-purple-600" />
                                        </div>

                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>

                                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{module.description}</p>

                                        <Button
                                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium"
                                            onClick={() => router.push(module.route)}
                                        >
                                            Acessar
                                        </Button>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>

                {/* Footer */}
                <footer className="text-center py-6 border-t border-gray-200 mt-8">
                    <p className="text-gray-500 text-sm">©2025 Todos os direitos reservados.</p>
                </footer>
            </main>
        </div>
    )
}