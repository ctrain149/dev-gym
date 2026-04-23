package com.devgym.backend.springmvc.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

/**
 * mvc-07 / mvc-08: Spring Security 6 configuration.
 *
 * TODO (mvc-07): Configure role-based requestMatchers:
 *   - Public: GET /api/v1/products/** (read-only)
 *   - ADMIN only: POST/PUT/PATCH/DELETE /api/v1/products/**
 *   - Public: /api/auth/**, /swagger-ui.html, /api-docs/**
 *   - All others: authenticated
 *
 * TODO (mvc-08): Add JwtAuthFilter before UsernamePasswordAuthenticationFilter.
 *   .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
 *
 * TODO (mvc-08): Set session management to STATELESS (JWT is stateless).
 *
 * NOTE: Spring Security 6 — use requestMatchers(), NOT antMatchers() (removed).
 * NOTE: @EnableMethodSecurity replaces @EnableGlobalMethodSecurity.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // TODO (mvc-07): Replace with proper role-based rules
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/api-docs/**").permitAll()
                .requestMatchers("/h2-console/**").permitAll()
                .anyRequest().permitAll()  // CHANGE THIS to .authenticated() after mvc-07
            )
            .headers(headers -> headers.frameOptions(fo -> fo.disable())); // for H2 console

        return http.build();
    }
}
