package com.devgym.repository;

import com.devgym.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
  // JPQL query to search products by name (case-insensitive, partial match)
    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', ?1, '%'))")
    List<Product> findByName(String name);

  // JPQL query to find products above a given price
    @Query("SELECT p FROM Product p WHERE p.price > ?1")
    List<Product> findByPriceAbove(Double price);

  // JPQL query to get the total count of in-stock products
    @Query("SELECT COUNT(p) FROM Product p WHERE p.stock > 0")
    Long countInStock();
}
