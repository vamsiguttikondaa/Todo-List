import React, { useContext, useEffect } from 'react';
import { Box, Card, CardContent, Checkbox, Typography, IconButton, Grid2 } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { UserContext } from '../UserContext';
import { TodoContext } from '../TodoContext';


  
const TodoCard = ({ todo }) => {
  const {editTodo,deleteTodo,statusTodo}=useContext(TodoContext);
    return (
      <Card sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, boxShadow: 3 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', width: '100%',minWidth:'700px' }}>
          {/* Checkbox */}
          <Checkbox
  color="primary"
  sx={{ padding: 0 }}
  checked={Boolean(todo.status)} // Ensure it's treated as boolean
  onClick={() =>{
    console.log("status before change",todo.status);
    
    statusTodo(todo.todo_Id)}} // Use onChange instead of onClick
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
            <IconButton color="primary" onClick={()=>editTodo(todo)}>
            <Edit />
            </IconButton>
            <IconButton color="error" onClick={()=>deleteTodo(todo.todo_Id)}>
              <Delete />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    );
  };
  const TodoList = () => {
    const { todos, user } = useContext(UserContext);
    const { fetchTodos } = useContext(TodoContext);
  
    // Filter todos into completed and incomplete
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

    const completedTodos = todos.filter((todo) => todo.status === true);
    const incompleteTodos = todos.filter((todo) => todo.status === false && todo.date_of_completion >= currentDate);
    const outdatedTodos = todos.filter((todo) => todo.status === false && todo.date_of_completion < currentDate);
    
  
    useEffect(() => {
      if (user) {
        fetchTodos();
      }
    }, [user]);
  
    return (
      <>
        {/* Completed Todos Section */}
        <Box sx={{ margin: 2 }}>
          <Typography variant="h3" sx={{ color: 'blue', marginBottom: 2 }}>
            Completed Todos
          </Typography>
          <Grid2 container spacing={2}>
            {Array.isArray(completedTodos) && completedTodos.length > 0 ? (
              completedTodos.map((todo) => (
                <Grid2 item xs={12} sm={6} md={4} key={todo.todo_Id}>
                  <TodoCard todo={todo} />
                </Grid2>
              ))
            ) : (
              <Typography>No Completed Todos available</Typography>
            )}
          </Grid2>
        </Box>
  
        {/* Incomplete Todos Section */}
        <Box sx={{ margin: 2 }}>
          <Typography variant="h3" sx={{ color: 'blue', marginBottom: 2 }}>
            Incomplete Todos
          </Typography>
          <Grid2 container spacing={2}>
            {Array.isArray(incompleteTodos) && incompleteTodos.length > 0 ? (
              incompleteTodos.map((todo) => (
                <Grid2 item xs={12} sm={6} md={4} key={todo.todo_Id}>
                  <TodoCard todo={todo} />
                </Grid2>
              ))
            ) : (
              <Typography>No Incomplete Todos available</Typography>
            )}
          </Grid2>
        </Box>
        {/* outdated Todos Section */}
        <Box sx={{ margin: 2 }}>
          <Typography variant="h3" sx={{ color: 'blue', marginBottom: 2 }}>
            Outdated Todos
          </Typography>
          <Grid2 container spacing={2}>
            {Array.isArray(outdatedTodos) && outdatedTodos.length > 0 ? (
              outdatedTodos.map((todo) => (
                <Grid2 item xs={12} sm={6} md={4} key={todo.todo_Id}>
                  <TodoCard todo={todo} />
                </Grid2>
              ))
            ) : (
              <Typography>No past todos</Typography>
            )}
          </Grid2>
        </Box>
  
      </>
    );
  };
  

export default TodoList;
