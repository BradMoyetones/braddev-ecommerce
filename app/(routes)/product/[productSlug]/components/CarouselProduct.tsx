/* eslint-disable @next/next/no-img-element */
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

interface CarouselProductProps{
    images: {
        data: {
            id: number;
            attributes: {
                url: string
            }
        }[]
    }
}

export default function CarouselProduct(props: CarouselProductProps) {
    const { images } = props
    
    return (
        <div className="sm:px-16">
            <Carousel>
                <CarouselContent>
                    {images.data.map((image) => (
                        <CarouselItem key={image.id}>
                            <img 
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.attributes.url}`} 
                                alt="Image Product" 
                                className="rounded-lg"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />

            </Carousel>
        </div>
    )
}
