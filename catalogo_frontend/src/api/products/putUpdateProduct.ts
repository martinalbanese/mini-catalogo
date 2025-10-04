import type { CategoryType } from "../../types/CategoryType";
import type { ProductType } from "../../types/ProductType";
import { URL_PRODUCTS } from "../config";
import { handleResponse } from "./utils";

/**
 * Funzione API per l'aggiornamento di un prodotto esistente.
 * Esegue una richiesta PUT all'endpoint del prodotto specifico.
 * * @param id L'ID numerico del prodotto da aggiornare.
 * @param product Oggetto ProductType con i dati aggiornati (inviando solo l'ID della categoria).
 * @returns Promise<ProductType> L'oggetto Prodotto aggiornato.
 */
export const putUpdateProduct = async (id: number, product: ProductType): Promise<ProductType> => {
    const response = await fetch(`${URL_PRODUCTS}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, category: { id: (product.category as CategoryType).id } }),
    });
    return handleResponse(response);
};