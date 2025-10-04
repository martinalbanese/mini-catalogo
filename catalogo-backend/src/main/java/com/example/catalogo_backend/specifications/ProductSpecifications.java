package com.example.catalogo_backend.specifications;

import org.springframework.data.jpa.domain.Specification;

import com.example.catalogo_backend.entities.Product;

import jakarta.persistence.criteria.JoinType;

public class ProductSpecifications {
	
	public static Specification<Product> alwaysTrue() {
        return (root, query, criteriaBuilder) -> criteriaBuilder.conjunction();
    }

    public static Specification<Product> hasSearchTerm(String searchTerm) {
    	String likePattern = "%" + searchTerm.toLowerCase() + "%";
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), likePattern),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("tags")), likePattern)
                );
    }

    public static Specification<Product> hasCategory(Long categoryId) {
    	return (root, query, criteriaBuilder) ->
        criteriaBuilder.equal(root.join("category", JoinType.INNER).get("id"), categoryId);
    }
    
    public static Specification<Product> hasMinPrice(Double minPrice) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice);
    }

    public static Specification<Product> hasMaxPrice(Double maxPrice) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice);
    }

}
