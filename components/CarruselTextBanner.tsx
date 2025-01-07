"use client"
import { useRouter } from "next/navigation"
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel"
import { Card, CardContent } from "./ui/card"
import Autoplay from 'embla-carousel-autoplay'

export const dataCarouselTop = [
    {
        id: 1,
        title: "Envio en 24/48 h",
        description: "Como cliente VIP, tus envios en 24/48 horas. Obtén más información y únete.",
        link: "#!"
    },
    {
        id: 2,
        title: "Programa de Fidelización Café Lovers",
        description: "Únete a nuestro exclusivo programa Café Lovers y acumula puntos con cada compra. Canjea tus puntos por descuentos, productos exclusivos y experiencias únicas en el mundo del café.",
        link: "#!"
    },
    {
        id: 3,
        title: "Descubre Nuestro Catálogo de Cafés de Origen",
        description: "Explora nuestra colección de cafés de origen único, cuidadosamente seleccionados de las mejores regiones cafetaleras del mundo. Desde Colombia hasta Etiopía, cada café ofrece un sabor y aroma distintivo que refleja su lugar de origen.",
        link: "#!"
    },
    {
        id: 4,
        title: "Envíos Internacionales Disponibles",
        description: "¡Disfruta de nuestro café donde sea que estés! Ofrecemos envíos internacionales para que puedas disfrutar de nuestros productos premium en cualquier parte del mundo. Consulta nuestras tarifas y condiciones.",
        link: "#!"
    }    
]

export default function CarouselTextBanner() {
    const router = useRouter()

    return (
        <div className="bg-gray-200 dark:bg-primary">
            <Carousel 
                className="w-full max-w-4xl mx-auto"
                plugins={[
                    Autoplay({
                        delay: 2500
                    })
                ]}    
            >
                <CarouselContent>
                    {dataCarouselTop.map(({id, title, link, description}) => (
                        <CarouselItem key={id} onClick={() => router.push(link)} className="cursor-pointer">
                            <div>
                                <Card className="shadow-none border-none bg-transparent">
                                    <CardContent className="flex flex-col justify-center p-2 items-center text-center">
                                        <p className="sm:text-lg text-wrap dark:text-secondary">{title}</p>
                                        <p className="text-xs sm:text-sm text-wrap dark:text-secondary">{description}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
