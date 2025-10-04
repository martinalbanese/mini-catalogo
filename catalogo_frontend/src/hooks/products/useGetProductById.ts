import { useState, useEffect } from "react";
import { getProductById } from "../../api/products/getProductById";
import type { ProductType } from "../../types/ProductType";

/**
 * Hook personalizzato per recuperare un singolo prodotto tramite il suo ID.
 * @param id L'ID numerico del prodotto da caricare (se 0 o null non esegue il fetch).
 * @returns Contiene l'oggetto prodotto, lo stato di caricamento e gli errori.
 */
export const useGetProductById = (id: number) => {
    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    return { product, loading, error };
};
