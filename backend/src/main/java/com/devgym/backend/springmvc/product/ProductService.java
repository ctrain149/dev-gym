package com.devgym.backend.springmvc.product;

import com.devgym.backend.springmvc.product.dto.CreateProductRequest;
import com.devgym.backend.springmvc.product.dto.ProductResponse;
import com.devgym.backend.springmvc.product.dto.UpdateProductRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * mvc-01: Service layer for Product CRUD.
 * mvc-07: Add @PreAuthorize annotations for role-based access.
 *
 * TODO: Implement all methods below.
 * TODO (mvc-07): Annotate write methods with @PreAuthorize("hasRole('ADMIN')")
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;

    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        // TODO: Return paginated products mapped to ProductResponse
        throw new UnsupportedOperationException("Not yet implemented — start here for mvc-01");
    }

    public ProductResponse getById(Long id) {
        // TODO: Find by ID or throw ResourceNotFoundException
        throw new UnsupportedOperationException("Not yet implemented — mvc-01");
    }

    @Transactional
    public ProductResponse create(CreateProductRequest request) {
        // TODO: Map request to entity, save, return response DTO
        throw new UnsupportedOperationException("Not yet implemented — mvc-01");
    }

    @Transactional
    public ProductResponse update(Long id, UpdateProductRequest request) {
        // TODO: Find entity, apply all fields from request, save
        throw new UnsupportedOperationException("Not yet implemented — mvc-01");
    }

    @Transactional
    public ProductResponse patch(Long id, UpdateProductRequest request) {
        // TODO: Find entity, apply only non-null fields from request, save
        throw new UnsupportedOperationException("Not yet implemented — mvc-01");
    }

    @Transactional
    public void delete(Long id) {
        // TODO: Find entity (throw 404 if missing) then delete
        throw new UnsupportedOperationException("Not yet implemented — mvc-01");
    }
}
