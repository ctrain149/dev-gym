package com.devgym.backend.springmvc.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * mvc-10: Aspect that logs execution time for methods annotated with @LogExecutionTime.
 *
 * TODO: Implement the around() advice:
 *   1. Record System.currentTimeMillis() before proceeding
 *   2. Call joinPoint.proceed() inside a try-finally
 *   3. Log: "[MethodName] executed in Xms"
 *   4. Re-throw any exception after logging
 */
@Aspect
@Component
public class TimingAspect {

    private static final Logger log = LoggerFactory.getLogger(TimingAspect.class);

    // TODO: Implement this advice
    // @Around("@annotation(com.devgym.backend.springmvc.aspect.LogExecutionTime)")
    // public Object logTime(ProceedingJoinPoint joinPoint) throws Throwable {
    //     long start = System.currentTimeMillis();
    //     try {
    //         return joinPoint.proceed();
    //     } finally {
    //         long elapsed = System.currentTimeMillis() - start;
    //         log.info("[{}] executed in {}ms", joinPoint.getSignature().getName(), elapsed);
    //     }
    // }
}
