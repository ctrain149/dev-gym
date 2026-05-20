package com.devgym.repository;

import com.devgym.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {

  // Find all images for a product, ordered by display order
  List<ProductImage> findByProductIdOrderByDisplayOrderAsc(Long productId);

  // Find the primary image for a product
  Optional<ProductImage> findFirstByProductIdAndIsPrimaryTrue(Long productId);

  // Find only primary images
  List<ProductImage> findByIsPrimaryTrue();
}
