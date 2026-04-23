package com.devgym.backend.springmvc.catalog;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
/**
 * mvc-04: Parent entity in a @OneToMany relationship.
 *
 * TODO: Add proper @OneToMany annotation.
 *   - mappedBy = "category" (the field name on the Product side)
 *   - fetch = FetchType.LAZY  (always prefer lazy on collections)
 *   - cascade = CascadeType.ALL (deleting a category deletes its products)
 *   - orphanRemoval = true
 */
@Data
@NoArgsConstructor
@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    // TODO: Replace @Transient with the proper @OneToMany annotation
    @Transient
    private List<Product> products = new ArrayList<>();
}
