import React, { createContext, useContext, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { TodoContext } from "./TodoContext";

// Create the context
const UserContext = createContext();

// Create the provider component
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [todos, settodos] = useState([]); // Manage todos here if user-specific
    const [userId,setUSerId]=useState(null)

    const navigate = useNavigate();  // Hook for navigation
        // const [todos, settodos] = useState([]);

    const getUserId=()=>{
        console.log("getuserid function used");
        console.log(userId);
        
        return userId;
    }
    // const setUserId=()=>{
    //     const uId=getUserId()
    //     setUserId(uId);
    //     console.log("user id set to"+userId );
        
    // }
    // const getToken=()=>{
    //     return user?.token;
    // }


    // Login function
    const login = async (userDetails) => {
        try {
            const resp = await fetch("http://localhost:8080/auth/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userDetails),
            });
            console.log(resp.status);  // Check for status code
            if (resp.ok) {
                const data = await resp.json();
                setUser(
                    {
                        ...data,
                        token: data.token
                    }
                );
                console.log(data);

                setUSerId(data.userId);
                localStorage.setItem('token', data.token);
                console.log(data.token);
                
                navigate('/dashboard')
            }


        } catch (e) {
            console.log(e);
        }
    };

    // Register function
    const register = async (userDetails) => {
        try {
            const resp = await fetch("http://localhost:8080/register", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userDetails),
            });
            const data = await resp.json();
            if (data != null) {
                setUser(data);
            }  // Optionally, you can set the user directly after successful registration
            console.log("Registered User:", data);
        } catch (e) {
            console.log(e);
        }
    };
   

    // Logout function
    const logout = async () => {
        setUser(null);
        settodos([]);
        localStorage.removeItem('token');
        navigate('/');
    };
   
    
    return (
        <UserContext.Provider value={{ user, login, register, user ,todos,settodos,logout,getUserId}}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
