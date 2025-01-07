"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter()
    return (
        <div className="max-w-5xl p-4 mx-auto sm:py-16 sm:px-24">
            <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <div className="flex justify-center sm:min-w-[400px]">
                    <Image src="/success.jpg" alt="Success" width={350} height={600} className="rounded-lg" />
                </div>

                <div>
                    <h1 className="text-3xl">¡Ocurrió un error con tu compra!</h1>
                    <p className="my-3">
                        Lo sentimos algo ocurrio algo con tu compra por favor verifica
                    </p>

                    <Button onClick={() => router.push("/")}>Volver a la tienda</Button>
                </div>
            </div>
        </div>
    )
}
