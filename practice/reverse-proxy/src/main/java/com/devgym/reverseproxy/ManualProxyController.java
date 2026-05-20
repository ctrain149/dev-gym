package com.devgym.reverseproxy;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

/**
 * APPROACH 2: Manual reverse proxy with WebClient
 *
 * This is the "from scratch" approach — great for interviews because it shows
 * you understand what a reverse proxy actually does under the hood:
 *
 * 1. Receive incoming request
 * 2. Forward it to a downstream service (preserving method, headers, body)
 * 3. Return the downstream response to the caller
 *
 * Use this when you need fine-grained control or can't use Spring Cloud Gateway.
 */
@RestController
@RequestMapping("/manual")
public class ManualProxyController {

    private final WebClient webClient;

    public ManualProxyController(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl("http://localhost:8080")
                .build();
    }

    /**
     * Catch-all: forwards any request under /manual/** to the backend.
     *
     * Examples:
     *   GET  /manual/products      -> GET  http://localhost:8080/products
     *   POST /manual/products      -> POST http://localhost:8080/products
     *   GET  /manual/products/1    -> GET  http://localhost:8080/products/1
     */
    @RequestMapping(value = "/**", produces = "application/json")
    public Mono<ResponseEntity<String>> proxy(
            @RequestHeader HttpHeaders headers,
            @RequestBody(required = false) String body,
            HttpMethod method,
            @RequestHeader("Host") String host,
            jakarta.servlet.http.HttpServletRequest servletRequest) {

        // Extract the path after /manual
        String path = servletRequest.getRequestURI().replaceFirst("/manual", "");
        String query = servletRequest.getQueryString();
        String fullPath = query != null ? path + "?" + query : path;

        return webClient
                .method(method)
                .uri(fullPath)
                // Forward original headers (minus Host, which we override)
                .headers(h -> {
                    headers.forEach((key, values) -> {
                        if (!key.equalsIgnoreCase("Host")) {
                            h.addAll(key, values);
                        }
                    });
                    h.add("X-Forwarded-Host", host);
                    h.add("X-Proxy", "manual-proxy");
                })
                // Forward request body if present
                .bodyValue(body != null ? body : "")
                .retrieve()
                .toEntity(String.class)
                // Preserve the downstream status code and body
                .map(response -> ResponseEntity
                        .status(response.getStatusCode())
                        .headers(response.getHeaders())
                        .body(response.getBody())
                )
                // If downstream is unreachable, return 502 Bad Gateway
                .onErrorResume(ex -> Mono.just(
                        ResponseEntity.status(502)
                                .body("{\"error\": \"Bad Gateway\", \"message\": \"" + ex.getMessage() + "\"}")
                ));
    }
}
