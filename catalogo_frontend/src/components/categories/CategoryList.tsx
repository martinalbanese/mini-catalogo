import { useState } from "react";
import { useGetAllCategories } from "../../hooks/categories/useGetAllCategories";
import { getAllCategories } from "../../api/categories/getAllCategories";
import { CategoryForm } from "./CategoryForm";
import type { CategoryType } from "../../types/CategoryType";

/**
 * Componente principale per la visualizzazione della lista Categorie.
 * Gestisce il caricamento iniziale, il ricaricamento dopo la creazione e la visualizzazione del form di creazione.
 */

export const CategoryList = () => {
    const {categories, loading, error} = useGetAllCategories();

    const [showForm, setShowForm] = useState(false);
   
    const [reloadedCategories, setReloadedCategories] = useState<CategoryType[] | null>(null);

    /** Ricarica l'elenco delle categorie dopo una mutazione. */
    const reloadCategories = async () => {
        try {
            const data = await getAllCategories();
            setReloadedCategories(data);
        } catch (err) {
            throw new Error('Errore nel caricamento delle categorie:' + (err as Error).message);
        }
    };

    if (loading) return <p>Caricamento categorie...</p>;
    if (error) return <p style={{ color: 'red' }}>Errore nel caricamento: {error}</p>;

    const listToDisplay = reloadedCategories || categories; 

    return (
        <div className="category-container">
            <h1 className="category-header">Lista Categorie</h1>

            {/* Lista Categorie */}
            {listToDisplay && listToDisplay.length > 0 ? (
                <ul className="category-list">
                    {listToDisplay.map((cat) => (
                        <li key={cat.id} style={{ padding: '5px 0' }}>
                            {cat.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nessuna categoria trovata. Creane una!</p>
            )}

            <hr style={{ margin: '20px 0' }}/>

            {/* Pulsante per mostrare/nascondere il Form */}
            <button 
                onClick={() => setShowForm(!showForm)} 
                className="category-form-toggle-btn"
                style={{
                    backgroundColor: showForm ? '#dc3545' : '#28a745', 
                    color: 'white',
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer'
                }}
            >
                {showForm ? 'Annulla' : 'Crea Nuova Categoria'}
            </button>

            {/* Form di Creazione */}
            {showForm && (
                <div className="create-form-container"> 
                    <CategoryForm 
                        onCategoryCreated={() => {
                            reloadCategories();
                            setShowForm(false);
                        }} 
                    />
                </div>
            )}
            
        </div>
    );
}