package com.example.catalogo_backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.catalogo_backend.entities.Category;
import com.example.catalogo_backend.entities.Product;
import com.example.catalogo_backend.repositories.CategoryRepository;
import com.example.catalogo_backend.repositories.ProductRepository;

@Configuration
public class LoadDatabase {
	@Bean
	CommandLineRunner initDatabase(CategoryRepository categoryRepository, ProductRepository productRepository) {
		return args -> {
			productRepository.deleteAll();
			categoryRepository.deleteAll();
			
			Category electronics = categoryRepository.save(new Category(null, "Electronics"));
			Category books = categoryRepository.save(new Category(null, "Books"));
			Category clothing = categoryRepository.save(new Category(null, "Clothing"));
			
			Product laptop = new Product(null, "Laptop Pro X", 1299.99, electronics, "high-end, portable", null);
			Product mouse = new Product(null, "Wireless Mouse", 25.50, electronics, "accessory, input", null);
			
			Product novel = new Product(null, "Sci-Fi Novel", 15.00, books, "fiction, bestseller", null);
			Product cookbook = new Product(null, "Italian Cookbook", 35.99, books, "recipes, cooking", null);
			
			Product tShirt = new Product(null, "Cotton T-Shirt", 19.90, clothing, "basic, men", null);
			
			productRepository.save(laptop);
			productRepository.save(mouse);
			productRepository.save(novel);
			productRepository.save(cookbook);
			productRepository.save(tShirt);
			
			System.out.println("Database popolato con 3 Categorie e 5 Prodotti.");
		};
	}

}
