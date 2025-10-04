import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { CategoryList } from './components/categories/CategoryList.tsx'
import { ProductForm } from './components/products/ProductForm.tsx'
import { ProductList } from './components/products/ProductList.tsx'

/**
 * Punto di ingresso principale dell'applicazione React.
 * Configura il routing globale (React Router) 
 */ 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div style={{ padding: '20px' }}>
        <nav>
          <a href="/categories" style={{ marginRight: '15px' }}>Categorie</a>
          <a href="/products">Prodotti</a>
        </nav>
        <hr />
        <Routes>
          <Route path="/categories" element={<CategoryList />} />

          {/* Lista Prodotti con filtri */}
          <Route path="/products" element={<ProductList />} />

          {/* Form di Creazione */}
          <Route path="/products/create" element={<ProductForm />} />

          {/* Form di Modifica (legge l'ID dal path) */}
          <Route path="/products/edit/:id" element={<ProductForm />} />

          {/* Pagina di default */}
          <Route path="/" element={<ProductList />} />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>
)
