import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router'; // Importa useParams
import { useGetProductById } from '../../hooks/products/useGetProductById';
import { useProductMutation } from '../../hooks/products/useProductMutation';
import type { ProductType } from '../../types/ProductType';
import { useGetAllCategories } from '../../hooks/categories/useGetAllCategories';

/**
 * Componente per il form di Creazione/Modifica di un Prodotto.
 * Utilizza React Router (useParams) per determinare la modalità (Crea o Modifica).
 * Carica dinamicamente le categorie per popolare la select (FK validation).
 */

const EMPTY_PRODUCT: ProductType = {
    name: '',
    price: 0,
    tags: '',
    category: { id: undefined as unknown as number }
};

export const ProductForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const productId = id ? parseInt(id) : undefined;
    const isEdit = !!productId;

    const { categories, loading: loadingCategories } = useGetAllCategories();
    const { product: existingProduct, loading: loadingProduct, error: productError } = useGetProductById(productId || 0);
    const { loading: loadingMutation, error: mutationError, create, update } = useProductMutation();

    const [formData, setFormData] = useState<ProductType>(EMPTY_PRODUCT);

    useEffect(() => {
        if (isEdit && existingProduct) {
            setFormData(existingProduct);
        } else if (!isEdit) {
            setFormData(EMPTY_PRODUCT);
        }
    }, [isEdit, existingProduct]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'price') {
            setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
        } else if (name === 'category') {
            setFormData(prev => ({ ...prev, category: { id: parseInt(value) } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.category.id || formData.category.id <= 0) {
            alert('Devi selezionare una categoria valida.');
            return;
        }

        try {
            if (isEdit && productId) {
                await update(productId, formData);
                alert('Prodotto aggiornato con successo!');
            } else {
                await create(formData);
                alert('Prodotto creato con successo!');
            }
            navigate('/products');
        } catch (e) {
            console.error('Errore nella mutazione del prodotto:', e);
        }
    };

    useEffect(() => {
        if (isEdit && existingProduct) {
            const categoryId = (existingProduct.category as { id: number }).id;
            setFormData({ ...existingProduct, category: { id: categoryId } });
        } else if (!isEdit) {
            setFormData(EMPTY_PRODUCT);
        }
    }, [isEdit, existingProduct]);


    if (loadingProduct || loadingCategories) return <p>Caricamento dati...</p>;
    if (productError) return <p className="product-form-container" style={{ color: 'red' }}>Errore nel caricamento: {productError}</p>;

    const submitError = mutationError;
    const isSubmitting = loadingMutation;

    return (
        <div className="product-form-container">
            <h1>{isEdit ? `Modifica Prodotto: ${formData.name}` : 'Crea Nuovo Prodotto'}</h1>
            {submitError && <p style={{ color: 'red' }}>Errore: {submitError}</p>}

            <form onSubmit={handleSubmit}>
                <label>Nome:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Prezzo:</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} min="0" required />

                <label>Categoria:</label>
                <select
                    name="category"

                    value={formData.category.id ? String(formData.category.id) : "0"}
                    onChange={handleChange}
                    required>
                    <option value="0" disabled>Seleziona Categoria</option>


                    {categories && categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <label>Tags (separati da virgole):</label>
                <input type="text" name="tags" value={formData.tags || ''} onChange={handleChange} />

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Salvataggio...' : (isEdit ? 'Aggiorna Prodotto' : 'Crea Prodotto')}
                </button>
            </form>
        </div>
    );
};