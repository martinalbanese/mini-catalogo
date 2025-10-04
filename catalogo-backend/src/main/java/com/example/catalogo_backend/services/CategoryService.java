package com.example.catalogo_backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.catalogo_backend.entities.Category;
import com.example.catalogo_backend.repositories.CategoryRepository;

/**
 * Service layer per la gestione della logica di business relativa alle Categorie.
 * Interagisce con CategoryRepository.
 */
@Service
public class CategoryService {
	@Autowired
	private CategoryRepository categoryRepository;
	
	public List<Category> getAllCategories() {
		return categoryRepository.findAll();
	}
	
	public Category createCategory(Category category) {
		return categoryRepository.save(category);
	}

}
