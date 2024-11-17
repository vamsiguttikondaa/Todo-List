package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Dto.LoginResponse;
import com.entity.User;
import com.repo.UserRepo;
import com.util.JwtUtil;

@Service
public class UserService {
	@Autowired
	private UserRepo repo;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public User registerUser(User u) {
		User newUser=new User();
		newUser.setEmail(u.getEmail());
		newUser.setUserName(u.getUserName());
		newUser.setPassword(passwordEncoder.encode(u.getPassword()));
		return repo.save(newUser);
	}

	public ResponseEntity<User> update(User u, Long uId) {
		User existingUser=repo.findById(uId).orElse(null);
		if(existingUser==null) {
			return ResponseEntity.status(400).build();
		}
		existingUser.setEmail(u.getEmail());
		existingUser.setPassword(passwordEncoder.encode(u.getPassword()));
		User UpdatedUser=repo.save(existingUser);
		return ResponseEntity.ok(UpdatedUser);
	}

	public ResponseEntity<LoginResponse> login(User u) {
		System.out.println(u.toString());
		User ExistingUser=repo.findByEmail(u.getEmail());
		System.out.println(ExistingUser);
		if (ExistingUser == null) {
			
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
	    }
		if(!passwordEncoder.matches(u.getPassword(), ExistingUser.getPassword())) {
	    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
		
		String token=jwtUtil.generateToken(ExistingUser.getEmail());
		
		
        return ResponseEntity.ok(new LoginResponse(token, ExistingUser.getUserId(), ExistingUser.getUserName(), ExistingUser.getEmail(), ExistingUser.getTodos()));
	}

	public boolean deleteUser(Long uId) {
		 // Check if the user exists
        if (repo.existsById(uId)) {
            repo.deleteById(uId);
            return true;
        } else {
            return false;
        }
    }
	}


