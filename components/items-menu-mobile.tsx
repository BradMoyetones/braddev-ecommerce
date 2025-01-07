import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Menu } from "lucide-react";
import Link from "next/link";

const ItemsMenuMobile = () => {
    return ( 
        <Popover>
            <PopoverTrigger>
                <Menu />
            </PopoverTrigger>
            <PopoverContent>
                <Link href={"/category/cafe-molido"} className="block">Café Molido</Link>
                <Link href={"/category/cafe-grano"} className="block">Café en Grano</Link>
                <Link href={"/category/cafe-capsula"} className="block">Café en Cápsulas</Link>
            </PopoverContent>
        </Popover>
    );
}
 
export default ItemsMenuMobile;