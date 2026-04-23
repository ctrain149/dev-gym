package com.devgym.backend.springmvc.async;

import lombok.Data;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

/**
 * mvc-15: Demonstrates @Async + CompletableFuture.
 *
 * Key rule: The @Async method MUST be in a different Spring bean from the caller
 * (so the proxy can intercept). Calling this.generateReport() from within this
 * class bypasses the proxy and runs synchronously.
 *
 * TODO: Implement generateReport():
 *   1. Simulate work with Thread.sleep(2000)
 *   2. Build and return a ReportResult
 *   3. Verify it returns immediately (non-blocking) in a timing test
 */
@Service
public class ReportService {

    /**
     * Generates a report asynchronously.
     * Returns immediately; the caller receives a future to get the result later.
     */
    @Async("taskExecutor")
    public CompletableFuture<ReportResult> generateReport(String reportType) {
        // TODO: Implement async report generation
        // Thread.sleep(2000); // simulate heavy work
        // return CompletableFuture.completedFuture(
        //     ReportResult.builder()
        //         .reportType(reportType)
        //         .rowCount(100)
        //         .status("COMPLETED")
        //         .build()
        // );
        throw new UnsupportedOperationException("Not yet implemented — mvc-15");
    }

    @Data
    @lombok.Builder
    public static class ReportResult {
        private String reportType;
        private int rowCount;
        private String status;
    }
}
