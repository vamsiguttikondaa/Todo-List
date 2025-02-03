package com.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Dto.LoginResponse;
import com.entity.User;
import com.service.UserService;
import com.util.JwtUtil;

@RestController
@RequestMapping("/auth")  // Using a common path for all authentication-related routes
@CrossOrigin(origins = "http://localhost:3000/") // Replace with your frontend URL
public class UserController {
    
    @Autowired
    private UserService service;
    @Autowired
    private JwtUtil jwtUtil;
    
    @GetMapping("/validate")
    public ResponseEntity<User> validateUser(@RequestHeader("Authorization") String token) {
    	
    	String jwtToken=token.replace("Bearer ", "");
    	String email=jwtUtil.extractUsername(jwtToken);
    	
    
    		boolean valid=jwtUtil.validateToken(jwtToken, email);
    		if(valid) {
    			return service.findByEmail(email);
    			
    		}
    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    	
    	
    }

    // Register new user
    @PostMapping("/register")
    public User register(@RequestBody User u) {
        return service.registerUser(u);
    }

    // Update existing user
    @PutMapping("/updateuser/{uId}")
    public ResponseEntity<User> update(@RequestBody User u, @PathVariable("uId") Long uId) {
        return service.update(u, uId);
    }

    // Login existing user
   
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody User u) {
        return service.login(u);
    }

    // Delete user by ID
    @DeleteMapping("/deleteuser/{uId}")
    public ResponseEntity<String> deleteUser(@PathVariable("uId") Long uId) {
        boolean isDeleted = service.deleteUser(uId);
        if (isDeleted) {
            return ResponseEntity.ok("User deleted successfully.");
        } else {
            return ResponseEntity.status(400).body("User deletion failed.");
        }
    }
}
