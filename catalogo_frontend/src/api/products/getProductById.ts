import type { ProductType } from "../../types/ProductType";
import { URL_PRODUCTS } from "../config";
import { handleResponse } from "./utils";

/**
 * Funzione API per recuperare un singolo prodotto tramite ID.
 * Esegue una richiesta GET all'endpoint specifico del prodotto.
 * * @param id L'ID numerico del prodotto.
 * @returns Promise<ProductType> L'oggetto Prodotto completo.
 */
export const getProductById = async (id: number): Promise<ProductType> => {
    const response = await fetch(`${URL_PRODUCTS}/${id}`);
    return handleResponse(response);
};