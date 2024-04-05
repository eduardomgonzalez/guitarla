import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";
import type { Guitar, CartItem } from "../types";

export const useCart = () => {

    const initialCart = (): CartItem[] => {
        const localStorageCart = localStorage.getItem("cart");
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    };

    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MIN_ITEMS = 1;
    const MAX_ITEMS = 5;

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Para agregar producto al carrito
    function addToCart(item: Guitar) {
        const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
        if (itemExists >= 0) {
          // existe en el carrito
          if (cart[itemExists].quantity >= MAX_ITEMS) return;
          const updatedCart = [...cart];
          updatedCart[itemExists].quantity++;
          setCart(updatedCart);
        } else {
          // Genero un nuevo elemento del tipo CartItem
          // toma una copia de lo que le estamos pasando a esta función
          const newItem: CartItem = { ...item, quantity: 1 };
          setCart([...cart, newItem]);
        }
    }

    // Eliminar producto del carrito
    function removeFromCart(id: Guitar["id"]) {
        setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
    }

    // Decrementar la cantidad de un producto
    function decreaseQuantity(id: Guitar["id"]) {
        const updatedCart = cart.map((item) => {
          if (item.id === id && item.quantity > MIN_ITEMS) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        });
        setCart(updatedCart);
    }

    // Incrementar la cantidad de un producto
    function increaseQuantity(id: Guitar["id"]) {
        const updatedCart = cart.map((item) => {
          if (item.id === id && item.quantity < MAX_ITEMS) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        setCart(updatedCart);
    }

    // Limpiar el carrito
    function clearCart() {
        setCart([])
    }

    // State Derivado
    // Se ejecuta de nuevo cuando "cart" cambie
    // isEmpty ya no es una función
    const isEmpty = useMemo( () => cart.length === 0, [cart]);
    const cartTotal = useMemo(
        () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
        [cart]
    );

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}