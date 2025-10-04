import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useGetAllProducts } from '../../hooks/products/useGetAllProducts';
import { useProductMutation } from '../../hooks/products/useProductMutation';
import type { ProductSearchParams } from '../../types/ProductType';
import { useGetAllCategories } from '../../hooks/categories/useGetAllCategories';

/**
 * Componente principale per la visualizzazione della lista Prodotti.
 * Implementa i filtri (ricerca, categoria, prezzo min/max), l'ordinamento e la paginazione.
 * Gestisce la navigazione per la creazione/modifica e l'eliminazione dei prodotti.
 */

const INITIAL_PARAMS: ProductSearchParams = {
    search: '',
    sortBy: 'createdAt',
    page: 0,
    size: 5
};

export const ProductList: React.FC = () => {
    const navigate = useNavigate();

    const { data, loading, error, params, setParams, refresh } = useGetAllProducts(INITIAL_PARAMS);
    const { categories, loading: loadingCategories } = useGetAllCategories();
    const { remove, loading: deleting } = useProductMutation();

    const [searchTerm, setSearchTerm] = useState(params.search || '');
    const [minPrice, setMinPrice] = useState<string>(params.minPrice?.toString() || '');
    const [maxPrice, setMaxPrice] = useState<string>(params.maxPrice?.toString() || '');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>(params.categoryId?.toString() || '');

    // Funzione per applicare tutti i filtri e aggiornare la query
    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newMinPrice = minPrice ? parseFloat(minPrice) : undefined;
        const newMaxPrice = maxPrice ? parseFloat(maxPrice) : undefined;
        const newCategoryId = selectedCategoryId ? parseInt(selectedCategoryId) : undefined;

        setParams({
            search: searchTerm,
            minPrice: newMinPrice,
            maxPrice: newMaxPrice,
            categoryId: newCategoryId,
            page: 0
        });
    };

    // Funzione per il cambio di ordinamento
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setParams({ sortBy: e.target.value as ProductSearchParams['sortBy'], page: 0 });
    };

    // Funzioni per la paginazione
    const goToPage = (page: number) => {
        setParams({ page });
    };

    // Funzione per l'eliminazione di un prodotto
    const handleDelete = async (id: number) => {
        if (!window.confirm(`Sei sicuro di voler eliminare il prodotto ID ${id}?`)) return;

        try {
            await remove(id);
            alert('Prodotto eliminato con successo!');
            refresh();
        } catch (e) {
            alert(`Errore durante l'eliminazione: ${(e as Error).message}`);
        }
    };

    if (loading && !data) return <p>Caricamento prodotti...</p>;
    if (error) return <p className="product-list-container" style={{ color: 'red' }}>Errore: {error}</p>;
    if (!data) return <p className="product-list-container">Nessun dato prodotto disponibile.</p>;
    if (loadingCategories) return <p>Caricamento filtri...</p>;

    const { content, totalPages, number: currentPage } = data;

    return (
        <div className="product-list-container">
            <h1>Catalogo Prodotti</h1>
            <button
                className="btn-primary"
                onClick={() => navigate('/products/create')}>
                Aggiungi Nuovo Prodotto
            </button>

            {/* --- Sezione Filtri e Ricerca --- */}
            <form onSubmit={handleFilterSubmit} className="filters-area">

                {/* 1. Ricerca Testuale (Nome/Tag) */}
                <input
                    type="text"
                    placeholder="Nome/Tag"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* 2. Filtro Categoria */}
                <select
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}>
                    <option value="">Tutte le Categorie</option>
                    {categories && categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>

                {/* 3. Filtro Prezzo Minimo */}
                <input
                    type="number"
                    placeholder="Min €"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    min="0"
                />

                {/* 4. Filtro Prezzo Massimo */}
                <input
                    type="number"
                    placeholder="Max €"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    min="0"
                />

                <button type="submit" className="btn-filter-apply">Applica</button>
                <button
                    type="button"
                    onClick={() => {

                        setSearchTerm(''); setMinPrice(''); setMaxPrice(''); setSelectedCategoryId('');
                        setParams({ page: 0, sortBy: params.sortBy });
                    }}
                    className="btn-filter-reset">
                    Reset
                </button>
            </form>

            {/* --- Ordinamento --- */}
            <div className='sorting-area' style={{ marginBottom: '20px' }}>
                <label>
                    Ordina per:
                    <select value={params.sortBy} onChange={handleSortChange}>
                        <option value="createdAt">Data Creazione</option>
                        <option value="price">Prezzo</option>
                    </select>
                </label>
            </div>

            {/* --- Lista Prodotti --- */}
            <div className="product-items">
                {content.length > 0 ? (
                    content.map(product => (
                        <div key={product.id} className="product-card">
                            <h3>{product.name} - ${product.price.toFixed(2)}</h3>
                            <p>Categoria: {product.category.name}</p>
                            <p>Tags: {product.tags}</p>
                            <button
                                className="btn-edit"
                                onClick={() => navigate(`/products/edit/${product.id}`)}>
                                Modifica
                            </button>
                            <button
                                className="btn-delete"
                                disabled={deleting}
                                onClick={() => handleDelete(product.id!)}>
                                {deleting ? 'Eliminazione...' : 'Elimina'}
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Nessun prodotto trovato con i filtri attuali.</p>
                )}
            </div>

            {/* --- Paginazione --- */}
            <div className="pagination">
                <button className='btn-pagination' disabled={data.first} onClick={() => goToPage(currentPage - 1)}>
                    Precedente
                </button>
                <span style={{ margin: '0 10px' }}>Pagina {currentPage + 1} di {totalPages}</span>
                <button className='btn-pagination' disabled={data.last} onClick={() => goToPage(currentPage + 1)}>
                    Successiva
                </button>
            </div>

            
        </div>
    );
};

