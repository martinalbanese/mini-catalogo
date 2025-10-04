package com.example.catalogo_backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.catalogo_backend.entities.Category;
import com.example.catalogo_backend.services.CategoryService;

/**
 * Controller REST per la gestione dell'entità Category.
 * Espone endpoint per listare e creare nuove categorie.
 */

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
	@Autowired
	private CategoryService categoryService;
	
	/**
     * Recupera l'elenco completo di tutte le categorie.
     * @return Lista di oggetti Category.
     */
	@GetMapping
	public List<Category> getAllCategories() {
		return categoryService.getAllCategories();
	}
	
	/**
     * Crea una nuova categoria.
     * @param category Dati della categoria da creare (ricevuti nel corpo della richiesta JSON).
     * @return La categoria creata con l'ID assegnato.
     */
	@PostMapping
	public Category createCategory(@RequestBody Category category) {
		return categoryService.createCategory(category);
	}
}
