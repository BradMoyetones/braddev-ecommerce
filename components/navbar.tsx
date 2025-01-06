"use client";

import { BaggageClaim, DoorOpen, Heart, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuList from "./MenuList";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./ToggleTheme";
import { useCart } from "@/hooks/useCart";
import { useLovedProducts } from "@/hooks/useLovedProducts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const cart = useCart();
  const { lovedItems } = useLovedProducts();
  const { user, logout } = useAuth();

  const navigateTo = (path: string) => router.push(path);

  return (
    <div className="w-full sticky top-0 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 z-50">
      <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-6xl ">
        <h1 className="text-3xl" onClick={() => navigateTo("/")}>
          Brad<span className="font-bold">Dev</span>
        </h1>
        <div className="items-center justify-between hidden sm:flex">
          <MenuList />
        </div>
        <div className="flex sm:hidden">
          <ItemsMenuMobile />
        </div>
        <div className="flex items-center justify-between gap-2 sm:gap-7">
          {cart.items.length === 0 ? (
            <ShoppingCart strokeWidth="1" className="cursor-pointer" onClick={() => navigateTo("/cart")} />
          ) : (
            <div className="flex gap-1 cursor-pointer" onClick={() => navigateTo("/cart")}>
              <BaggageClaim strokeWidth={1} />
              <span>{cart.items.length}</span>
            </div>
          )}
          <Heart
            strokeWidth="1"
            className={`cursor-pointer ${lovedItems.length > 0 ? "fill-black dark:fill-white" : ""}`}
            onClick={() => navigateTo("/loved-products")}
          />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <User strokeWidth="1" className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigateTo("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <DoorOpen className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <User strokeWidth="1" className="cursor-pointer" onClick={() => navigateTo("/login")} />
          )}
          <ToggleTheme />
        </div>
      </div>
    </div>
  );
}
