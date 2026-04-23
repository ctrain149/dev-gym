package com.devgym.backend.springmvc.product;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * mvc-01: JPA entity for the Product resource.
 * TODO: Add proper JPA annotations (@Entity, @Table, @Id, @GeneratedValue, @Column)
 * TODO: Add validation annotations from jakarta.validation.constraints
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // TODO: Add @Column(nullable = false) and validation annotations
    private String name;

    private String description;

    // TODO: Add @Column(nullable = false) precision/scale for money
    private BigDecimal price;

    private Integer stockQuantity;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
