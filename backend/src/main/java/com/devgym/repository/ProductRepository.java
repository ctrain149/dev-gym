package com.devgym.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.repository.query.Param;

import com.devgym.model.Product;

import java.util.List;
import java.util.Optional;

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

    // Fetch product with all its reviews (solves N+1 problem)
    @EntityGraph(attributePaths = {"reviews"})
    Optional<Product> findWithReviewsById(Long id);

    // Fetch product with all its images
    @EntityGraph(attributePaths = {"images"})
    Optional<Product> findWithImagesById(Long id);

    // Fetch product with reviews and images together
    @EntityGraph(attributePaths = {"reviews", "images"})
    Optional<Product> findWithDetailsById(Long id);

    // Find products with average rating above threshold
    @Query("SELECT p FROM Product p LEFT JOIN p.reviews r GROUP BY p HAVING AVG(r.rating) >= :minRating")
    List<Product> findByMinAverageRating(@Param("minRating") Double minRating);
}
