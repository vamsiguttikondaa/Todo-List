import React, { useContext, useEffect } from 'react';
import { Box, Card, CardContent, Checkbox, Typography, IconButton, Grid } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { UserContext } from '../UserContext';
import { TodoContext } from '../TodoContext';

  
const TodoCard = ({ todo }) => {
    return (
      <Card sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, boxShadow: 3 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          {/* Checkbox */}
          <Checkbox
            color="primary"
            sx={{ padding: 0 }}
          />
  
          {/* Task Title */}
          <Box sx={{ flex: 1, paddingLeft: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 0.5 }}>
              {todo.todo_Content} {/* Access the correct property for title */}
            </Typography>
            {/* Completion Date */}
            <Typography variant="body2" color="text.secondary">
              Due: {new Date(todo.date_of_completion).toLocaleDateString()} {/* Use the correct date field */}
            </Typography>
          </Box>
  
          {/* Edit and Delete Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="primary">
              <Edit />
            </IconButton>
            <IconButton color="error">
              <Delete />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    );
  };

const TodoList = () => {
  const {todos,user}=useContext(UserContext);
  const {fetchTodos}=useContext(TodoContext);

    useEffect(()=>{

      if(user && todos.length==0){
        fetchTodos();

      }

    },[user,todos])



    console.log(todos);
  return (
    <Box sx={{ margin: 2 }}>
    {Array.isArray(todos) && todos.length > 0 ? (
      todos.map((todo) => (
        <TodoCard key={todo.todo_Id} todo={todo} />
      ))
    ) : (
      <Typography>No Todos available</Typography>
    )}
  </Box>
  );
};

export default TodoList;
