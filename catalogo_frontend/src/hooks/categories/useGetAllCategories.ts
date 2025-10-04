import { useEffect, useState } from "react";
import type { CategoryType } from "../../types/CategoryType";
import { getAllCategories } from "../../api/categories/getAllCategories";

/**
 * Hook personalizzato per recuperare tutte le categorie disponibili.
 * Esegue il fetch una sola volta al montaggio del componente.
 * @returns Contiene l'array di categorie, lo stato di caricamento e gli errori.
 */
export const useGetAllCategories = () => {
    const [categories, setCategories] = useState<CategoryType[] | null>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const data = await getAllCategories();
                setCategories(data);
                setError(null);
            } catch (err) {
                setError((err as Error).message);
                setCategories(null);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
}