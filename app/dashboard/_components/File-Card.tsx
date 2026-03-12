"use client";

import { Button } from "@/components/ui/button";
import {
    Card, CardContent, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Doc } from "@/convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,

} from "@/components/ui/alert-dialog"
import {
    FileTextIcon, GanttChartIcon, ImageIcon, MoreVertical,
    StarIcon, StarOff, TrashIcon,
    UndoIcon
} from "lucide-react";
import { ReactNode, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import Image from "next/image";
import { Protect } from "@clerk/nextjs";



function FileCardActions({ file, isFavorited }: { file: Doc<"files">, isFavorited: boolean }) {
    const [isConfirmOpen, setisConfirmOpen] = useState(false);
    const ToggleFavorite = useMutation(api.files.ToggleFavorite);
    const deleteFile = useMutation(api.files.deleteFile);
    const restoreFile = useMutation(api.files.RestoreFile);


    return (
        <>
            <AlertDialog open={isConfirmOpen} onOpenChange={setisConfirmOpen} >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you  sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will  mark the file for our deletion process
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer" >
                            Cancel</AlertDialogCancel>
                        <AlertDialogAction className="cursor-pointer"
                            onClick={async () => {
                                await deleteFile({ fileId: file._id })
                                toast.success("File marked for deletion ")
                            }} >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline"> <MoreVertical /> </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        {/* favourites */}
                        <DropdownMenuItem
                            onClick={() => {
                                ToggleFavorite({
                                    fileId: file._id,
                                })
                            }}
                            className="flex gap-1   items-center cursor-pointer "
                        >{isFavorited ? (
                            <div className="flex gap-1 items-center`" >
                                <StarOff className="w-4 h-4 " /> Unfavorite  </div>
                        ) : (<div className="flex gap-1 items-center`" >
                            <StarIcon className="w-4 h-4 " /> Favorite </div>
                        )}

                        </DropdownMenuItem>
                        {/* delete */}
                        <Protect
                            role="org:admin"
                            fallback={<></>}
                        >
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    if (file.shouldDelete) {
                                        restoreFile({
                                            fileId: file._id,
                                        })
                                    } else {
                                        setisConfirmOpen(true);
                                    }
                                }}
                                className="flex gap-1   items-center cursor-pointer "
                            >
                                {file.shouldDelete ? <div className="text-green-600 flex items-center gap-2"> <UndoIcon className="w-4   h-4 " />  Restore </div> :
                                    <div className="flex items-center text-red-500   gap-2" >
                                        <TrashIcon className="w-4 h-4  " /> Delete
                                    </div>}

                            </DropdownMenuItem>
                        </Protect>


                    </DropdownMenuGroup>

                </DropdownMenuContent>
            </DropdownMenu>

        </>

    )
}



export function FileCard({ file, favorites }: { file: Doc<"files">, favorites: Doc<"favorites">[] | undefined }) {
    const fileUrl = useQuery(api.files.getFileUrl, { fileId: file.fileId });
    const userProfile = useQuery(api.users.getUserProfile, {
        userId: file.userId,
    });

    const typeIcons = {
        "image": <ImageIcon />,
        "pdf": <FileTextIcon />,
        "csv": <GanttChartIcon />,
    } as Record<Doc<"files">["type"], ReactNode>;

    const isFavorited = favorites?.some((favorite) => favorite.fileId === file._id) ?? false;

    return (
        <Card>
            <CardHeader className="relative" >
                <CardTitle className="flex gap-3  "  >{file.name}
                    <div className="flex justify-center" > {typeIcons[file.type]}
                    </div>
                </CardTitle>
                <div className="absolute top-0 right-2 ">
                    <FileCardActions file={file} isFavorited={isFavorited} />
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
            </CardContent>
            <CardFooter className="flex justify-center" >

                <Avatar>
                    <AvatarImage src={userProfile?.image} />
                    <AvatarFallback> UserImage </AvatarFallback>
                </Avatar> 
                {userProfile?.name} 

                <Button onClick={() => {
                    if (!fileUrl) return;
                    window.open(fileUrl, "_blank")
                }} >Download </Button>
            </CardFooter>
        </Card>
    )
} 
