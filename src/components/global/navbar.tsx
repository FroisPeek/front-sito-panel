"use client";

import { modules } from "@/constants/module";
import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../ui/drawer";

interface iProps {
    exitFunction: () => void;
}

const NavBar = ({ exitFunction }: iProps) => {
    const router = useRouter();
    const [abrirDrawer, setabrirDrawer] = useState(false);

    const toggleDrawer = () => {
        setabrirDrawer(!abrirDrawer);
    };

    const handleNavigation = (path: string) => {
        router.push(path);
        toggleDrawer();
    };

    return (
        <div className="flex items-start justify-start h-full">
            <Drawer direction="left" open={abrirDrawer} onClose={toggleDrawer}>
                <DrawerContent className="overflow-x-hidden overflow-y-auto bg-white max-w-xs w-full">
                    <DrawerHeader>
                        <Button variant="ghost" className="w-fit h-fit" onClick={toggleDrawer}>
                            <X />
                        </Button>
                        <DrawerTitle className="max-sm:text-center sm:pl-6 text-lg" justify-center>Menu</DrawerTitle>
                    </DrawerHeader>

                    <div className="px-4 py-2 space-y-2">
                        {modules.map((module) => {
                            const Icon = module.icon;
                            return (
                                <button
                                    key={module.id}
                                    onClick={() => handleNavigation(module.route)}
                                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition-all text-left"
                                >
                                    <div className={`p-2 rounded-md ${module.color}`}>
                                        <Icon className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{module.title}</span>
                                        <span className="text-xs text-slate-500">
                                            {module.description}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <DrawerFooter className="mt-auto px-4 py-4 border-t space-y-3">
                        <Link
                            href="/"
                            onClick={exitFunction}
                            className="flex items-center gap-3 text-sm text-slate-600 hover:text-red-600 transition"
                        >
                            <LogOut className="w-5 h-5" />
                            Sair
                        </Link>
                        <div className="text-center text-xs text-slate-400 italic">
                            Versão: {process.env.version}
                        </div>
                    </DrawerFooter>
                </DrawerContent>

                <DrawerTrigger asChild className="md:h-full">
                    <div className="md:h-full md:w-full max-md:absolute max-md:top-4 max-md:left-2 max-md:rounded-lg md:p-4">
                        <Button
                            onClick={toggleDrawer}
                            variant="ghost"
                            className="hover:bg-white/20 rounded-md p-2"
                        >
                            <Menu className="text-white size-5" />
                        </Button>
                    </div>
                </DrawerTrigger>
            </Drawer>
        </div>
    );
};

export default NavBar;
