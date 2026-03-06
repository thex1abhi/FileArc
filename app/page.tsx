"use client";

import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import UploadButton from "./UploadButton";
import { FileCard } from "./File-Card";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Home() {

  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip"); 
  const isLoading=files===undefined;
  return (
    <>
      <div className="container mx-auto pt-12  " >

        {isLoading && <div>
          <div className="flex flex-col gap-8 w-full items-center mt-24 " >
            <Loader2 className="mr-2 h-32 w-32 animate-spin text-gray-500 " />
            Loading your files & images
          </div>
        </div>
        }

        {!isLoading && files.length === 0 && (
          <div className="flex flex-col gap-8 w-full  items-center mt-12 " >
            <Image src="/empty.png" alt="Image Icon" width={300} height={300} />
            <div className="text-2xl" >  You have no files yet  </div>
            <UploadButton />
          </div>
        )}

        {!isLoading && files.length > 0 && (
          <div className="flex justify-between items-center mb-8 " >
            <h1 className="text-4xl font-bold" > Your files</h1>
            <UploadButton />
          </div>
        )}

        <div className="grid grid-cols-4  gap-4 " >
          {files?.map((file) => {
            return <FileCard key={file._id} file={file} />
          })}
        </div>
      </div>
    </>
  );
}
