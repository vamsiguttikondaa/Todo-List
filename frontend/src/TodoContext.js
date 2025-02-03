import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
    const { todos, settodos, getUserId, logout } = useContext(UserContext);
    const [showForm, setshowForm] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);
    const navigate = useNavigate();

    const AddClick = () => {
        setEditingTodo(null);
        setshowForm(true);
    };

    const editTodo = (todo) => {
        setEditingTodo(todo);
        setshowForm(true);
    };

    const closeForm = () => {
        setEditingTodo(null);
        setshowForm(false);
    };

    const apiFetch = async (url, options = {}) => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("No token found in local storage");
            navigate('/');
            return;
        }

        const response = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                ...options.headers
            }
        });

        if (response.status === 403) {
            logout();
            return null;
        }

        if (!response.ok) {
            console.error(`API request failed: ${response.status}`);
            return null;
        }

        return response.json();
    };

    const fetchTodos = async () => {
        const userId = getUserId();
        if (!userId) {
            console.error("User not logged in or userId is undefined.");
            return;
        }

        const todos = await apiFetch(`http://localhost:8080/todo/gettodos/${userId}`, { method: "GET" });
        if (todos) {
            settodos(todos);
        }
    };

    const addTodo = async (todo) => {
        const userId = getUserId();
        if (!userId) {
            console.error("User not logged in or userId is undefined.");
            return;
        }

        const newTodo = await apiFetch(`http://localhost:8080/todo/create/${userId}`, {
            method: "POST",
            body: JSON.stringify(todo),
        });

        if (newTodo) {
            settodos((prevTodos) => [...prevTodos, newTodo]);
        }
    };

    const updateTodo = async (updatedTodo) => {
        const response = await apiFetch(`http://localhost:8080/todo/updatetodo/${updatedTodo.todo_Id}`, {
            method: "PUT",
            body: JSON.stringify(updatedTodo),
        });

        if (response) {
            fetchTodos(); // Refetch todos after editing
        }
    };

    const deleteTodo = async (todo_Id) => {
        const response = await apiFetch(`http://localhost:8080/todo/deletetodo/${todo_Id}`, {
            method: "DELETE",
        });

        if (response) {
            console.log("Deleted todo successfully");
            fetchTodos();
        }
    };

    const statusTodo = async (todo_Id) => {
        // Update the status locally first (optimistic update)
        const updatedTodos = todos.map(todo => 
            todo.todo_Id === todo_Id ? { ...todo, status: !todo.status } : todo
        );
        settodos(updatedTodos);  // Immediately update the state
    
        // Now, send the request to the backend
        const response = await apiFetch(`http://localhost:8080/todo/statustodo/${todo_Id}`, {
            method: "PUT",
        });
    
        if (response) {
            console.log("Updated status of todo successfully");
            // Optionally, you could refetch the todos from the backend
            fetchTodos(); // This ensures that your UI stays in sync with the backend
        } else {
            console.error("Failed to update todo status.");
        }
    };
    

    return (
        <TodoContext.Provider value={{
            fetchTodos, setshowForm, showForm, AddClick, deleteTodo, editTodo, addTodo, closeForm, editingTodo, updateTodo, statusTodo
        }}>
            {children}
        </TodoContext.Provider>
    );
};

export { TodoContext, TodoProvider };
