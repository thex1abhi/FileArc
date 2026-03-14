"use client";

import { FileCard } from "@/app/dashboard/_components/File-Card";
import { SearchBar } from "@/app/dashboard/_components/SearchBar";
import UploadButton from "@/app/dashboard/_components/UploadButton";
import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GridIcon, Loader2, RowsIcon } from "lucide-react";

function PlaceHolder() {
    return (
        <div className="flex flex-col gap-8 w-full  items-center mt-12 " >
            <Image src="/empty.png" alt="Image Icon" width={300} height={300} />
            <div className="text-2xl" >  You have no files yet  </div>
            <UploadButton />
        </div>
    )
}

export function FilesBrowser({ title, favoritesOnly, deletedOnly }: {
    title: string,
    favoritesOnly?: boolean;
    deletedOnly?: boolean;
}) {

    const organization = useOrganization();
    const user = useUser();
    const [query, setquery] = useState("");


    let orgId: string | undefined = undefined;

    if (organization.isLoaded && user.isLoaded) {
        orgId = organization.organization?.id ?? user.user?.id
    }

    const favorites = useQuery(api.files.getAllFavorites,
        orgId ? { orgId } : "skip"
    )

    const files = useQuery(api.files.getFiles,
        orgId ? { orgId, query, favorites: favoritesOnly, deletedOnly } : "skip");

    const isLoading = files === undefined;

    const modifiedFiles = files?.map(file => ({
        ...file,
        isFavorited: (favorites ?? []).some(
            (favorite) => favorite.fileId === file._id) ?? false

    })) ?? [];

    return (


        <div>


            {!isLoading && (
                <div className="flex justify-between items-center mb-8 " >
                    <h1 className="text-4xl font-bold" > {title} </h1>
                    <SearchBar query={query} setquery={setquery} />
                    <UploadButton />
                </div>
            )}
            <Tabs defaultValue="grid"  >
                <TabsList className="mb-4" >
                    <TabsTrigger value="grid" className="flex gap-2 items-center " > <GridIcon /> Grid</TabsTrigger>
                    <TabsTrigger value="table" className="flex gap-2 items-center " ><RowsIcon /> Table</TabsTrigger>
                </TabsList>
                {isLoading && (
                    <div className="flex flex-col gap-8 w-full items-center mt-24">
                        <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
                        <div className="text-2xl">Loading your files...</div>
                    </div>
                )}

                <TabsContent value="grid" >
                    <div className="grid grid-cols-3  gap-4 " >
                        {modifiedFiles?.map((file) => {
                            return <FileCard key={file._id} file={file} />
                        })}
                    </div>
                </TabsContent>
                <TabsContent value="table"> {" "}
                    <DataTable columns={columns} data={modifiedFiles} />
                </TabsContent>
            </Tabs>

            {files?.length === 0 && (
                <PlaceHolder />

            )}

        </div>

    );
}
