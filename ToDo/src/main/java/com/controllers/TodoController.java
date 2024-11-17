package com.controllers;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Todo;
import com.service.TodoService;



@RestController
@RequestMapping("/todo")
@CrossOrigin(origins = "http://localhost:3000/") // Replace with your frontend URL
public class TodoController {
	
	@Autowired
	private TodoService todo_service;
	
	@PostMapping("/create/{userId}")
	public Todo insertTodo(@PathVariable Long userId,
			@RequestBody Todo newtodo) {
		String content=newtodo.getTodo_Content();
		Date doc=newtodo.getDate_of_completion();
		return todo_service.insertTodo(userId,content,doc,false);
	}
	
	@GetMapping("/gettodos/{userId}")
	public List<Todo> gettodos(@PathVariable Long userId){
		return todo_service.getUserTodos(userId);
	}
	
	@PutMapping("/updatetodo/{Todo_Id}")
	public Todo updatetodo(@PathVariable int Todo_Id,@RequestBody Todo updatedTodo) {
		return todo_service.updatetodo(Todo_Id,updatedTodo);
	}
}
