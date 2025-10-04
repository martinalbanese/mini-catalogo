package com.example.catalogo_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.catalogo_backend.entities.Product;
import com.example.catalogo_backend.repositories.ProductRepository;
import com.example.catalogo_backend.specifications.ProductSpecifications;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepository;
	
	// --- CRUD BASE ---
	
	public Product createProduct(Product product) {
		return productRepository.save(product);
	}
	
	public Product getProductById(Long id) {
		return productRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Product not found with id " + id));
	}
	
	@Transactional
	public Product updateProduct(Long id, Product updatedProduct) {
		Product existingProduct = getProductById(id);
		
		existingProduct.setName(updatedProduct.getName());
		existingProduct.setPrice(updatedProduct.getPrice());
		existingProduct.setCategory(updatedProduct.getCategory());
		existingProduct.setTags(updatedProduct.getTags());
		
		return existingProduct;
	}
	
	public void deleteProduct(Long id) {
		if (!productRepository.existsById(id)) {
			throw new EntityNotFoundException("Product not found with id " + id);
		}
		productRepository.deleteById(id);
	}
	
	 // --- LISTING AVANZATO (Ricerca, Filtro, Ordinamento, Paginazione) ---
	
	public Page<Product> getAllProducts(
			String search,
			Long categoryId,
			Double minPrice,
			Double maxPrice,
			String sortBy,
			int page,
			int size
	) {
		Specification<Product> spec = ProductSpecifications.alwaysTrue();
		
		if (search != null && !search.isEmpty()) {
            spec = spec.and(ProductSpecifications.hasSearchTerm(search));
        }
        if (categoryId != null) {
            spec = spec.and(ProductSpecifications.hasCategory(categoryId));
        }
        if (minPrice != null) {
            spec = spec.and(ProductSpecifications.hasMinPrice(minPrice));
        }
        if (maxPrice != null) {
            spec = spec.and(ProductSpecifications.hasMaxPrice(maxPrice));
        }
        
        Sort sort = Sort.by(Sort.Direction.ASC, "id"); // Default sort by ID
        if ("price".equalsIgnoreCase(sortBy)) {
            sort = Sort.by(Sort.Direction.ASC, "price");
        } else if ("createdAt".equalsIgnoreCase(sortBy)) {
            sort = Sort.by(Sort.Direction.DESC, "createdAt");
        }
        
        PageRequest pageable = PageRequest.of(page, size, sort);
        return productRepository.findAll(spec, pageable);
	
	}

}
