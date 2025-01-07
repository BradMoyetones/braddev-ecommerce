/* eslint-disable @next/next/no-img-element */
"use client"

import useGetFeaturedProducts from "@/api/useGetFeaturedProducts"
import { ResponseType } from "@/types/response"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import SkeletonSchema from "./SkeletonSchema"
import { ProductType } from "@/types/products"
import { Card, CardContent } from "./ui/card"
import { Expand, ShoppingCart } from "lucide-react"
import IconButton from "./IconButton"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/useCart"
import TasteOriginProduct from "./shared/TasteOriginProduct"

export default function FeaturedProducts() {
    const { error, loading, result }: ResponseType = useGetFeaturedProducts();
    const router = useRouter();
    const { addItem } = useCart();

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <h3 className="px-6 text-3xl sm:pb-8">Productos destacados</h3>
            
            {loading && <div className="flex gap-4 items-center flex-wrap my-10"><SkeletonSchema grid={3} /></div>}
            
            {!loading && (error || !result || result.length === 0) && (
                <div className="px-6 py-10 text-center">
                    <h4 className="text-xl font-semibold">No hay productos destacados por mostrar</h4>
                    <p className="text-gray-600">Intenta recargar la página más tarde.</p>
                </div>
            )}

            {!loading && result && result.length > 0 && (
                <Carousel>
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {result.map((product: ProductType) => {
                            const { attributes, id } = product;
                            const { slug, images, productName, taste, origin } = attributes;
                            return (
                                <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3 group">
                                    <div className="p-1">
                                        <Card className="py-4 border border-gray-200 shadow-none">
                                            <CardContent className="relative flex items-center justify-center px-6 py-2">
                                                <img 
                                                    src={`${images.data[0].attributes.url}`} 
                                                    alt="Image featured" 
                                                />
                                                <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                                                    <div className="flex justify-center gap-x-6">
                                                        <IconButton 
                                                            onClick={() => router.push(`product/${slug}`)} 
                                                            icon={<Expand size={20} className="text-gray-600" />} 
                                                        />
                                                        <IconButton 
                                                            onClick={() => addItem(product)} 
                                                            icon={<ShoppingCart size={20} className="text-gray-600" />} 
                                                        />                                                        
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <div className="flex justify-between gap-4 px-8">
                                                <h3 className="text-lg font-bold">{productName}</h3>
                                                <TasteOriginProduct taste={taste} origin={origin} />
                                            </div>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            )}
        </div>
    );
}
