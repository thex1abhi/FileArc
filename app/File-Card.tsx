import { Button } from "@/components/ui/button";
import {
    Card, CardContent, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Doc, Id } from "@/convex/_generated/dataModel";
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
import { FileTextIcon, GanttChartIcon, ImageIcon, MoreVertical, TrashIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import Image from "next/image";


function FileCardActions({ file }: { file: Doc<"files"> }) {
    const [isConfirmOpen, setisConfirmOpen] = useState(false)
    const deleteFile = useMutation(api.files.deleteFile);
    return (
        <>
            <AlertDialog open={isConfirmOpen} onOpenChange={setisConfirmOpen} >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your files
                            from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer" >Cancel</AlertDialogCancel>
                        <AlertDialogAction className="cursor-pointer" onClick={async () => {
                            await deleteFile({ fileId: file._id })
                            toast.success("File Deleted Successfully")
                        }} >Continue</AlertDialogAction>
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
                                setisConfirmOpen(true);
                            }}
                            className="flex gap-1  text-red-500 items-center cursor-pointer "
                        > <TrashIcon className="w-4 h-4 " /> Delete</DropdownMenuItem>

                    </DropdownMenuGroup>

                </DropdownMenuContent>
            </DropdownMenu>

        </>

    )
}

function getFileUrl(fileId: Id<"_storage">): string {
    return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}` 


}


export function FileCard({ file }: { file: Doc<"files"> }) {

    const typeIcons = {
        "image": <ImageIcon />,
        "pdf": <FileTextIcon />,
        "csv": <GanttChartIcon />,
    } as Record<Doc<"files">["type"], ReactNode>

    return (
        <Card>
            <CardHeader className="relative" >
                <CardTitle className="flex gap-3  "  >{file.name}
                    <div className="flex justify-center" > {typeIcons[file.type]}
                    </div>
                </CardTitle>
                <div className="absolute top-0 right-2 ">
                    <FileCardActions file={file} />
                </div>
            </CardHeader>
            <CardContent  >
                

                {
                    file.type === "image" && (
                        <Image alt={file.name} width="200" height="100"
                         src={ getFileUrl(file.fileId)  } />
                    )
                }
            </CardContent>
            <CardFooter>
                <Button>Downlaod </Button>
            </CardFooter>
        </Card>
    )
} 
