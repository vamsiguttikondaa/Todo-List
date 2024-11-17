import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import { TodoProvider } from './TodoContext';

import Login from './components/Login';
import Register from './components/Register';
import Main from './components/Main';

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider> {/* UserProvider wraps TodoProvider */}
        <TodoProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Main />} />
          </Routes>
        </TodoProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
