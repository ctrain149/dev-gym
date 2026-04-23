package com.devgym.backend.springmvc.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * mvc-08: JWT utility service.
 *
 * TODO: Inject jwt.secret and jwt.expiration-ms from application.properties using @Value.
 * TODO: Implement generateToken(String subject) using Jwts.builder()
 * TODO: Implement validateToken(String token) — return true/false
 * TODO: Implement extractSubject(String token) — return the email/username
 * TODO: Implement isTokenExpired(String token)
 *
 * Dependencies required (already in pom.xml):
 *   io.jsonwebtoken:jjwt-api, jjwt-impl, jjwt-jackson
 *
 * Example (JJWT 0.12.x API):
 *   Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret))
 *   Jwts.builder().subject(email).expiration(new Date(...)).signWith(key).compact()
 *   Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload()
 */
@Service
public class JwtService {

    // TODO: @Value("${jwt.secret}")
    private String secret;

    // TODO: @Value("${jwt.access-token-expiration-ms:900000}")  // 15 min default
    private long accessTokenExpirationMs;

    // TODO: @Value("${jwt.refresh-token-expiration-ms:604800000}")  // 7 days default
    private long refreshTokenExpirationMs;

    public String generateAccessToken(String subject) {
        // TODO: Implement
        throw new UnsupportedOperationException("Not yet implemented — mvc-08");
    }

    public String generateRefreshToken(String subject) {
        // TODO: Implement with refreshTokenExpirationMs
        throw new UnsupportedOperationException("Not yet implemented — mvc-08");
    }

    public boolean validateToken(String token) {
        // TODO: Parse and validate; return false on any exception
        throw new UnsupportedOperationException("Not yet implemented — mvc-08");
    }

    public String extractSubject(String token) {
        // TODO: Parse and return subject claim
        throw new UnsupportedOperationException("Not yet implemented — mvc-08");
    }
}
