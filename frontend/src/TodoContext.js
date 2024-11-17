import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";

const TodoContext=createContext()
const TodoProvider=({children})=>{
    const {todos,settodos,getUserId}=useContext(UserContext);
    const [showForm, setshowForm] = useState(false);


    const AddClick = () => {
        setshowForm(!showForm);
    };


    const fetchTodos = async () => {
        const userId = getUserId();  // Calls the getUserId function
        if (!userId) {
            console.error("User not logged in or userId is undefined.");
            return;  // If userId is not available, exit the function
        }
        
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("Failed to get token from local storage");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:8080/todo/gettodos/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                const fetchedTodos = await response.json();
                settodos(fetchedTodos); // Update todos state
            } else {
                console.error("Failed to fetch todos");
            }
        } catch (e) {
            console.log(e);
        }
    };
    
    const addTodo = async (todo) => {
        const token=localStorage.getItem('token')
     const userId = getUserId();
        
    
        const response = await fetch(`http://localhost:8080/todo/create/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(todo)
        });
    
        if (response.ok) {
            const newTodo = await response.json();
            settodos((prevTodos) => [...prevTodos, newTodo]);

        } else {
            console.error("Failed to add todo");
        }
    };  
    const editTodo = async (updatedTodo) => {
        const token = localStorage.getItem('token');
        const userId = getUserId();
        
        const response = await fetch(`http://localhost:8080/todo/update/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedTodo),
        });
    
        if (response.ok) {
            // Todo was updated successfully, now refetch the todos
            fetchTodos(); // Refetch todos after editing
        } else {
            console.error("Failed to update todo");
        }
    };
    
    


    return (
        <TodoContext.Provider value={{fetchTodos,setshowForm,showForm,AddClick,editTodo,addTodo}}>
            {children}
        </TodoContext.Provider>
    )
}
export {TodoContext,TodoProvider}