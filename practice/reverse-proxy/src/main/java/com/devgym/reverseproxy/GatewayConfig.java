package com.devgym.reverseproxy;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * APPROACH 1: Spring Cloud Gateway (production-grade)
 *
 * Programmatic route definitions. You can also define these in application.yml
 * (see the YAML file for that approach). This Java config gives you full control
 * for dynamic routing, custom filters, and conditional logic.
 *
 * KEY CONCEPTS for interviews:
 * - Route: maps a predicate (path, header, etc.) to a downstream URI
 * - Filter: modifies the request/response in-flight (add headers, rate limit, retry, etc.)
 * - Predicate: conditions that must be true for a route to match
 */
@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRoutes(RouteLocatorBuilder builder) {
        return builder.routes()

                // Route 1: Proxy /api/** to the backend on port 8080
                .route("backend-api", r -> r
                        .path("/api/**")
                        .filters(f -> f
                                // Strip the /api prefix before forwarding
                                // e.g., /api/products -> /products on backend
                                .stripPrefix(1)
                                // Add a custom header so the backend knows it came through the proxy
                                .addRequestHeader("X-Proxy", "dev-gym-gateway")
                                // Retry on 5xx errors, up to 3 times
                                .retry(retryConfig -> retryConfig
                                        .setRetries(3)
                                        .setStatuses(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR)
                                )
                        )
                        .uri("http://localhost:8080")
                )

                // Route 2: Proxy /auth/** to a hypothetical auth service
                .route("auth-service", r -> r
                        .path("/auth/**")
                        .filters(f -> f
                                .stripPrefix(1)
                                .addRequestHeader("X-Proxy", "dev-gym-gateway")
                        )
                        .uri("http://localhost:8081")
                )

                // Route 3: Path rewrite example
                // /legacy/products -> /api/v2/products on backend
                .route("legacy-rewrite", r -> r
                        .path("/legacy/**")
                        .filters(f -> f
                                .rewritePath("/legacy/(?<segment>.*)", "/api/v2/${segment}")
                        )
                        .uri("http://localhost:8080")
                )

                .build();
    }
}
