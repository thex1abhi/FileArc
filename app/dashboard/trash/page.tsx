"use client";

import { FilesBrowser } from "../_components/FileBrowser";


export default function TrashPage() {

    return (
        <>
            <div> 
                <div className="flex justify-center text-xl  gap-2 m-2" > <span className="text-red-600 " > Note: </span>  Files in the trash will be deleted in 7 days </div> 
                <FilesBrowser title="Files scheduled for deletion" deletedOnly />
                
            </div>
        </>
    )
}
