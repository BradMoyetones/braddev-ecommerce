/* eslint-disable @next/next/no-img-element */
import ProductImageMiniature from "@/components/shared/ProductImageMiniature"
import TasteOriginProduct from "@/components/shared/TasteOriginProduct"
import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/lib/formatPrice"
import { cn } from "@/lib/utils"
import { ProductType } from "@/types/products"
import { X } from "lucide-react"

interface CartItemProps {
    product: ProductType
}

export default function CartItem(props: CartItemProps) {
    const { product } = props
    const { removeItem } = useCart()

    return (
        <li className="flex py-6 border-b">
            <ProductImageMiniature slug={product.attributes.slug} url={product.attributes.images.data[0].attributes.url} />
            
            <div className="flex justify-between flex-1 px-6">
                <div>
                    <h2 className="text-lg font-bold">{product.attributes.productName}</h2>
                    <p className="font-bold">{formatPrice(product.attributes.price)}</p>

                    <TasteOriginProduct taste={product.attributes.taste} origin={product.attributes.origin} />
                </div>
                <div>
                    <button 
                        className={cn("rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition text-black")} 
                        onClick={() => removeItem(product.id)}
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        </li>
    )
}
