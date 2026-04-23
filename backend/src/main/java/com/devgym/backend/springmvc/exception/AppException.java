package com.devgym.backend.springmvc.exception;

import org.springframework.http.HttpStatus;

/**
 * mvc-15: Base exception for all application exceptions.
 * Carries an HttpStatus so GlobalExceptionHandler can map it automatically.
 *
 * TODO: Create subclasses:
 *   - ResourceNotFoundException (404)
 *   - ConflictException (409)
 *   - ForbiddenException (403)
 */
public class AppException extends RuntimeException {

    private final HttpStatus status;

    public AppException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
