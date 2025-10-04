import { useState } from "react";
import { usePostCreateCategories } from "../../hooks/categories/usePostCreateCategories";

/**
 * Componente per il form di creazione di una nuova Categoria.
 * Utilizza l'hook usePostCreateCategories per inviare i dati al backend.
 * * @param onCategoryCreated Funzione di callback eseguita dopo la creazione di successo.
 */

interface CategoryFormProps {
    onCategoryCreated: () => void;
}

export const CategoryForm = ({onCategoryCreated}: CategoryFormProps) => {
    const [categoryName, setCategoryName] = useState('');
    const { createCategory, loading, error, success } = usePostCreateCategories();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!categoryName.trim()) {
            alert('Il nome della categoria non può essere vuoto.');
            return;
        } 

        const newCategory = { name: categoryName };

        await createCategory(newCategory);

        if (success) {
            setCategoryName('');
            onCategoryCreated();
        }
    };

    return (
        <div className="category-form" style={{padding: '15px', marginBottom: '20px' }}>
            <h2>Crea Nuova Categoria</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome Categoria"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    disabled={loading}
                />
                <button type="submit" disabled={loading} style={{ marginLeft: '10px' }}>
                    {loading ? 'Creazione...' : 'Crea Categoria'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>Errore: {error}</p>}
            {success && <p style={{ color: 'green' }}>Categoria creata con successo!</p>}
        </div>
    );
}