import React, { useContext, useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Login = () => {

    const {login}=useContext(UserContext);

    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
     
        
     login(userDetails);
        
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value  // Ensures email and password are set as key-value pairs
        }));
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
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" marginTop={2}>
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            name="email"
                            value={userDetails.email}
                            onChange={handleChange}
                            required
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            name="password"
                            value={userDetails.password}
                            onChange={handleChange}
                            required
                            sx={{ marginBottom: 2 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: 2 }}
                        >
                            Login
                        </Button>
                        <Box sx={{ display: "flex" }}>
                            <Typography mr={4}> Don't have an account? </Typography>
                            <Link to='/register'>sign-up</Link>
                        </Box>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;
