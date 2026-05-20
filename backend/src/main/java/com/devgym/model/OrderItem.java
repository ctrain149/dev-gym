package com.devgym.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@Entity
@Table(name = "order_items")
public class OrderItem {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "product_id", nullable = false)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Product product;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "order_id", nullable = false)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Order order;

  @NotNull
  @Min(1)
  @Column(nullable = false)
  private Integer quantity;

  @NotNull
  @Column(nullable = false, precision = 19, scale = 2)
  private BigDecimal unitPrice;

  @Column(precision = 19, scale = 2)
  private BigDecimal discount;

  @Column(nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @PrePersist
  protected void onCreate() {
    createdAt = LocalDateTime.now();
  }

  // Helper to calculate total
  public BigDecimal getTotal() {
    BigDecimal base = unitPrice.multiply(BigDecimal.valueOf(quantity));
    return discount != null ? base.subtract(discount) : base;
  }
}
