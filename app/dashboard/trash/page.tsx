"use client";

import { FilesBrowser } from "../_components/FileBrowser";


export default function TrashPage() {

    return <div>
        <FilesBrowser title="Files scheduled for deletion" deletedOnly />
    </div>
} 
 
