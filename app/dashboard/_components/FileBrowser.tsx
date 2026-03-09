"use client";

import { FileCard } from "@/app/dashboard/_components/File-Card";
import { SearchBar } from "@/app/dashboard/_components/SearchBar";
import UploadButton from "@/app/dashboard/_components/UploadButton";
import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import { useState } from "react";


function PlaceHolder() {
    return (
        <div className="flex flex-col gap-8 w-full  items-center mt-12 " >
            <Image src="/empty.png" alt="Image Icon" width={300} height={300} />
            <div className="text-2xl" >  You have no files yet  </div>
            <UploadButton />
        </div>
    )
}

export function FilesBrowser({ title, favoritesOnly }: { title: string, favoritesOnly?: boolean; }) {

    const organization = useOrganization();
    const user = useUser();
    const [query, setquery] = useState("");


    let orgId: string | undefined = undefined;

    if (organization.isLoaded && user.isLoaded) {
        orgId = organization.organization?.id ?? user.user?.id
    }

    const favorites = useQuery(api.files.getAllFavorites, 
        orgId? { orgId } : "skip" 
    )

const files = useQuery(api.files.getFiles,
    orgId ? { orgId, query, favorites: favoritesOnly } : "skip");
 
const isLoading = files === undefined;

return (

    <div>

        {!isLoading && (
            <div className="flex justify-between items-center mb-8 " >
                <h1 className="text-4xl font-bold" > {title} </h1>
                <SearchBar query={query} setquery={setquery} />
                <UploadButton />
            </div>
        )}

        {files?.length === 0 && (
            <PlaceHolder />

        )}

        <div className="grid grid-cols-3  gap-4 " >
            {files?.map((file) => {
                return <FileCard favorites={favorites ?? []  }   key={file._id} file={file} />
            })}
        </div>
    </div>

);
}
