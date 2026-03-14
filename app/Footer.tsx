
import Link from "next/link"


export function Footer() {
    return (
        <div className="h-20 bg-gray-100 mt-12 flex items-center mb-0 " >

            <div className="container mx-auto flex justify-between items-center ">
                <Link href="/" className="  text-3xl font-semibold font-serif" >
                    File<span className="text-red-500" >Arc</span>
                </Link>
                <Link className="text-blue-400 hover:text-blue-500 cursor-pointer font-bold text-xl " href="/privacy"  >Privacy Policy </Link>
                <Link className="text-blue-400 hover:text-blue-500 cursor-pointer font-bold text-xl " href="/terms-of-service"  >Terms & Service </Link>
                <Link className="text-blue-400 hover:text-blue-500 cursor-pointer font-bold text-xl " href="/about" >About us </Link>
            </div> 
        </div>
    )
}