package com.devgym.frontend.product;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * tmvc-04: JPA entity for the Thymeleaf product catalog.
 *
 * TODO: Add @Column annotations with appropriate constraints.
 * TODO: Add @PrePersist to set createdAt automatically.
 */
@Data
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // TODO: Add @Column(nullable = false, length = 100)
    @NotBlank(message = "Name is required")
    private String name;

    // TODO: Add @Column(columnDefinition = "TEXT")
    private String description;

    // TODO: Add @Column(nullable = false, precision = 10, scale = 2)
    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private BigDecimal price;

    private int stockQuantity;

    private LocalDateTime createdAt;

    // TODO: @PrePersist
    // public void prePersist() { this.createdAt = LocalDateTime.now(); }
}
