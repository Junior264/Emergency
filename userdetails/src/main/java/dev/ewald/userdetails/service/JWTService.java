package dev.ewald.userdetails.service;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {
    @Value("${jwt.secret}")
    private String secretkey;
    @Value("${jwt.lifetime}")
    private int lifetime;
    @Value("${jwt.refreshLifetime}")
    private int refreshLifetime;

    public String generateTokenAccess(String username) {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + lifetime * 1000))
                .signWith(getKey())
                .compact();
    }

    public String generateTokenRefresh(String username) {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + refreshLifetime * 1000))
                .signWith(getKey())
                .compact();
    }

    private SecretKey getKey() {
        SecretKey key = Keys.hmacShaKeyFor(secretkey.getBytes(StandardCharsets.UTF_8));

        return key;
    }
}
