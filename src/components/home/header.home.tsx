import { LogOut } from "lucide-react"
import NavBar from "../global/navbar"
import { Button } from "../ui/button"

interface iProps {
    exitFunction: any
}

export const HeaderHome = ({ exitFunction }: iProps) => {
    return (
        <header className="bg-purple-900 backdrop-blur-sm p-4 flex items-center justify-between w-full">
            <NavBar
                exitFunction={exitFunction}
            />

            <Button
                onClick={exitFunction}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
            >
                <LogOut className="w-6 h-6" />
            </Button>
        </header>
    )
}