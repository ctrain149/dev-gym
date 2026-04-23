package com.devgym.backend.springmvc.aspect;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * mvc-10: Custom annotation for the timing aspect.
 * Annotate any Spring bean method with @LogExecutionTime to
 * automatically log its execution duration in milliseconds.
 *
 * Usage:
 *   @LogExecutionTime
 *   public ProductResponse create(CreateProductRequest req) { ... }
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface LogExecutionTime {
}
