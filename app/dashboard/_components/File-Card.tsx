"use client";

import { formatRelative } from 'date-fns'
import {
    Card, CardContent, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Doc } from "@/convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
   
    FileArchive,
    FileBraces,
    FileSearchCorner,
    FileTextIcon, GanttChartIcon, ImageIcon,
    TextInitial
} from "lucide-react";
import { ReactNode } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { FileCardActions } from './file-Actions';


export function FileCard({
    file }: {
        file: Doc<"files"> & { isFavorited: boolean }
    }) {
    const fileUrl = useQuery(api.files.getFileUrl, { fileId: file.fileId });
    const userProfile = useQuery(api.users.getUserProfile, {
        userId: file.userId,
    });

    const typeIcons = {
        "image": <ImageIcon />,
        "pdf": <FileTextIcon />,
        "csv": <GanttChartIcon />,
        "txt": <TextInitial />,
        "doc": <FileSearchCorner/> , 
        "json": < FileBraces />, 
        "zip": < FileArchive />

    } as Record<Doc<"files">["type"], ReactNode>;

    return (
        <Card>
            <CardHeader className="relative" >
                <CardTitle className="flex gap-3 text-base font-normal "  >{file.name}
                    <div className="flex justify-center  " > {typeIcons[file.type]}
                    </div>
                </CardTitle>
                <div className="absolute top-0 right-2 ">
                    <FileCardActions file={file} isFavorited={file.isFavorited} />
                </div>
            </CardHeader>
            <CardContent className="h-50 flex justify-center items-center "  >

                {
                    file.type === "image" && fileUrl && (

                        <Image alt={file.name} width={200} height={100}
                            src={fileUrl} />
                    )
                }
                {file.type === "csv" && <GanttChartIcon className="w-20 h-20" />}
                {file.type === "pdf" && <FileTextIcon className="w-20 h-20" />} 
                  {file.type === "txt" && <TextInitial className="w-20 h-20" />} 
                    {file.type === "doc" && <FileSearchCorner className="w-20 h-20" />}
                     {file.type === "json" && <FileBraces className="w-20 h-20" />}  
                      {file.type === "zip" && < FileArchive className="w-20 h-20" />}
            </CardContent>
            <CardFooter className="flex  justify-between " >


                <div className="flex gap-2  text-xs text-gray-700 w-40  items-center" >
                    <Avatar className="w-6 h-6  " >
                        <AvatarImage src={userProfile?.image} />
                        <AvatarFallback> UserImage </AvatarFallback>
                    </Avatar>
                    {userProfile?.name}
                </div>
                <div className="text-xs text-gray-700   " >
                    Uploaded On :  {formatRelative(new Date(file._creationTime), new Date())}
                </div>


            </CardFooter>
        </Card>
    )
} 
