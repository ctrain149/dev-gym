package com.devgym.backend.springmvc.product.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * mvc-01 / mvc-03: Response DTO — never expose JPA entities directly.
 * TODO (mvc-03): Add @JsonInclude(JsonInclude.Include.NON_NULL) to omit null fields.
 * TODO (mvc-03): Add @JsonFormat for createdAt and updatedAt.
 * TODO (mvc-14): Add @Schema annotations for OpenAPI docs.
 */
@Data
@Builder
public class ProductResponse {

    private Long id;

    private String name;

    private String description;

    private BigDecimal price;

    private Integer stockQuantity;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // TODO (mvc-03): Add custom @JsonProperty for any field names you want different in JSON
}
