/**
 * Modulo di utility per la gestione delle richieste API e la costruzione dei parametri di query.
 */
import type { ProductSearchParams } from "../../types/ProductType";

/**
 * Costruisce la stringa di query URL dai parametri di ricerca forniti.
 * Filtra i valori nulli o indefiniti.
 * * @param params Oggetto con i parametri ProductSearchParams.
 * @returns string Stringa di query (es. "search=value&page=0").
 */
export const buildQueryParams = (params: ProductSearchParams) => {
    const query = new URLSearchParams();
    
    // Aggiunge i parametri non nulli all'URL
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            query.append(key, String(value));
        }
    });
    return query.toString();
};


/**
 * Gestisce la risposta HTTP, lanciando un errore significativo se lo stato non è 'ok'.
 * Tenta di estrarre messaggi di errore JSON dal backend.
 * * @param response Oggetto Response standard di Fetch.
 * @returns Promise<any> Il corpo JSON della risposta.
 */
export const handleResponse = async (response: Response) => {
    if (!response.ok) {
        // Tenta di leggere il corpo dell'errore (Spring StatusException)
        const errorBody = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(`[${response.status}] Errore API: ${errorBody.message || 'Errore sconosciuto'}`);
    }
    return response.json();
};