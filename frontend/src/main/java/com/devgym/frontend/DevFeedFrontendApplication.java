package com.devgym.frontend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * DevStore Thymeleaf Frontend
 * Runs on port 8081 (backend API on port 8080).
 *
 * Start: mvn spring-boot:run
 * Open:  http://localhost:8081
 */
@SpringBootApplication
public class DevFeedFrontendApplication {

    public static void main(String[] args) {
        SpringApplication.run(DevFeedFrontendApplication.class, args);
    }
}
