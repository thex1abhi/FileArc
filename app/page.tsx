"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";

export default function Home() {
  const organization = useOrganization();
  const user = useUser()
  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id
  }
  console.log(organization.organization?.id)
  const createFile = useMutation(api.files.createfile)
  const files = useQuery(api.files.getFiles,
    orgId ? { orgId } : "skip")

  return (
    <>
      <div>
        {files?.map((file) => {
          return <div key={file._id}> {file.name} </div>
        })}

        <Button onClick={() => {
          if (!orgId) return;
          createFile({
            name: "hello next.js ",
            orgId,
          })
        }} >Click Me </Button>
      </div>
    </>
  );
}
