package com.devgym.backend.springmvc.exception;

import org.springframework.http.HttpStatus;

/**
 * mvc-15: Thrown when a requested resource does not exist.
 * GlobalExceptionHandler maps this to HTTP 404 Not Found.
 */
public class ResourceNotFoundException extends AppException {

    public ResourceNotFoundException(String resourceName, Long id) {
        super(resourceName + " not found with id: " + id, HttpStatus.NOT_FOUND);
    }

    public ResourceNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
