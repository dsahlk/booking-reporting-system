package com.example.backend.service;

import com.example.backend.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


import java.util.Date;
import java.util.function.Function;
import javax.crypto.SecretKey;

@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    //Generate JWT Token
    public String generateToken(User user) {

        return Jwts.builder()

                .subject(user.getEmail())

                .issuedAt(new Date())

                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))

                .signWith(getSigningKey())

                .compact();

    }

    //Extract email from the token
    public String extractUsername(String token) {

        return extractClaim(token, Claims::getSubject);

    }

    //Extract expiration day
    public Date extractExpiration(String token) {

        return extractClaim(token, Claims::getExpiration);

    }

    //Generic Claim Extractor
    public <T> T extractClaim(
            String token,
            Function<Claims, T> claimsResolver
    ) {

        Claims claims = extractAllClaims(token);

        return claimsResolver.apply(claims);

    }

    //read all claims
    private Claims extractAllClaims(String token) {

        return Jwts.parser()

                .verifyWith(getSigningKey())

                .build()

                .parseSignedClaims(token)

                .getPayload();

    }

    //validate token
    public boolean isTokenValid(
            String token,
            User user
    ) {

        String email = extractUsername(token);

        return email.equals(user.getEmail())

                && !isTokenExpired(token);

    }

    //check expiration
    private boolean isTokenExpired(String token) {

        return extractExpiration(token)

                .before(new Date());

    }

    //create signing key
    private SecretKey getSigningKey() {

        byte[] keyBytes =
                Decoders.BASE64.decode(secretKey);

        return Keys.hmacShaKeyFor(keyBytes);

    }


}
