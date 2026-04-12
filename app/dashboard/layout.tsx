
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

        <div className="container mx-auto pt-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 md:flex-row">
             <SideNav />
                <div className="w-full" >
                    {children}
                </div>
            </div>
        </div>

    );
}
