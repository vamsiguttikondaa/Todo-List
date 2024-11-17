package com.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.security.JwtAuthenticationFilter;
import com.service.MyUserDetailService;

@Configuration
@EnableWebSecurity
public class SecurityConfig{
	
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	@Autowired
	private MyUserDetailService myUserDetailService;
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	 @Bean
	    public AuthenticationManager authenticationManagerBean(HttpSecurity http) throws Exception {
	        return http.getSharedObject(AuthenticationManagerBuilder.class)
	        		.userDetailsService(myUserDetailService)
	                .passwordEncoder(passwordEncoder())
	                .and()
	                .build();
	    }
	 // Define SecurityFilterChain instead of extending WebSecurityConfigurerAdapter
	  @Bean
	    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	        http.csrf(csrf -> csrf.disable()) // Disable CSRF for stateless APIs
	            .authorizeHttpRequests(auth -> auth
	                .requestMatchers("/auth/login").permitAll() // Public endpoints
//	                .requestMatchers("/todo/**").permitAll()

//	                .requestMatchers("/auth/user/**").hasAuthority("ROLE_USER") // Restricted to USER role
//	                .requestMatchers("/auth/admin/**").hasAuthority("ROLE_ADMIN") // Restricted to ADMIN role
	                .anyRequest().authenticated() // Protect all other endpoints
	            )
	            .sessionManagement(sess -> sess
	                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // No sessions (stateless JWT authentication)
	            )
	            
	            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // Add JWT filter
	        	http.cors();
	        return http.build();
	    }
//	  public void addCorsMappings(CorsRegistry registry) {
//	        registry.addMapping("/**")
//	                .allowedOrigins("http://localhost:3000")
//	                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//	                .allowedHeaders("Content-Type", "Authorization")
//	                .allowCredentials(true);
//	    }
}
