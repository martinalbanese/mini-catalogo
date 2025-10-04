import type { CategoryType } from "./CategoryType";
/**
 * Definizione dei tipi per l'entità Prodotto, la risposta paginata dal backend e i parametri di ricerca.
 */

// Tipo per i dati di input/output del prodotto
export type ProductType = {
    id?: number;
    name: string;
    price: number;
    category: CategoryType;
    tags?: string;
    createdAt?: string; 
};

// Tipo per la risposta paginata dal backend
export type ProductPageResponse = {
    content: ProductType[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number; 
    first: boolean;
    last: boolean;
};

// Tipo per i parametri di query per il Listing avanzato
export type ProductSearchParams = {
    search?: string;
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'id' | 'price' | 'createdAt';
    page?: number;
    size?: number;
};