package com.devgym.backend.springmvc.auth;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * mvc-08: Authentication endpoints.
 *
 * POST /api/auth/login    → { accessToken, refreshToken, expiresIn }
 * POST /api/auth/refresh  → { accessToken, expiresIn }
 *
 * TODO: Inject AuthService and implement both endpoints.
 * TODO: Ensure /api/auth/** is permitted in SecurityConfig (no auth required).
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    // TODO: Inject AuthService
    // private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request) {
        // TODO: Authenticate user, generate tokens, return response
        throw new UnsupportedOperationException("Not yet implemented — mvc-08");
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refresh(@RequestBody RefreshRequest request) {
        // TODO: Validate refresh token, generate new access token
        throw new UnsupportedOperationException("Not yet implemented — mvc-08");
    }

    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    public static class RefreshRequest {
        private String refreshToken;
    }

    @Data
    @lombok.Builder
    public static class TokenResponse {
        private String accessToken;
        private String refreshToken;
        private long expiresIn;
    }
}
