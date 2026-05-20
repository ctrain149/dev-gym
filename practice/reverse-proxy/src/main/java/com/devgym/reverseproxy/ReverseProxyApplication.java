package com.devgym.reverseproxy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Example Spring Boot Reverse Proxy
 *
 * This application demonstrates TWO approaches to building a reverse proxy:
 *
 * 1. Spring Cloud Gateway (production-grade, config-driven)
 *    - See application.yml for route definitions
 *    - See GatewayConfig.java for programmatic route definitions
 *
 * 2. Manual proxy with WebClient (interview-friendly, shows understanding)
 *    - See ManualProxyController.java
 *
 * Run on port 9090, proxies requests to the backend on port 8080.
 */
@SpringBootApplication
public class ReverseProxyApplication {
    public static void main(String[] args) {
        SpringApplication.run(ReverseProxyApplication.class, args);
    }
}
