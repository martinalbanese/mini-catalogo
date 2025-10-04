import { URL_CATEGORIES } from "../config";

/**
 * Funzione API per il recupero di tutte le categorie.
 * Esegue una richiesta GET all'endpoint delle categorie.
 * * @returns Promise<CategoryType[]> Array di oggetti Categoria.
 */
export const getAllCategories = async () => {
    const response = await fetch(`${URL_CATEGORIES}`);
    if (!response.ok) {
        throw new Error('Errore nel recupero delle categorie');
    }
    const data = await response.json();
    return data;
}