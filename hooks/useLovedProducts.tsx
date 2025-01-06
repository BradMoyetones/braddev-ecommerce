import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { toast } from '@/components/ui/use-toast'

import { ProductType } from "@/types/products"

interface UseLovedProductsType {
    lovedItems: ProductType[],
    addLoveItem: (data: ProductType) => void,
    removeLovedItem: (id: number) => void
}

export const useLovedProducts = create(
    persist<UseLovedProductsType>(
      (set, get) => ({
        lovedItems: [],
        addLoveItem: (data: ProductType) => {
          const currentLovedItems = get().lovedItems;
          const exists = currentLovedItems.some((item) => item.id === data.id);
  
          if (exists) {
            return toast({
              title: "El producto ya está en la lista de favoritos.",
              variant: "destructive",
            });
          }
  
          set({ lovedItems: [...currentLovedItems, data] });
          toast({
            title: "Producto añadido a favoritos.",
          });
        },
        removeLovedItem: (id: number) => {
          set({ lovedItems: get().lovedItems.filter((item) => item.id !== id) });
          toast({
            title: "Producto eliminado de favoritos.",
          });
        },
        removeAll: () => {
          set({ lovedItems: [] });
          toast({
            title: "Todos los productos se eliminaron de favoritos.",
          });
        },
      }),
      {
        name: "loved-products-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
  