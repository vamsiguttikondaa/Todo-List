package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.entity.User;
import com.repo.UserRepo;

@Service
public class MyUserDetailService implements UserDetailsService{
	
	@Autowired
	private  UserRepo userRepo;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user=userRepo.findByEmail(email);
		if(user==null) {
			throw new UsernameNotFoundException("the requested user doesnt exist with email"+email);
		}
		return org.springframework.security.core.userdetails.User
				.builder()
				.username(user.getEmail())
				.password(user.getPassword())
				.roles("USER")
				.build();
	}

}
