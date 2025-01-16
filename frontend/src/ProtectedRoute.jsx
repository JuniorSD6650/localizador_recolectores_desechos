// src/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
        } else {
            try {
                const decoded = JSON.parse(atob(token.split('.')[1]));
                const role = decoded.role;

                if (role !== requiredRole) {
                    navigate('/login');
                } else {
                    setIsAuthorized(true);
                }
            } catch (err) {
                console.error('Error al decodificar el token:', err);
                navigate('/login');
            }
        }
    }, [navigate, requiredRole]);

    return isAuthorized ? children : null;
};

export default ProtectedRoute;
