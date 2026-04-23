package com.devgym.frontend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * tmvc-07: Spring Security for the Thymeleaf app.
 * Uses form-based login (NOT JWT — this is a server-side session app).
 *
 * TODO: Configure role-based access:
 *   - Public:      GET /products/**, GET /, GET /about
 *   - Authenticated: GET /products/new, POST /products/**
 *   - ADMIN only:  POST /products/{id}/delete
 *
 * TODO: Configure custom login page → /login (maps to templates/auth/login.html)
 * TODO: Configure logout → /logout with redirect to /
 *
 * NOTE: Thymeleaf's sec:authorize="isAuthenticated()" and
 *       sec:authorize="hasRole('ADMIN')" attributes require
 *       thymeleaf-extras-springsecurity6 (already in pom.xml).
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                // TODO (tmvc-07): Replace with proper role-based rules
                .requestMatchers("/h2-console/**", "/css/**", "/js/**").permitAll()
                .anyRequest().permitAll() // CHANGE to .authenticated() after tmvc-07
            )
            .formLogin(form -> form
                // TODO (tmvc-07): Set .loginPage("/login") once you build the login view
                .defaultSuccessUrl("/", true)
            )
            .logout(logout -> logout
                .logoutSuccessUrl("/")
            )
            .headers(headers -> headers.frameOptions(fo -> fo.disable())); // H2 console

        return http.build();
    }
}
