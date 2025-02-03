import { Button, Typography, Box, Container, Avatar, Menu, MenuItem } from '@mui/material';
import React, { useContext, useState } from 'react';
import AddTodo from './AddTodo';
import '../style.css'
import { UserContext } from '../UserContext';
import TodoList from '../components/TodoList';
import { TodoContext } from '../TodoContext';
import {  useNavigate } from 'react-router-dom';

const Main = () => {
   const navigate=useNavigate();
    const { user, logout } = useContext(UserContext); // Assuming `logout` is available in the context
   
    const { showForm, AddClick, closeForm, editingTodo } = useContext(TodoContext);
    const [anchorEl, setAnchorEl] = useState(null); // For menu anchor
    const [open, setOpen] = useState(false); // To toggle the menu
   

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget); // Set the anchor element for the menu
        setOpen(true); // Open the menu
    };

    const handleCloseMenu = () => {
        setOpen(false); // Close the menu
    };

    const handleLogout = () => {
        logout(); // Call the logout function from the context
        setOpen(false); // Close the menu after logout
    };

    return (
        <Container>
            {/* Header Section */}
            <div className={showForm ? 'blurred' : ''}>
                {/* Profile Section - Top Left */}
                <Box display="flex" alignItems="center" mb={2}>
                    <Avatar
                        sx={{ cursor: 'pointer', backgroundColor: 'blue' }}
                        onClick={handleMenuClick}
                    >
                        {user?.userName?.charAt(0)} {/* Display first letter of user name */}
                    </Avatar>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                        PaperProps={{
                            elevation: 4,
                            sx: {
                                filter: 'drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.15))',
                            },
                        }}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
                    <Typography variant="h3" sx={{ color: 'blue' }}>
                        Todo List
                    </Typography>
                    <Box display="flex" alignItems="center">


                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ backgroundColor: 'blue', '&:hover': { backgroundColor: '#1a73e8' }, ml: 2 }}
                            onClick={AddClick}
                        >
                            Add Todo
                        </Button>
                    </Box>
                </Box>

                {/* Placeholder for Todo List Display */}
                <TodoList />

            </div>

            {/* addtodo form display based on condition */}
            <div>
                {showForm && <AddTodo existingTodo={editingTodo} onClick={closeForm} />}
            </div>
            {/* this is the space to show completed todos */}
           

        </Container>
    );
};

export default Main;
