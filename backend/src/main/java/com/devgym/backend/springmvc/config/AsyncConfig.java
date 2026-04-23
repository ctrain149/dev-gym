package com.devgym.backend.springmvc.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

/**
 * mvc-15: Async thread pool configuration.
 *
 * TODO: Tune corePoolSize, maxPoolSize, queueCapacity, and threadNamePrefix.
 * TODO: Add @EnableAsync here (or on BackendApplication).
 * TODO: Inject this executor in @Async methods via:
 *   @Async("taskExecutor")
 */
@Configuration
@EnableAsync
public class AsyncConfig {

    @Bean(name = "taskExecutor")
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        // TODO: Set these values and explain why you chose them
        executor.setCorePoolSize(2);       // TODO: What is a good baseline?
        executor.setMaxPoolSize(10);       // TODO: When would you increase this?
        executor.setQueueCapacity(100);    // TODO: What happens when the queue is full?
        executor.setThreadNamePrefix("devgym-async-");
        executor.initialize();
        return executor;
    }
}
