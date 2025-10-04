import { useState } from "react";
import type { CategoryType } from "../../types/CategoryType";
import { postCreateCategories } from "../../api/categories/postCreateCategories";

/**
 * Hook personalizzato per la creazione di una nuova categoria.
 * @returns Contiene la funzione di creazione (createCategory), lo stato di caricamento, l'errore e lo stato di successo.
 */
export const usePostCreateCategories = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const createCategory = async (category: CategoryType) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await postCreateCategories(category);
            setSuccess(true);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return { createCategory, loading, error, success };
}