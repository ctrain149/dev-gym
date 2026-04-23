package com.devgym.backend.springmvc.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

/**
 * mvc-01 / mvc-05: Product repository.
 * TODO (mvc-05): Add derived query methods, @Query JPQL, @Query native, and pagination.
 *
 * Examples to implement:
 *   findByNameContainingIgnoreCase(String name)
 *   existsByName(String name)
 *   findByPriceBetween(BigDecimal min, BigDecimal max, Pageable pageable)
 *   @Query JPQL for low-stock products
 *   @Query native SQL for products by category name
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // TODO (mvc-05): Add derived query methods here

    // TODO (mvc-05): Add JPQL query
    // @Query("SELECT p FROM Product p WHERE p.price BETWEEN :min AND :max")
    // Page<ProductSummary> findByPriceRange(@Param("min") BigDecimal min, @Param("max") BigDecimal max, Pageable pageable);

    // TODO (mvc-05): Add native SQL query
    // @Query(value = "SELECT * FROM products WHERE stock_quantity < :threshold", nativeQuery = true)
    // List<Product> findLowStock(@Param("threshold") int threshold);
}
