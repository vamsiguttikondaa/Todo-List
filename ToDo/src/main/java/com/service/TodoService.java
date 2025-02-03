package com.service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.MissingResourceException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.entity.Todo;
import com.entity.User;
import com.repo.TodoRepo;
import com.repo.UserRepo;
import com.util.ResourceNotFoundException;

@Service
public class TodoService {

	@Autowired
	private TodoRepo repo;

	@Autowired
	private UserRepo userRepo;

	public Todo insertTodo(Long userID, String todo_content, Date date_of_completion, boolean status
	)
	{
		Todo todo=new Todo();
		todo.setUser(userRepo.findById(userID).orElseThrow(()-> new RuntimeException("user not found")));
		todo.setTodo_Content(todo_content);
		todo.setDate_of_completion(date_of_completion);
		todo.setCreated_At(LocalDateTime.now());
		todo.setStatus(status);
		
		return repo.save(todo);
	}
	
	public List<Todo> getUserTodos(Long userId){
			User existingUser= userRepo.findById(userId).orElse(null);
			if(existingUser!=null) {
				 return repo.findByUser_UserId(userId);
			}
			return null;
	}

	public Todo updatetodo(int todo_Id, Todo updatedTodo) {
		Todo existingTodo= repo.findById(todo_Id).orElseThrow(()->new ResourceNotFoundException("todo not found with"+todo_Id));
		
		existingTodo.setDate_of_completion(updatedTodo.getDate_of_completion());
		existingTodo.setTodo_Content(updatedTodo.getTodo_Content());
		return repo.save(existingTodo);
		 
	}

	public boolean  deletetodo(int Todo_Id) {
		Todo exists=repo.findById(Todo_Id).orElse(null);
		if(exists==null) {
			throw new ResourceNotFoundException("could not find todo with "+Todo_Id);
		}
		 repo.deleteById(Todo_Id);
		 return true;
	}

	public boolean statusTodo(int todo_Id) {
		Todo existingTodo=repo.findById(todo_Id).orElseThrow(()->new ResourceNotFoundException("todo not found with"+todo_Id));
		boolean currentStatus=existingTodo.getStatus();
		existingTodo.setStatus(!currentStatus);
		repo.save(existingTodo);
		return !currentStatus;
	}

	
}
