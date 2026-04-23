package com.devgym.backend.springmvc.catalog;

import java.math.BigDecimal;

/**
 * mvc-05: Interface-based projection.
 * Spring Data JPA will generate a proxy implementation automatically.
 * Returning this interface from a repository method returns only name + price
 * in a single optimized SELECT — no other columns fetched.
 *
 * Usage in repository:
 *   List<ProductSummary> findByPriceLessThan(BigDecimal maxPrice);
 */
public interface ProductSummary {

    String getName();

    BigDecimal getPrice();
}
