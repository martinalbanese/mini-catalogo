package com.example.catalogo_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.catalogo_backend.entities.Category;
/**
 * Repository per l'entità Category, fornisce i metodi CRUD standard.
 */
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

}
