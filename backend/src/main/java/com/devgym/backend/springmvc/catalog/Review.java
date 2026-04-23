package com.devgym.backend.springmvc.catalog;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * mvc-04: Child entity in @ManyToOne relationship with Product.
 *
 * TODO: Add @ManyToOne(fetch = FetchType.LAZY) on the product field.
 * TODO: Add @JoinColumn(name = "product_id", nullable = false).
 */
@Data
@NoArgsConstructor
@Entity
@Table(name = "catalog_reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private String body;

    @Column(nullable = false)
    private int rating; // 1-5

    // TODO: Add @ManyToOne annotation
    // TODO: Add @JoinColumn annotation
    private Product product;
}
