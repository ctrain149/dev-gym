package com.devgym.frontend.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * tmvc-04 / tmvc-05: Spring Data JPA repository.
 *
 * TODO: Add derived query methods:
 *   - findByNameContainingIgnoreCase(String keyword)         — search by name
 *   - findByPriceLessThanEqual(BigDecimal maxPrice)          — filter by price
 *   - findByStockQuantityGreaterThan(int minStock)            — in-stock filter
 *   - findAllByOrderByCreatedAtDesc(Pageable pageable)       — sorted + paged
 */
public interface ProductRepository extends JpaRepository<Product, Long> {

    // TODO: Add search and filter methods here
    List<Product> findByNameContainingIgnoreCase(String keyword);

    Page<Product> findAll(Pageable pageable);
}
