"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { FileIcon, StarIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {

    const pathname = usePathname();
    return (
        <div className="w-full max-w-xs flex flex-col gap-4 md:w-40" >
            <Link href="/dashboard/files" >
                <Button variant={"link"}
                    className={clsx("flex gap-2 cursor-pointer ", {
                        'text-blue-500': pathname.includes("/dashboard/files")
                    })} >
                    <FileIcon />
                    All  Files
                </Button>
            </Link>

            <Link href="/dashboard/favorites" >
                <Button variant={"link"}
                    className={clsx("flex gap-2 cursor-pointer ", {
                        'text-blue-500': pathname.includes("/dashboard/favorites")
                    })} >
                    <StarIcon />
                    Favourites 
                </Button>
            </Link>  

             <Link href="/dashboard/trash" >
                <Button variant={"link"}
                    className={clsx("flex gap-2 cursor-pointer ", {
                        'text-blue-500': pathname.includes("/dashboard/trash")
                    })} >
                    <TrashIcon />
                    Trash Items
                </Button>
            </Link> 

        </div>
    )
}