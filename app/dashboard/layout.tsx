
// export const metadata: Metadata = {
//     title: "FileArc",
//     description: "FileArc is created to store and organize files . Designed for teams and individuals.",
// };


import { Button } from "@/components/ui/button";
import { FileIcon, StarIcon } from "lucide-react";
import Link from "next/link";

export default function DashboardLayOut({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div className="container mx-auto pt-12  " >
            <div className="flex gap-8">
                <div className="w-40  flex flex-col gap-4 " >
                    <Link href="/dashboard/files" >
                        <Button variant={"link"} className="flex gap-2 cursor-pointer " > <FileIcon />
                            All  Files
                        </Button>
                    </Link>
                    <Link href="/dashboard/favorites" >
                        <Button variant={"link"} className="flex gap-2  cursor-pointer" >
                            <StarIcon /> Favourites
                        </Button>
                    </Link>
                </div>
                <div className="w-full" >
                    {children}
                </div>
            </div>
        </div>

    );
}
