package com.devgym.backend.springmvc.exception;

import org.springframework.http.HttpStatus;

/**
 * mvc-15: Thrown when a resource already exists (e.g., duplicate name/email).
 * GlobalExceptionHandler maps this to HTTP 409 Conflict.
 */
public class ConflictException extends AppException {

    public ConflictException(String message) {
        super(message, HttpStatus.CONFLICT);
    }
}
