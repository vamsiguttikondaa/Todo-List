package com.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.entity.Todo;

@Repository
public interface TodoRepo extends JpaRepository<Todo, Integer>{
	@Query("SELECT t from Todo t where t.user.id=:userId")
	List<Todo> findByUser_UserId(@Param("userId") Long userId);

}
