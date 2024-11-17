package com.Dto;

import java.util.List;
import com.entity.Todo;

public class LoginResponse {
    
    private String token;
    private Long userId;
    private String userName;
    private String email;  // Fixed typo
    private List<Todo> todos;
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public List<Todo> getTodos() {
		return todos;
	}
	public void setTodos(List<Todo> todos) {
		this.todos = todos;
	}
	public LoginResponse(String token, Long userId, String userName, String email, List<Todo> todos) {
		super();
		this.token = token;
		this.userId = userId;
		this.userName = userName;
		this.email = email;
		this.todos = todos;
	}
    
   
}
