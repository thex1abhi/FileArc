"use client";

import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
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
    FileIcon, MoreVertical,
    StarIcon, StarOff, TrashIcon,
    UndoIcon
} from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Protect } from "@clerk/nextjs";


export function FileCardActions({ file, isFavorited }:
    { file: Doc<"files">, isFavorited: boolean }) {
    const [isConfirmOpen, setisConfirmOpen] = useState(false);
    const ToggleFavorite = useMutation(api.files.ToggleFavorite);
    const deleteFile = useMutation(api.files.deleteFile);
    const restoreFile = useMutation(api.files.RestoreFile);
    const fileUrl = useQuery(api.files.getFileUrl, { fileId: file.fileId });
    const me = useQuery(api.users.getMe);

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

                        <DropdownMenuItem
                            onClick={() => {
                                if (!fileUrl) return;
                                window.open(fileUrl, "_blank")
                            }}
                            className="flex gap-1   items-center cursor-pointer "
                        > <FileIcon className='w-4 h-4 ' /> Download

                        </DropdownMenuItem>
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
                            condition={(check) => {
                                return check({
                                    role: "org:admin"
                                }) || file.userId === me?._id; 
                            }}
                            fallback={<></>}
                        >

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