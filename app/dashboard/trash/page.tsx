"use client";

import { FilesBrowser } from "../_components/FileBrowser";


export default function TrashPage() {

    return (
        <>
            <div>
                <FilesBrowser title="Files scheduled for deletion" deletedOnly />
                <div className="flex justify-center text-xl mt-12 " > <span className="text-red-600" > Note:</span>  Files in the trash will be deleted in 7 days </div>
            </div>
        </>
    )
}
