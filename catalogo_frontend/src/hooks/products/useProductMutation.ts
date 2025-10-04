import { useState } from "react";
import { deleteProduct } from "../../api/products/deleteProduct";
import type { ProductType } from "../../types/ProductType";
import { postCreateProduct } from "../../api/products/postCreateProduct";
import { putUpdateProduct } from "../../api/products/putUpdateProduct";

/**
 * Hook centralizzato per le operazioni di mutazione (CREATE, UPDATE, DELETE) dei prodotti.
 * Fornisce un'unica interfaccia per la gestione dello stato di caricamento e degli errori per tutte le operazioni CRUD.
 * @returns Contiene le funzioni create, update e remove, oltre agli stati di loading ed error.
 */
export const useProductMutation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = async <T extends 'create' | 'update' | 'delete'>(
        operation: T, 
        idOrProduct: T extends 'delete' ? number : ProductType, 
        id?: number
    ): Promise<ProductType | void> => {
        setLoading(true);
        setError(null);

        try {
            let result: ProductType | void;
            
            if (operation === 'create') {
                result = await postCreateProduct(idOrProduct as ProductType);
            } else if (operation === 'update' && id) {
                result = await putUpdateProduct(id, idOrProduct as ProductType);
            } else if (operation === 'delete') {
                await deleteProduct(idOrProduct as number);
                result = undefined;
            } else {
                throw new Error("Operazione non valida o ID mancante per l'aggiornamento.");
            }
            return result;
        } catch (err) {
            setError((err as Error).message);
            throw err; 
        } finally {
            setLoading(false);
        }
    };

    const create = (product: ProductType) => mutate('create', product);
    const update = (id: number, product: ProductType) => mutate('update', product, id);
    const remove = (id: number) => mutate('delete', id);
    
    return { loading, error, create, update, remove };
};