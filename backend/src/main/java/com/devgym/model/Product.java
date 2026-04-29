
package com.devgym.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import java.time.LocalDateTime;
import lombok.Data;

@Data
@Entity
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Column(nullable = false)
  private String name;

  private String description;

  @NotNull
  @DecimalMin("0.00")
  @Column(nullable = false)
  private Double price;

  @Min(0)
  private Integer stock;

  private String imageUrl;

  @NotBlank
  private String category;

  private Boolean active;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;
}