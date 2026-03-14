import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, SignedOut, UserButton } from "@clerk/nextjs";
import { SignedIn, SignInButton, SignOutButton } from "@clerk/nextjs";
import { MoveRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export function Header() {
    return <div className="border-b py-4 bg-gray-50" >
        <div className="container mx-auto justify-between flex  items-center " >
          <Link href="/" >  
          <div className="text-3xl font-semibold font-serif  flex items-center justify-center" > 
            <Image  src="/logo.png"  width={40} height={5}  alt="filearc logo" /> File<span className="text-red-500" >Arc</span>  </div></Link> 
         
             <Link href="/dashboard/files" className="text-xl flex items-center justify-center font-semibold font-serif gap-2 " > 
             Dashboard <MoveRightIcon/> </Link> 
           
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