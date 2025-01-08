import { Menu } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Link } from "next-view-transitions";
import { buttonVariants } from "./ui/button";
import useGetCategories from "@/api/getProducts";
import { CategoryType } from "@/types/category";
import { ResponseType } from "@/types/response";
import { Separator } from "./ui/separator";
import { DialogClose } from "@radix-ui/react-dialog";

const ItemsMenuMobile = () => {
    const { result, loading, error }: ResponseType = useGetCategories();

    return ( 
        <Sheet>
            <SheetTrigger>
                <Menu className="size-8" />
            </SheetTrigger>
            <SheetContent side={"left"} className="overflow-auto">
                <SheetHeader>
                    <SheetTitle>Menú</SheetTitle>
                    <SheetDescription>
                        Navega entre distintas opciones
                    </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                    <h2>Sobre Nosotros</h2>
                    <Separator className="my-4" />
                    <div>
                        <Link
                            href={"/"}
                            className={buttonVariants({
                                variant: "ghost"
                            })+" w-full !justify-start !items-start flex-col h-max"}
                        >
                            <h3>
                                Inicio
                            </h3>
                            <p className="line-clamp-2 w-full text-muted-foreground whitespace-normal">
                                Página principal
                            </p>
                        </Link>
                        <Link
                            href={"/shop"}
                            className={buttonVariants({
                                variant: "ghost"
                            })+" w-full !justify-start !items-start flex-col h-max"}
                        >
                            <h3>
                                Tienda
                            </h3>
                            <p className="line-clamp-2 w-full text-muted-foreground whitespace-normal">
                                Accede a toda tu información, tus pedidos y mucho más.
                            </p>
                        </Link>
                        <Link
                            href={"/offers"}
                            className={buttonVariants({
                                variant: "ghost"
                            })+" w-full !justify-start !items-start flex-col h-max"}
                        >
                            <h3>
                                Ofertas
                            </h3>
                            <p className="line-clamp-2 w-full text-muted-foreground whitespace-normal">
                                Sección dedicada a promociones y descuentos especiales
                            </p>
                        </Link>
                        <Link
                            href={"/accessories"}
                            className={buttonVariants({
                                variant: "ghost"
                            })+" w-full !justify-start !items-start flex-col h-max"}
                        >
                            <h3>
                                Accesorios
                            </h3>
                            <p className="line-clamp-2 w-full text-muted-foreground whitespace-normal">
                            Productos complementarios como tazas, molinillos, prensas, etc.
                            </p>
                        </Link>
                    </div>
                    <h2 className="mt-4">Categorias</h2>
                    <Separator className="my-4" />
                    <div>
                    {!loading && !error && result && result.length > 0 ? (
                        result.map((category: CategoryType) => (
                            <DialogClose key={category.id+"-menu-link"} asChild>
                                <Link 
                                    href={`/category/${category.attributes.slug}`} 
                                    className={buttonVariants({
                                        variant: "ghost"
                                    })+" w-full !justify-start !items-start flex-col h-max"}
                                >
                                    <h3>
                                        {category.attributes.categoryName}
                                    </h3>
                                    <p className="line-clamp-2 w-full text-muted-foreground whitespace-normal">
                                        {category.attributes.description}
                                    </p>
                                </Link>
                            </DialogClose>
                        ))
                    ): (
                        <span>No hay categorias por el momento</span>
                    )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
 
export default ItemsMenuMobile;