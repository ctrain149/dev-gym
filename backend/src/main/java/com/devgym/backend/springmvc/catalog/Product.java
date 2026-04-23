package com.devgym.backend.springmvc.catalog;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * mvc-04: Product entity in the catalog package (separate from springmvc.product).
 * Demonstrates bidirectional @ManyToOne / @OneToMany relationships.
 *
 * TODO: Add @ManyToOne to the category field.
 * TODO: Add @OneToMany to the reviews field (mappedBy = "product", fetch = LAZY).
 * TODO: Enable SQL logging and demonstrate the N+1 problem, then fix with JOIN FETCH.
 */
@Data
@NoArgsConstructor
@Entity
@Table(name = "catalog_products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private BigDecimal price;

    // TODO: Replace @Transient with @ManyToOne(fetch = FetchType.LAZY) + @JoinColumn(name = "category_id")
    @Transient
    private Category category;

    // TODO: Replace @Transient with @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Transient
    private List<Review> reviews = new ArrayList<>();
}
