"use client";

import { FilesBrowser } from "../_components/FileBrowser";


export default function FavoritesPage() {

    return <div>
        <FilesBrowser title="Favorites" favoritesOnly={true} />  
    </div> 
} 
 