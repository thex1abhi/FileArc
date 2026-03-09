
// export const metadata: Metadata = {
//     title: "FileArc",
//     description: "FileArc is created to store and organize files . Designed for teams and individuals.",
// };

import SideNav from "./side-nav";

export default function DashboardLayOut({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div className="container mx-auto pt-12  " >
            <div className="flex gap-8">
             <SideNav />
                <div className="w-full" >
                    {children}
                </div>
            </div>
        </div>

    );
}
