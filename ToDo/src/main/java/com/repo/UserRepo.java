package com.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.entity.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long>{
	@Query("Select u from User u LEFT JOIN FETCH u.todos where u.email=:email AND u.password=:password")
	User findByEmailAndPassword(@Param("email") String email,@Param("password") String password);
	
	@Query("SELECT u from User u where u.userName=:username")
	User findByUsername(@Param("username") String username);
	
	@Query("SELECT u from User u where u.email=:email")
	User findByEmail(@Param("email") String email);
}
