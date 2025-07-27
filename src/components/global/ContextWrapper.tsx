"use client";
import { iLoggedUser } from "@/app/login.interface";
import { getCookie, setCookie } from "cookies-next";
import React, { createContext, useContext, useState } from "react";
import ReactQueryClientProvider from "./ReactQueryClientProvider";

const Context = createContext<any>(null);

export const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
    const [loggedUser, setLoggedUser] = useState<iLoggedUser | null>(null);
    const [actualOs, setActualOs] = useState<number>(0);

    function setCookieLoggedUser(user: iLoggedUser) {
        setLoggedUser(user);
        setCookie("UN", btoa(JSON.stringify(user.name)), {
            expires: new Date(Date.now() + 1000 * 60 * 60),
            sameSite: "strict",
        });
        setCookie("UID", btoa(JSON.stringify(user.id)), {
            expires: new Date(Date.now() + 1000 * 60 * 60),
            sameSite: "strict",
        });
    }

    return (
        <ReactQueryClientProvider>
            <Context.Provider
                value={{
                    loggedUser,
                    setLoggedUser,
                    setCookieLoggedUser,
                    cookie: getCookie("UP"),
                    actualOs,
                    setActualOs
                }}
            >
                {children}
            </Context.Provider>
        </ReactQueryClientProvider>
    );
};

export const useUser = () => {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
