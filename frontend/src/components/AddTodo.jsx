import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { TodoContext } from '../TodoContext';

const AddTodo = ({ existingTodo=null,onClick }) => {

    const {addTodo,updateTodo}=useContext(TodoContext);
    
    const today = new Date().toISOString().split('T')[0]; // Get today's date in 'yyyy-MM-dd' format

    const [todo, settodo] = useState({
        todo_Content: '',
        date_of_completion: today
    });
    //using uzeeffect to control the input forms bro
    useEffect(()=>{
        if(existingTodo){
            settodo(existingTodo)
        }
    },[existingTodo]) //remember this keyword and move on

    const handleTodoInput = (e) => {
        settodo({ ...todo, todo_Content: e.target.value });
    };

    const handleDateChange = (e) => {
        settodo({ ...todo, date_of_completion: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log(todo); // Here, you can handle the submission logic
        if(existingTodo){
            {
                updateTodo(todo)
            }
        }
        else{
            addTodo(todo);
        }
        onClick(); //we enchure to cloje the bhutan
    };

    return (
        <Box className="add-todo-overlay">
            <Box className="add-todo-container" style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', maxWidth: '400px', margin: 'auto' }}>
                <Typography variant="h5" sx={{ color: 'blue', marginBottom: '10px' }}>
                    {existingTodo?'Update Todo':'Add Todo'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        required
                        placeholder="Todo content"
                        value={todo.todo_Content}
                        onChange={handleTodoInput}
                        sx={{ width: '100%', marginBottom: '10px' }}
                    />
                    <TextField
                        required
                        type="date"
                        value={todo.date_of_completion}
                        onChange={handleDateChange}
                        inputProps={{
                            min: today // Disable past dates
                        }}
                        sx={{ width: '100%', marginBottom: '10px' }}
                    />
                    <Box display="flex" justifyContent="space-between">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ backgroundColor: 'blue', '&:hover': { backgroundColor: '#1a73e8' } }}
                        >
                            Create Task
                        </Button>
                        <Button sx={{ color: 'grey' }} onClick={onClick}>
                            Close
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default AddTodo;
