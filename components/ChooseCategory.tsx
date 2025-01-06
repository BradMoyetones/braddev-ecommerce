/* eslint-disable @next/next/no-img-element */
"use client";

import useGetCategories from "@/api/getProducts";
import { CategoryType } from "@/types/category";
import { ResponseType } from "@/types/response";
import Link from "next/link";
import SkeletonSchema from "./SkeletonSchema";

export default function ChooseCategory() {
    const { result, loading, error }: ResponseType = useGetCategories();

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <h3 className="px-6 pb-4 text-3xl sm:pb-8">Elige tu categoría favorita</h3>
            
            {loading && <div className="flex gap-4 items-center flex-wrap my-10"><SkeletonSchema grid={3} /></div>}

            {!loading && error && (
                <div className="px-6 py-4 text-center">
                    <p className="text-xl font-semibold text-red-600">Ocurrió un error al cargar las categorías</p>
                    <p className="text-gray-600">Por favor, intenta nuevamente más tarde.</p>
                </div>
            )}

            {!loading && !error && result && result.length === 0 && (
                <div className="px-6 py-4 text-center">
                    <p className="text-xl font-semibold">No hay categorías disponibles</p>
                    <p className="text-gray-600">Explora otras secciones mientras actualizamos esta área.</p>
                </div>
            )}

            {!loading && !error && result && result.length > 0 && (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {result.map((category: CategoryType) => (
                        <Link
                            key={category.id}
                            href={`/category/${category.attributes.slug}`}
                            className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg"
                        >
                            <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${category.attributes.mainImage.data.attributes.url}`}
                                alt={category.attributes.categoryName}
                                className="max-w-[270px] transition duration-300 ease-in-out rounded-lg hover:scale-110"
                            />
                            <p className="absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">
                                {category.attributes.categoryName}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
