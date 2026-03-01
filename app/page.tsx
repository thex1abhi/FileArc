"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { SignedOut, useOrganization } from "@clerk/clerk-react";
import { SignedIn, SignInButton, SignOutButton } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";

export default function Home() {
  const  { organzation }  = useOrganization(); 
   console.log( organzation. )
  const createFile = useMutation(api.files.createfile)
  const files = useQuery(api.files.getFiles)

  return (
    <>

      <div>

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

        {files?.map((file) => {
          return <div key={file._id}> {file.name} </div>
        })}

        <Button onClick={() => { 
          if(!organzation) return ;
          createFile({
            name: "hello next.js ",
            orgId:organzation.id
          })
        }} >Click Me </Button>



      </div>

    </>
  );
}
