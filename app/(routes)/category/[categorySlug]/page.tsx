"use client";
import useGetCategoryProduct from "@/api/getCategoryProduct";
import { Separator } from "@/components/ui/separator";
import FiltersControlsCategory from "./components/FiltersControlsCategory";
import SkeletonSchema from "@/components/SkeletonSchema";
import ProductCard from "./components/ProductCard";
import { ProductType } from "@/types/products";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
    const { categorySlug } = useParams();
    const { result, loading, error } = useGetCategoryProduct(categorySlug);
    const [filterOrigin, setFilterOrigin] = useState("");

    // Asegura que result no sea null antes de aplicar el filtro
    const filteredProducts = result?.filter((product: ProductType) =>
        filterOrigin === "" || product.attributes.origin === filterOrigin
    ) || [];

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24 px-4">
            {loading ? (
                <h1 className="text-3xl font-medium">Cargando productos...</h1>
            ) : error ? (
                <h1 className="text-3xl font-medium text-red-600">
                    {error || "Error al cargar los productos"}
                </h1>
            ) : result && result.length > 0 ? (
                <h1 className="text-3xl font-medium">
                    Café {result[0].attributes.category.data.attributes.categoryName}
                </h1>
            ) : (
                <h1 className="text-3xl font-medium">No hay productos para mostrar</h1>
            )}

            <Separator />

            <div className="sm:flex sm:justify-between">
                <FiltersControlsCategory setFilterOrigin={setFilterOrigin} />

                {loading && <div className="flex gap-4 items-center flex-wrap my-10"><SkeletonSchema grid={3} /></div>}
                <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">

                    {!loading && error && (
                        <p className="text-red-600">
                            Error al cargar productos. Intenta recargar la página.
                        </p>
                    )}

                    {!loading &&
                        !error &&
                        filteredProducts.map((product: ProductType) => (
                            <ProductCard key={product.id} product={product} />
                        ))}

                    {!loading &&
                        !error &&
                        filteredProducts.length === 0 && (
                            <p>No hay productos con este filtro.</p>
                        )}
                </div>
            </div>
        </div>
    );
}
