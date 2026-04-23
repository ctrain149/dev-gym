package com.devgym.backend.springmvc.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

/**
 * mvc-14: OpenAPI / Swagger UI configuration.
 *
 * After adding this:
 *   - Swagger UI → http://localhost:8080/swagger-ui.html
 *   - OpenAPI JSON → http://localhost:8080/api-docs
 *
 * TODO: Visit /swagger-ui.html and verify:
 *   1. All Product endpoints are visible with descriptions
 *   2. The "Authorize" button appears (lock icon)
 *   3. Pasting a JWT into the dialog sends "Authorization: Bearer <token>"
 *
 * TODO: Annotate ProductController methods with:
 *   @Operation(summary = "...", description = "...")
 *   @ApiResponse(responseCode = "200", description = "...")
 *   @Parameter(description = "...", example = "...")
 *
 * TODO: Annotate DTO fields with @Schema(description = "...", example = "...")
 */
@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "DevGym Spring MVC API",
        version = "v1",
        description = "Practice API for Spring MVC exercises"
    )
)
@SecurityScheme(
    name = "bearerAuth",
    type = SecuritySchemeType.HTTP,
    scheme = "bearer",
    bearerFormat = "JWT"
)
public class OpenApiConfig {
    // No beans needed — annotations do the work
}
