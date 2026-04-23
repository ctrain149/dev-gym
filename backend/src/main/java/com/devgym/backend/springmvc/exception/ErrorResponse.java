package com.devgym.backend.springmvc.exception;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * mvc-02 / mvc-15: Standardized error response DTO.
 * Every error from the API returns this structure.
 */
@Data
@Builder
public class ErrorResponse {

    private LocalDateTime timestamp;
    private int status;
    private String message;
    private String path;

    // Field-level errors for validation failures (mvc-02)
    private List<FieldError> errors;

    @Data
    @Builder
    public static class FieldError {
        private String field;
        private String message;
    }
}
