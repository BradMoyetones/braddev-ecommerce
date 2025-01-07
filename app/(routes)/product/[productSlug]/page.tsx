"use client"

import { useGetProductBySlug } from "@/api/getProductBySlug"
import { ResponseType } from "@/types/response"
import { useParams } from "next/navigation"
import SkeletonProduct from "./components/SkeletonProduct"
import CarouselProduct from "./components/CarouselProduct"
import InfoProduct from "./components/InfoProduct"

export default function Page() {
    const params = useParams()
    const { productSlug } = params

    const { result }: ResponseType = useGetProductBySlug(productSlug)
    

    if(result === null){
        return <SkeletonProduct />
    }

    return (
        <div className="max-w-6xl py-4 mx-auto min-h-[613px] flex items-center justify-center">
            <div className="grid md:grid-cols-2 gap-4 h-full items-center">
                <div className="px-4">
                    <CarouselProduct images={result[0].attributes.images} />
                </div>

                <div className="sm:px-4">
                    <InfoProduct product={result[0]} />
                </div>
            </div>
        </div>
    )
}
