package com.example.catalogo_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.example.catalogo_backend.entities.Product;

/**
 * Repository per l'entità Product.
 * Estende JpaSpecificationExecutor per consentire query dinamiche avanzate (filtri).
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product>{

}
