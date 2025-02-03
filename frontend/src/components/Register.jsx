import React, { useState, useContext } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { UserContext } from '../UserContext';


const Register = () => {
    const [email, setEmail] = useState('');
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useContext(UserContext);  // Access the register function from context

    const handleSubmit = (event) => {
        event.preventDefault();
        const userDetails = { email, userName, password };
        register(userDetails);  // Call the register function
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f4f4f4',
            }}
        >
            <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
                <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" marginTop={2}>
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Username"
                            variant="outlined"
                            value={userName}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            sx={{ marginBottom: 2 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: 2 }}
                           
                        >
                            Register
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default Register;
