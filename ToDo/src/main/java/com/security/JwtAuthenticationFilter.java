package com.security;

import com.service.MyUserDetailService;
import com.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component

public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private MyUserDetailService  myUserDetailService;

	@Override
	protected void doFilterInternal(jakarta.servlet.http.HttpServletRequest request,
	                                jakarta.servlet.http.HttpServletResponse response,
	                                jakarta.servlet.FilterChain filterChain)
	        throws jakarta.servlet.ServletException, IOException {
	    
	    String token = getTokenFromHeader(request);
	    System.out.println("Token from header: " + token);
	    
	    if (token != null && !jwtUtil.isTokenExpired(token)) {  // Only proceed if token is valid and not expired
	        String username = jwtUtil.extractUsername(token);
	        System.out.println(username);
	        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
	            UserDetails userDetails = myUserDetailService.loadUserByUsername(username);

	            // Ensure token is valid for the specific user
	            if (jwtUtil.validateToken(token, username)) { // pass username instead of userDetails
	                UsernamePasswordAuthenticationToken authenticationToken =
	                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
	            }

	        }
	    }
	    
	    filterChain.doFilter(request, response);
	}

	private String getTokenFromHeader(jakarta.servlet.http.HttpServletRequest request) {
	    String header = request.getHeader(HttpHeaders.AUTHORIZATION);
	    if (header != null && header.startsWith("Bearer ")) {
	        return header.substring(7);
	    }
	    return null;
	}

    
}
