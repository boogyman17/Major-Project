"use client"

import Link from "next/link"
import { Package2 } from "lucide-react"

export default function BrandLink({displayName, className}){
    const finalClass = className ? className : "flex items-center gap-2 text-lg font-semibold md:text-base"
    return <Link
        href="/dashboard"
        className={finalClass}
    >
        <Package2 className="h-6 w-6" />
        {displayName ? 
             <span>Wintons teak</span>
            : 
            <span className="sr-only">Wintons Teak</span>
        }
    </Link>
}