import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// Create the context
const UserContext = createContext();

// Create the provider component
const UserProvider = ({ children }) => {
    const [user,  setUser] = useState(null);
    const [todos, settodos] = useState([]); // Manage todos here if user-specific

    const navigate = useNavigate();  // Hook for navigation
    const validateUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch('http://localhost:8080/auth/validate', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const validatedUser = await response.json();
                    setUser(validatedUser); // Save user data in state
                } else {
                    console.error('Validation failed:', response.statusText);
                    setUser(null); // Clear user data on validation failure
                    navigate('/')
                }
            } catch (error) {
                console.error('Error during validation:', error);
                setUser(null);
            }
        }
    };
        
        useEffect(() => {
           
    
            validateUser();
            
        }, []);

        const getUserId = () => {
            
            
            return user?.userId;
        };
        


    // Login function
    const login = async (userDetails) => {
        try {
            const resp = await fetch("http://localhost:8080/auth/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userDetails),
            });
    
            if (resp.ok) {
                const data = await resp.json();
                setUser({ ...data, token: data.token }); // Update state
    
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            } else {
                console.log("Login failed");
            }
        } catch (e) {
            console.log(e);
        }
    };
    
    // Register function
    const register = async (userDetails) => {
        try {
            const resp = await fetch("http://localhost:8080/auth/register", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userDetails),
            })
            const data = await resp.json();
            if (data != null) {
                setUser(data);
            }  // Optionally, you can set the user directly after successful registration
            console.log("Registered User:", data);
        } catch (e) {
            console.log(e);
            console.log(" couldnt Registered User:", userDetails);
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
        <UserContext.Provider value={{ user, login, register, todos,settodos,logout,getUserId}}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
