// src/admin/Perfil/AdminPerfilPage.jsx
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../utils';
import TituloConRegreso from '../../components/TituloConRegreso';

const AdminPerfilPage = () => {
    const [perfil, setPerfil] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const response = await fetch(API_BASE_URL + 'admin/perfil');
                const data = await response.json();

                if (response.ok) {
                    setPerfil(data);
                } else {
                    setMessage('No se pudo cargar el perfil');
                }
            } catch (error) {
                setMessage('Error al conectar con la API');
            }
        };

        fetchPerfil();
    }, []);

    return (
        <div className="container text-center my-5">
            <TituloConRegreso titulo="Perfil del Administrador" to="/admin" />
            <p>Aquí podrás ver y editar tu perfil de administrador.</p>

            {message && <p className="text-danger">{message}</p>}

            {perfil ? (
                <div>
                    <p><strong>Nombre:</strong> {perfil.nombre}</p>
                    <p><strong>Correo:</strong> {perfil.correo}</p>
                    <p><strong>Teléfono:</strong> {perfil.telefono}</p>
                </div>
            ) : (
                <p>No se ha encontrado información de perfil.</p>
            )}
        </div>
    );
};

export default AdminPerfilPage;
