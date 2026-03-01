import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export function Header() {
    return <div className="border-b py-4 bg-gray-50" >
        <div className="container mx-auto justify-between flex  items-center " >
            <div className="text-3xl font-semibold font-serif " > File<span  className="text-red-500" >Arc</span>  </div>
            <div className="flex gap-2 ">
                <OrganizationSwitcher />
                <UserButton />
            </div>
        </div>
    </div>
}