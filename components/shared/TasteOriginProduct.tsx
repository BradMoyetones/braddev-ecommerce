import { ProductType } from "@/types/products"

interface TasteOriginProduct {
    taste: string,
    origin: string,
}

export default function TasteOriginProduct(props: TasteOriginProduct) {
    const { taste, origin } = props

    return (
        <div className="flex items-center justify-between gap-3">
            <p className="px-2 py-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
                {taste}
            </p>
            <p className="px-2 py-1 text-whit bg-yellow-900 rounded-full text-white w-fit">
                {origin}
            </p>
        </div>
    )
}
