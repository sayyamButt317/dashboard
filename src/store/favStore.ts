import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavouriteItem = {
  id: string;
  productName: string;
  productDescription: string;
  price: number;
  quantity: number;
  picture: {
    secure_url: string;
  };
};

interface FavProductState {
  count: number;
  favourite: FavouriteItem[];
  addToFavorite: (product: FavouriteItem) => void;
  removeFromFavorite: (productId: number) => void;
  resetFavorite: () => void;
}

export const useProductFavStore = create<FavProductState>()(
  persist((set) => ({
    count: 0,
    favourite: [],
    addToFavorite: (product) =>
      set((state) => {
        const existingItem = state.favourite.some(
          (favItem) => favItem.id === product.id
        );
        if (existingItem) {
          return {
            count: state.count + 1,
            favourite: state.favourite.map((favItem) =>
              favItem.id === product.id
                ? { ...favItem, price: product.price }
                : favItem
            ),
          };
        }

        return {
          count: state.count + 1,
          favourite: [...state.favourite, { ...product, quantity: 1 }],
        };
      }),

    removeFromFavorite:(productId) => set((state =>{

    }))
  }))
);

// const existingItem = state.favoriteProduct.find((cartItem) => cartItem.id === item.id);

//                     return {
//                       favoriteProduct: isFavorite
//                         ? state.favoriteProduct.filter(
//                             (item) => item._id !== product._id
//                           )
//                         : [...state.favoriteProduct, { ...product }],
//                     };
//                   })

//               removeFromFavorite: (productId: number) => {
//                 set((state: StoreType) => ({
//                   favoriteProduct: state.favoriteProduct.filter(
//                     (item) => item._id !== productId
//                   ),
//                 }));
//               },
//               resetFavorite: () => {
//                 set({ favoriteProduct: [] });
//               },
