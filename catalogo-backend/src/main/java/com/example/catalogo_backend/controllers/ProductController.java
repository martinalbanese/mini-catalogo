package com.example.catalogo_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.catalogo_backend.entities.Product;
import com.example.catalogo_backend.services.ProductService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	// --- LIST (con Filtri e Paginazione) ---
	@GetMapping
	 public Page<Product> getAllProducts(
	            @RequestParam(required = false) String search,
	            @RequestParam(required = false) Long categoryId,
	            @RequestParam(required = false) Double minPrice,
	            @RequestParam(required = false) Double maxPrice,
	            @RequestParam(defaultValue = "id") String sortBy,
	            @RequestParam(defaultValue = "0") int page,
	            @RequestParam(defaultValue = "20") int size) {
	        
	        return productService.getAllProducts(search, categoryId, minPrice, maxPrice, sortBy, page, size);
	}
	
	// --- GET by ID ---
	@GetMapping("/{id}")
	public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        try {
            Product product = productService.getProductById(id);
            return ResponseEntity.ok(product);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
	
	// --- CREATE ---
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        // Validazione: price >= 0
        if (product.getPrice() < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Il prezzo non può essere negativo.");
        }
        // Validazione: name obbligatorio .
        if (product.getName() == null || product.getName().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Il nome è obbligatorio.");
        }
        
        Product createdProduct = productService.createProduct(product);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    // --- UPDATE ---
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        // Validazione: price >= 0
        if (productDetails.getPrice() < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Il prezzo non può essere negativo.");
        }
        
        try {
            Product updatedProduct = productService.updateProduct(id, productDetails);
            return ResponseEntity.ok(updatedProduct);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    // --- DELETE ---
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Impossibile eliminare il prodotto. ID non trovato.");
        }
    }

}
