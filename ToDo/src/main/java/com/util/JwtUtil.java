package com.util;

import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	
	private static final  SecretKey secretKey=Keys.hmacShaKeyFor("3cfa76ef14937c1c0ea519f8fc057a80fcd04a7420f8e8bcd0a7567c272e007b".getBytes());
    private final long JWT_TOKEN_VALIDITY = 10 * 60 * 60 * 1000;
	private String createToken(Map<String,Object> claims,String email) {
		return Jwts.builder()
				.setClaims(claims)
				.setSubject(email)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
				.signWith(secretKey, SignatureAlgorithm.HS256)
				.compact();
	}
	
	public String generateToken(String email) {
		Map<String,Object> claims=new HashMap<String, Object>();
		return createToken(claims, email);
	}
	
	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}
	public Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}
	public Boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}
	
	public Boolean validateToken(String token, String email) {
	    final String extractedUsername = extractUsername(token);
	    if (extractedUsername.equals(email) && !isTokenExpired(token)) {
	        return true;
	    }
	    return false;
	}

	
	public <T> T extractClaim(String token,Function<Claims,T> claimsResolver) {
		final Claims claims=extractAllClaims(token);
		return claimsResolver.apply(claims);
	}

	private Claims extractAllClaims(String token) {
		// TODO Auto-generated method stub
		return Jwts.parserBuilder()
				.setSigningKey(secretKey) // Specify the key that was used to sign the JWT
				.build()
				.parseClaimsJws(token)  // Parse the JWT and get the claims
				
				.getBody();        // Return the claims body (the actual payload)
	}
}
