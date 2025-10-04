import { useState, useCallback, useEffect } from "react";
import { getProducts } from "../../api/products/getAllProducts";
import type { ProductSearchParams, ProductPageResponse } from "../../types/ProductType";

/**
 * Hook personalizzato per il recupero dei prodotti con supporto a filtri e paginazione.
 * La richiesta API viene eseguita automaticamente ogni volta che i parametri di ricerca cambiano.
 * @param initialParams Parametri di ricerca iniziali (search, sortBy, page, size, etc.).
 * @returns Contiene i dati della pagina, lo stato di caricamento, i parametri attuali e le funzioni per aggiornare i parametri (setParams) e ricaricare (refresh).
 */
export const useGetAllProducts = (initialParams: ProductSearchParams = {}) => {
    const [data, setData] = useState<ProductPageResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [params, setParams] = useState<ProductSearchParams>(initialParams);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await getProducts(params); 
            setData(result);
        } catch (err) {
            setError((err as Error).message);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [params]); 

    
    useEffect(() => {
        fetchData();
    }, [fetchData]); 

    
    const updateParamsAndFetch = useCallback((newParams: ProductSearchParams) => {
        setParams(prevParams => ({
            ...prevParams,
            ...newParams
        }));
    }, []);

    const refresh = () => fetchData();

    return { data, loading, error, params, setParams: updateParamsAndFetch, refresh };
};