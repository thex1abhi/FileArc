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
import { MoreVertical, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";


function FileCardActions({file}:{file: Doc  }) {
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
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                            deleteFile(file._id)
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

export function FileCard({ file }: { file: Doc<"files"> }) {

    return (
        <Card>
            <CardHeader className="relative" >
                <CardTitle>{file.name}  </CardTitle>
                <div className="absolute top-0 right-2 "> <FileCardActions 
                file={file} /> </div>

            </CardHeader>
            <CardContent>
                <p> Card Content     </p>
            </CardContent>
            <CardFooter>
                <p> </p>
                <Button>Downlaod </Button>
            </CardFooter>
        </Card>
    )
} 
