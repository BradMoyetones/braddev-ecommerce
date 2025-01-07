import { useEffect, useState } from "react";
import { ProductType } from "@/types/products";

export default function useGetCategoryProduct(slug: string | string[]) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&filters[category][slug][$eq]=${slug}`;
    const [result, setResult] = useState<ProductType[] | null>(null); // Tipo explícito
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error("Error al cargar los productos");
                const json = await res.json();
                setResult(json.data as ProductType[]); // Asegura el tipo
                setError(null);
            } catch (err: any) {
                setError(err.message || "Error desconocido");
            } finally {
                setLoading(false);
            }
        })();
    }, [url]);

    return { loading, result, error };
}
