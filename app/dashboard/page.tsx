"use client";

import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import {  Loader2 } from "lucide-react";
import { useState } from "react";
import UploadButton from "./_components/UploadButton";
import { SearchBar } from "./_components/SearchBar";
import { FileCard } from "./_components/File-Card";

function PlaceHolder() {
  return (
    <div className="flex flex-col gap-8 w-full  items-center mt-12 " >
      <Image src="/empty.png" alt="Image Icon" width={300} height={300} />
      <div className="text-2xl" >  You have no files yet  </div>
      <UploadButton />
    </div>
  )
}

export default function Home() {

  const organization = useOrganization();
  const user = useUser();
  const [query, setquery] = useState("");


  let orgId: string | undefined = undefined;
  const isOrgLoading = !organization.isLoaded || !user.isLoaded;

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id
  }


  const files = useQuery(api.files.getFiles, orgId ? { orgId, query } : "skip");
  const favorites = useQuery(api.files.getAllFavorites, orgId ? { orgId } : "skip");

  const isLoading = isOrgLoading || (orgId != null && files === undefined); 
  return (
    <>
      <div className="container mx-auto pt-12  " >
        <div className="flex gap-8">

          <div className="w-full" >
            {isLoading && <div>
              <div className="flex flex-col gap-8 w-full items-center mt-24 " >
                <Loader2 className="mr-2 h-32 w-32 animate-spin text-gray-500 " />
                Loading your files & images...
              </div>
            </div>

            }


            {!isLoading && (
              <div className="flex justify-between items-center mb-8 " >
                <h1 className="text-4xl font-bold" > Your files</h1>
                <SearchBar query={query} setquery={setquery} />
                <UploadButton />
              </div>
            )}

            {files?.length === 0 && (
              <PlaceHolder />

            )}

            <div className="grid grid-cols-3  gap-4 " >
              {files?.map((file) => {
                return <FileCard key={file._id} file={file} favorites={favorites} />
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
