package com.devgym.backend.springmvc.product.dto;

import lombok.Data;

import java.math.BigDecimal;

/**
 * mvc-01 / mvc-02: Request DTO for creating a product.
 * TODO (mvc-02): Add Bean Validation annotations:
 *   @NotBlank on name
 *   @NotNull @DecimalMin("0.01") on price
 *   @NotNull @Min(0) on stockQuantity
 *   @Size(max = 1000) on description
 */
@Data
public class CreateProductRequest {

    // TODO: Add @NotBlank(message = "Name is required")
    private String name;

    // TODO: Add @Size(max = 1000)
    private String description;

    // TODO: Add @NotNull @DecimalMin(value = "0.01", message = "Price must be positive")
    private BigDecimal price;

    // TODO: Add @NotNull @Min(0)
    private Integer stockQuantity;
}
