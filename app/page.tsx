"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignInButton, SignOutButton } from "@clerk/nextjs";

export default function Home() {


  return (
    <div >
      <SignedIn >
        <SignInButton mode="modal" > SignIn </SignInButton> 
         <SignOutButton  > SignIn </SignOutButton>
      </SignedIn>

      <Button > hello  </Button>
    </div>
  );
}
