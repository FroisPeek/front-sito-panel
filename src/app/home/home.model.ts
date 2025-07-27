import api from "@/services/api";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export const useHomeModel = () => {
    const router = useRouter()

    const currentDate = new Date().toLocaleDateString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    const exitFunction = async (e: any) => {
        e.preventDefault();
        await api.post("/user/logout")

        deleteCookie("UN");
        deleteCookie("UID");
        deleteCookie("accessToken");
        router.push("/");
    }

    return {
        currentDate,
        exitFunction,
        router
    }
}