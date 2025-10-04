import type { CategoryType } from "../../types/CategoryType";
import { URL_CATEGORIES } from "../config";

/**
 * Funzione API per la creazione di una nuova categoria.
 * Esegue una richiesta POST con i dati JSON della nuova categoria.
 * * @param category Oggetto CategoryType contenente il nome.
 * @returns Promise<CategoryType> La categoria creata con il suo ID.
 */
export const postCreateCategories = async (category: CategoryType) => {
    const response = await fetch(`${URL_CATEGORIES}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
    });

    if (!response.ok) {
        throw new Error('Errore nella creazione della categoria');
    }

    const data = await response.json();
    return data;
}