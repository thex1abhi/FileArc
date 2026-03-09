import { Button } from "@/components/ui/button";
import {
    Card, CardContent, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Doc } from "@/convex/_generated/dataModel";
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
import { FileTextIcon, GanttChartIcon, ImageIcon, MoreVertical, StarIcon, TrashIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { useMutation, useQuery } from "convex/react";
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
                        <AlertDialogCancel className="cursor-pointer" >
                            Cancel</AlertDialogCancel>
                        <AlertDialogAction className="cursor-pointer"
                            onClick={async () => {
                                await deleteFile({ fileId: file._id })
                                toast.success("File Deleted Successfully")
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
                                
                            }}
                            className="flex gap-1   items-center cursor-pointer "
                        > <StarIcon className="w-4 h-4 " /> Favorite</DropdownMenuItem>
                        {/* delete */} 
                        <DropdownMenuSeparator /> 
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



export function FileCard({ file }: { file: Doc<"files"> }) {
    const fileUrl = useQuery(api.files.getFileUrl, { fileId: file.fileId });

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
                <Button onClick={() => {
                    if (!fileUrl) return;
                    window.open(fileUrl, "_blank")
                }} >Download </Button>
            </CardFooter>
        </Card>
    )
} 
