import api from "@/services/api";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useHomeModel = () => {
    const router = useRouter()
    const [decodedCookie, setDecodedCookie] = useState<string>("");

    useEffect(() => {
        async function fetchCookie() {
            const cookie = await getCookie("UN");
            setDecodedCookie(cookie ? atob(cookie as string) : "0");
        }
        fetchCookie();
    }, []);

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
        router,
        decodedCookie
    }
}