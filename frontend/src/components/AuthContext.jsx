import React, {createContext, useContext, useState} from 'react';
import axios from '../utils';

const AuthContext = createContext();

export const UseAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const userString = localStorage.getItem("user");

        if (userString != null) {
            const userObj = JSON.parse(localStorage.getItem("user"));
    
            if (Object.hasOwn(userObj, 'username') && userObj.username.length > 0) {
                return true;
            }
        }

        return false;
    });

    const login = async (username, password) => {
        const response = await axios.post('/login', {username, password});
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify({
            id: response.data.id,
            username: response.data.name,
            isActivated: response.data.isActivated
        }));
        setIsAuthenticated(true);
    };

    const registration = (username, password) => {
        const response = axios.post('/register', {username, password});
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    }

    const deleteUser = async () => {
        const username = JSON.parse(localStorage.getItem('user')).username;
        const response = await axios.delete(`/delete/${username}`);
        logout();


    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, registration, deleteUser}}>
            {children}
        </AuthContext.Provider>
    );   
}
