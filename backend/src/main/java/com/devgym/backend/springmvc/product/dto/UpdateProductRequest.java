package com.devgym.backend.springmvc.product.dto;

import lombok.Data;

import java.math.BigDecimal;

/**
 * mvc-01: Request DTO for PUT (full replace) and PATCH (partial update).
 * For PUT: all fields required.
 * For PATCH: only non-null fields are applied — no validation annotations needed here
 * since null means "leave unchanged".
 */
@Data
public class UpdateProductRequest {

    private String name;

    private String description;

    private BigDecimal price;

    private Integer stockQuantity;
}
