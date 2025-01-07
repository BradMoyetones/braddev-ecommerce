"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useRouter } from "next/navigation"



const  MenuList = () => {
    const router = useRouter()
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Sobre Nosotros</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                            <NavigationMenuLink asChild>
                            <Link
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href="/"
                            >
                                <div className="mb-2 mt-4 text-lg font-medium">
                                BradDev
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                    Bienvenido a BradDev, donde la pasión por el café se encuentra con la excelencia en cada taza. Nuestro compromiso es ofrecerte una experiencia única, desde la selección de los mejores granos hasta la entrega de sabores excepcionales que deleitan tu paladar.
                                </p>
                            </Link>
                            </NavigationMenuLink>
                        </li>
                        <ListItem href="/shop" title="Tienda">
                            Accede a toda tu información, tus pedidos y mucho más.
                        </ListItem>
                        <ListItem href="/offers" title="Ofertas">
                            Sección dedicada a promociones y descuentos especiales
                        </ListItem>
                        <ListItem href="/" title="Accesorios">
                            Productos complementarios como tazas, molinillos, prensas, etc.
                        </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Cafés</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {components.map((component) => (
                            <ListItem
                            key={component.title}
                            title={component.title}
                            onClick={() => router.push(component.href)}
                            // href={component.href}
                            >
                            {component.description}
                            </ListItem>
                        ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default MenuList


const components: { title: string; href: string; description: string }[] = [
    {
        title: "Café grano",
        href: "/category/grano",
        description:
        "Granos de café enteros que requieren ser molidos antes de su preparación. Ideal para los entusiastas del café que buscan personalizar el nivel de molido para obtener la frescura y el aroma perfectos en cada taza.",
    },
    {
        title: "Café molido",
        href: "/category/molido",
        description:
        "Café molido, listo para ser utilizado directamente en tu cafetera favorita. Perfecto para aquellos que valoran la conveniencia sin comprometer el sabor y el aroma del café recién preparado.",
    },
    {
        title: "Café de cápsula",
        href: "/category/capsula",
        description:
        "Café de cápsula, la opción ideal para una experiencia de café rápida y sin complicaciones. Disfruta de la conveniencia de preparar una taza perfecta con solo insertar la cápsula en tu máquina.",
    },
]


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

