import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"

interface iProps {
    id: number,
    title: string,
    description: string,
    icon: any,
    color: string,
    route: string,
}

export const CardHome = ({ color, description, icon, id, route, title }: iProps) => {
    const IconComponent = icon
    const router = useRouter()

    return (
        <Card key={id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-2 text-center">
                <div
                    className={`w-16 h-16 ${color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                    <IconComponent className="w-8 h-8 text-purple-600" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>

                <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium"
                    onClick={() => router.push(route)}
                >
                    Acessar
                </Button>
            </CardContent>
        </Card>
    )
}