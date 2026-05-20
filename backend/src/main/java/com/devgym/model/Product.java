
package com.devgym.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.BatchSize;

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

  // One Product can have many Reviews
  @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
  @BatchSize(size = 20)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private List<Review> reviews = new ArrayList<>();

  // One Product can have many Images
  @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
  @BatchSize(size = 20)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private List<ProductImage> images = new ArrayList<>();

  // One Product can be in many OrderItems
  @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
  @BatchSize(size = 20)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private List<OrderItem> orderItems = new ArrayList<>();

  // Helper methods for bidirectional relationship management
  public void addReview(Review review) {
    reviews.add(review);
    review.setProduct(this);
  }

  public void removeReview(Review review) {
    reviews.remove(review);
    review.setProduct(null);
  }

  public void addImage(ProductImage image) {
    images.add(image);
    image.setProduct(this);
  }

  public void removeImage(ProductImage image) {
    images.remove(image);
    image.setProduct(null);
  }
}