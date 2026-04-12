import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, SignedOut, UserButton } from "@clerk/nextjs";
import { SignedIn, SignInButton, SignOutButton } from "@clerk/nextjs";
import { MoveRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export function Header() {


    return <div className="relative z-10 border-b py-4 bg-gray-50">
        <div className="container mx-auto flex flex-col gap-4 px-4 py-2 sm:flex-row sm:items-center sm:justify-between sm:px-0">
            <Link href="/" >
                <div className="text-3xl font-semibold font-serif  cursor-pointer flex items-center justify-center" >
                    <Image src="/logo.png" width={40} height={5} alt="filearc logo" /> File<span className="text-red-500" >Arc</span>  </div></Link>
            <SignedIn >
                <Link href="/dashboard/files" className="hidden md:inline-flex text-xl items-center justify-center font-semibold font-serif gap-2">
                    Dashboard <MoveRightIcon /> </Link>
            </SignedIn>

            <div className="flex gap-2 ">
                <OrganizationSwitcher />
                <UserButton />
                <SignedIn >
                    <SignOutButton >
                        <Button > SignOut </Button>
                    </SignOutButton>
                </SignedIn>
                <SignedOut >
                    <SignInButton mode="modal" >
                        <Button > Sign In  </Button>
                    </SignInButton>
                </SignedOut>
            </div>
        </div>
    </div>
}