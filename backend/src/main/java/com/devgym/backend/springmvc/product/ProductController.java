package com.devgym.backend.springmvc.product;

import com.devgym.backend.springmvc.product.dto.CreateProductRequest;
import com.devgym.backend.springmvc.product.dto.ProductResponse;
import com.devgym.backend.springmvc.product.dto.UpdateProductRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

/**
 * mvc-01: RESTful Product controller.
 *
 * TODO: Add @Valid to @RequestBody parameters (mvc-02)
 * TODO: Add @Operation, @ApiResponse, @Parameter annotations (mvc-14)
 * TODO: Add @SecurityRequirement(name = "bearerAuth") to write endpoints (mvc-14)
 *
 * All endpoints versioned under /api/v1/products.
 */
@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    // GET /api/v1/products?page=0&size=10&sort=name,asc
    @GetMapping
    public ResponseEntity<Page<ProductResponse>> getAllProducts(Pageable pageable) {
        // TODO: Return 200 OK with paginated results
        throw new UnsupportedOperationException("Not yet implemented — mvc-01");
    }

    // GET /api/v1/products/{id}
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getById(@PathVariable Long id) {
        // TODO: Return 200 OK or let GlobalExceptionHandler return 404
        throw new UnsupportedOperationException("Not yet implemented — mvc-01");
    }

    // POST /api/v1/products  → 201 Created with Location header
    @PostMapping
    public ResponseEntity<ProductResponse> create(@RequestBody CreateProductRequest request) {
        // TODO: Add @Valid to request parameter
        // TODO: Build Location URI using ServletUriComponentsBuilder
        // URI location = ServletUriComponentsBuilder.fromCurrentRequest()
        //     .path("/{id}").buildAndExpand(created.getId()).toUri();
        // return ResponseEntity.created(location).body(created);
        throw new UnsupportedOperationException("Not yet implemented — mvc-01");
    }

    // PUT /api/v1/products/{id}  → full replace → 200 OK
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> update(@PathVariable Long id,
                                                   @RequestBody UpdateProductRequest request) {
        // TODO: Add @Valid to request parameter
        throw new UnsupportedOperationException("Not yet implemented — mvc-01");
    }

    // PATCH /api/v1/products/{id}  → partial update → 200 OK
    @PatchMapping("/{id}")
    public ResponseEntity<ProductResponse> patch(@PathVariable Long id,
                                                  @RequestBody UpdateProductRequest request) {
        throw new UnsupportedOperationException("Not yet implemented — mvc-01");
    }

    // DELETE /api/v1/products/{id}  → 204 No Content
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        // TODO: Call service.delete(id) and return ResponseEntity.noContent().build()
        throw new UnsupportedOperationException("Not yet implemented — mvc-01");
    }
}
