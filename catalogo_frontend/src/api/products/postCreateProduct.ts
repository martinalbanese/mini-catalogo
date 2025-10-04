import type { CategoryType } from "../../types/CategoryType";
import type { ProductType } from "../../types/ProductType";
import { URL_PRODUCTS } from "../config";
import { handleResponse } from "./utils";

/**
 * Funzione API per la creazione di un nuovo prodotto.
 * Esegue una richiesta POST con l'oggetto prodotto (inviando solo l'ID della categoria).
 * * @param product Oggetto ProductType con i dati del nuovo prodotto.
 * @returns Promise<ProductType> Il prodotto creato con l'ID assegnato.
 */
export const postCreateProduct = async (product: ProductType): Promise<ProductType> => {
    const response = await fetch(URL_PRODUCTS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        
        body: JSON.stringify({ ...product, category: { id: (product.category as CategoryType).id } }),
    });
    return handleResponse(response);
};
