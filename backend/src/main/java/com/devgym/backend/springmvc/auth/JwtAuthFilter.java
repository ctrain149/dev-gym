package com.devgym.backend.springmvc.auth;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * mvc-08: JWT authentication filter.
 * Runs once per request, extracts the Bearer token, validates it,
 * and sets the SecurityContext so downstream filters see an authenticated user.
 *
 * TODO: Implement doFilterInternal():
 *   1. Extract "Authorization" header; skip if missing or not "Bearer "
 *   2. Call jwtService.validateToken(token)
 *   3. If valid, load UserDetails and set authentication in SecurityContextHolder
 *   4. Always call filterChain.doFilter(request, response)
 */
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        // TODO: Implement JWT extraction and validation

        // Step 1: Get Authorization header
        // String authHeader = request.getHeader("Authorization");
        // if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        //     filterChain.doFilter(request, response);
        //     return;
        // }

        // Step 2: Extract token
        // String token = authHeader.substring(7);

        // Step 3: Validate and set context
        // if (jwtService.validateToken(token) && SecurityContextHolder.getContext().getAuthentication() == null) {
        //     String subject = jwtService.extractSubject(token);
        //     UserDetails userDetails = userDetailsService.loadUserByUsername(subject);
        //     UsernamePasswordAuthenticationToken authToken =
        //         new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        //     authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        //     SecurityContextHolder.getContext().setAuthentication(authToken);
        // }

        filterChain.doFilter(request, response);
    }
}
