import { URL_PRODUCTS } from "../config";
import { handleResponse } from "./utils";

/**
 * Funzione API per l'eliminazione di un prodotto tramite ID.
 * Esegue una richiesta DELETE.
 * * @param id L'ID numerico del prodotto da eliminare.
 * @returns Promise<void> Non restituisce contenuto in caso di successo (204 No Content).
 */
export const deleteProduct = async (id: number): Promise<void> => {
    const response = await fetch(`${URL_PRODUCTS}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        await handleResponse(response); 
    }
};