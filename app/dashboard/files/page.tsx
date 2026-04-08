import { FilesBrowser } from "../_components/FileBrowser";

export default function FilesPage() {
    return <div>
 <div className="flex items-center justify-center  gap-2 m-2">
        <div className=" text-xm text-gray-800 " >
            Supported file types:
            image, csv, pdf, txt, jpg, doc, json, zip
            <div className="text-red-600 text-sm "
            > Uploading any other file type will result in an error.
            </div>
        </div> 
        </div>
        <FilesBrowser title="Your  Files" />
    </div>
} 
