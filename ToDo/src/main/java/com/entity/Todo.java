package com.entity;

import java.time.LocalDateTime;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Todo {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int Todo_Id;
	@Column(nullable = false)

	private String Todo_Content;
	@Column(nullable = false)
	private Date date_of_completion;
	@Column(nullable = false)

	private LocalDateTime created_At;
	
	@ManyToOne
	@JoinColumn(name="user_id",nullable = false)
	@JsonBackReference
	private User user;
	
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public LocalDateTime getCreated_At() {
		return created_At;
	}
	public void setCreated_At(LocalDateTime created_At) {
		this.created_At = created_At;
	}
	private boolean status;
	public int getTodo_Id() {
		return Todo_Id;
	}
	public void setTodo_Id(int todo_Id) {
		Todo_Id = todo_Id;
	}
	public String getTodo_Content() {
		return Todo_Content;
	}
	public void setTodo_Content(String todo_Content) {
		Todo_Content = todo_Content;
	}
	public Date getDate_of_completion() {
		return date_of_completion;
	}
	public void setDate_of_completion(Date date_of_completion) {
		this.date_of_completion = date_of_completion;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	
	

}
