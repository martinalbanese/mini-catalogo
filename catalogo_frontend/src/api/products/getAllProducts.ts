import type { ProductPageResponse, ProductSearchParams } from "../../types/ProductType";
import { URL_PRODUCTS } from "../config";
import { buildQueryParams, handleResponse } from "./utils";

/**
 * Funzione API per recuperare la lista dei prodotti con supporto per filtri, ordinamento e paginazione.
 * Esegue una richiesta GET con parametri di query costruiti dai filtri.
 * * @param params Oggetto ProductSearchParams con i criteri di ricerca.
 * @returns Promise<ProductPageResponse> Oggetto contenente l'array di prodotti e i metadati di paginazione.
 */
export const getProducts = async (params: ProductSearchParams): Promise<ProductPageResponse> => {
    const query = buildQueryParams(params);
    const response = await fetch(`${URL_PRODUCTS}?${query}`);
    return handleResponse(response);
};