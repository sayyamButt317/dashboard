import { create } from "zustand";
import { persist } from "zustand/middleware";

type Cartitem = {
    id: string;
    productName: string;
    productDescription: string;
    price: number;
    quantity: number;
    picture: {
        secure_url: string;
    };
}

interface CartState {
    count: number;
    cart: Cartitem[];
    addToCart: (item: Cartitem) => void;
    removeFromCart: (id: string) => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            count: 0,
            cart: [],
            addToCart: (item) => set(state => {
                const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
                if (existingItem) {
                    return {
                        count: state.count + 1,
                        cart: state.cart.map((cartItem) => cartItem.id === item.id
                            ? { ...cartItem, quantity: cartItem.quantity + 1 }
                            : cartItem,
                        ),
                    };
                }

                return {
                    count: state.count + 1,
                    cart: [...state.cart, { ...item, quantity: 1 }],
                };
            }),
            removeFromCart: (id: string) => set(state => {
                const existingItem = state.cart.find((cartItem) => cartItem.id === id);
                if (existingItem && existingItem.quantity > 1) {
                    return {
                        count: state.count - 1,
                        cart: state.cart.map((cartItem) => cartItem.id === id
                            ? { ...cartItem, quantity: cartItem.quantity - 1 }
                            : cartItem,
                        ),
                    };

                }
                return {
                    count: state.count - 1,
                    cart: state.cart.filter((cartItem) => cartItem.id !== id),
                };
            }),
        }),
        {
            name: "cart-storage",
        },
    ),
)
