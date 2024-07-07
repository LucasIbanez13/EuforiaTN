import { writable } from 'svelte/store';

// Inicializa el carrito con un array vacío
const initialCart = [];

// Crea el store writable para el carrito
export const cart = writable(initialCart);
