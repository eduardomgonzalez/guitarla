export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

// Para el elemento que se agrega en el carrito, ya no solo es una Guitar, sino se le agrega una nueva propiedad
// Se hereda y extiende de Guitar
export type CartItem = Guitar & {
    quantity: number
}

/* Utility Types */

// export type CartItem = Pick<Guitar, 'id' | 'name' | 'price' > & {
//     quantity: number
// }
// export type CartItem = Omit<Guitar, 'id' | 'name' | 'price' > & {
//     quantity: number
// }

