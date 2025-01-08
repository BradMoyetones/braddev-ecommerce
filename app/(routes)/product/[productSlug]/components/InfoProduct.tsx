import TasteOriginProduct from "@/components/shared/TasteOriginProduct"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/useCart"
import { useLovedProducts } from "@/hooks/useLovedProducts"
import { formatPrice } from "@/lib/formatPrice"
import { ProductType } from "@/types/products"
import { Heart } from "lucide-react"
import { useEffect, useState } from "react"

export type InfoProductProps = {
    product: ProductType
}

export default function InfoProduct(props: InfoProductProps) {
    const { product } = props
    const { addItem } = useCart()
    const { lovedItems, addLoveItem } = useLovedProducts()
    
    const isLoved = lovedItems.some((lovedItem) => lovedItem.id === product.id);
    
    return (
        <div className="px-6">
            <div className="justify-between my-4 sm:flex">
                <h1 className="text-2xl mb-4 sm:mb-0">{product.attributes.productName}</h1>
                <TasteOriginProduct taste={product.attributes.taste} origin={product.attributes.origin} />
            </div>
            <Separator className="my-4" />
            <p>
                {product.attributes.description}
            </p>
            <Separator className="my-4" />
            <p className="my-4 text-2xl">
                {formatPrice(product.attributes.price)}
            </p>
            <div className="flex items-center gap-5">
                <Button className="w-full" onClick={() => addItem(product)}>Añadir al carrito</Button>
                <Heart width={30} strokeWidth={1} className={`transition duration-300 cursor-pointer hover:fill-black ${isLoved ? "fill-black dark:fill-white" : ""}`} onClick={() => addLoveItem(product)} />
            </div>
        </div>
    )
}
