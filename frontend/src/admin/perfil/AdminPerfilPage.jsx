import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../utils';
import TituloConRegreso from '../../components/TituloConRegreso';

const AdminPerfilPage = () => {
    const [perfil, setPerfil] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setMessage('Token no encontrado. Por favor, inicia sesión.');
                    return;
                }

                const decoded = JSON.parse(atob(token.split('.')[1]));
                const role = decoded.role;

                if (role !== 'admin') {
                    setMessage('No tienes permisos para acceder a esta sección.');
                    return;
                }

                const response = await fetch(`${API_BASE_URL}usuarios/admin`);
                const data = await response.json();

                if (response.ok) {
                    setPerfil(data);
                } else {
                    setMessage('No se pudo cargar el perfil');
                }
            } catch (error) {
                console.error('Error al decodificar el token o al conectar con la API:', error);
                setMessage('Error al conectar con la API');
            }
        };

        fetchPerfil();
    }, []);

    return (
        <div className="container text-center my-5">
            <TituloConRegreso titulo="Perfil del Administrador" to="/admin" />

            {message && <p className="text-danger">{message}</p>}

            {perfil ? (
                <div className=" mx-auto p-4 shadow" style={{ maxWidth: '400px' }}>
                    <p className="fw-bold mb-4">Usuario:</p>
                    <p className="fs-4 fw-bold text-primary">{perfil.username}</p>
                    <br />
                    <p className="fw-bold mt-4">Rol:</p>
                    <span className="badge bg-success fs-6 p-2">
                        Administrador
                    </span>
                </div>
            ) : (
                <p>No se ha encontrado información de perfil.</p>
            )}
        </div>
    );
};

export default AdminPerfilPage;
