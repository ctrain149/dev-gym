package com.devgym.repository;

import com.devgym.model.Review;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

  // Find all reviews for a specific product
  @EntityGraph(attributePaths = {"product"})
  List<Review> findByProductId(Long productId);

  // Find reviews with rating >= threshold
  @Query("SELECT r FROM Review r WHERE r.product.id = :productId AND r.rating >= :minRating")
  List<Review> findByProductIdAndMinRating(@Param("productId") Long productId, @Param("minRating") Integer minRating);

  // Get average rating for a product
  @Query("SELECT AVG(r.rating) FROM Review r WHERE r.product.id = :productId")
  Double getAverageRatingByProductId(@Param("productId") Long productId);

  // Count reviews for a product
  Long countByProductId(Long productId);
}
