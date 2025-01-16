import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './utils';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_BASE_URL + 'usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                const token = data.token;

                localStorage.setItem('token', token);

                const decoded = JSON.parse(atob(token.split('.')[1]));
                const role = decoded.role;

                if (role === 'admin') {
                    navigate('/admin');
                } else if (role === 'localizador') {
                    navigate('/localizador');
                }
            } else {
                setMessage(data.message || 'Error en el login');
            }
        } catch (error) {
            setMessage('Error de conexión');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Iniciar sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Iniciar sesión</button>
                </form>
                {message && <p className="text-center mt-3">{message}</p>}
            </div>
        </div>
    );
};

export default Login;
