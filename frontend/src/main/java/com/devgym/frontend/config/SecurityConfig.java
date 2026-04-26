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
                .requestMatchers("/h2-console/**", "/css/**", "/js/**", "/login", "/", "/about").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/products", "/products/{id}").permitAll()
                .requestMatchers("/products/{id}/delete").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/", true)
                .permitAll()
            )
            .logout(logout -> logout
                .logoutSuccessUrl("/")
                .permitAll()
            )
            .headers(headers -> headers.frameOptions(fo -> fo.disable()));

        return http.build();
    }
}
