package com.devgym.backend.springmvc.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.List;

/**
 * mvc-02 / mvc-15: Global exception handler.
 *
 * TODO (mvc-02): Handle MethodArgumentNotValidException → 400 with field errors.
 * TODO (mvc-15): Handle AppException subclasses → map HttpStatus from the exception.
 * TODO: Handle generic Exception → 500 (log full trace, return safe message).
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    // TODO (mvc-02): Implement this handler
    // @ExceptionHandler(MethodArgumentNotValidException.class)
    // public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex, WebRequest request) {
    //     List<ErrorResponse.FieldError> errors = ex.getBindingResult().getFieldErrors().stream()
    //         .map(fe -> new ErrorResponse.FieldError(fe.getField(), fe.getDefaultMessage()))
    //         .toList();
    //     ErrorResponse body = ErrorResponse.builder()
    //         .timestamp(LocalDateTime.now())
    //         .status(400)
    //         .message("Validation failed")
    //         .path(request.getDescription(false).replace("uri=", ""))
    //         .errors(errors)
    //         .build();
    //     return ResponseEntity.badRequest().body(body);
    // }

    // TODO (mvc-15): Handle ResourceNotFoundException → 404
    // TODO (mvc-15): Handle ConflictException → 409
    // TODO (mvc-15): Handle ForbiddenException → 403
    // TODO: Handle generic Exception → 500
}
