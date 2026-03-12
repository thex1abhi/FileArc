"use client";

import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import UploadButton from "./dashboard/_components/UploadButton";
import { FileCard } from "./dashboard/_components/File-Card";
import Image from "next/image";
import { FileIcon, Loader2, StarIcon } from "lucide-react";
import { SearchBar } from "./dashboard/_components/SearchBar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
          <div className="w-40  flex flex-col gap-4 " >
            <Link href="/dashboard/files" >
              <Button variant={"link"} className="flex gap-2 cursor-pointer " > <FileIcon />
                All  Files
              </Button>
            </Link>

            <Link href="/dashboard/favorites" > 
              <Button variant={"link"} className="flex gap-2  cursor-pointer" > 
               <StarIcon/> Favourites
              </Button>
            </Link>

          </div>


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
