import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, calculateTimeAgo, showSuccessAlert, showErrorAlert } from '../utils';
import TituloConRegreso from '../components/TituloConRegreso';
import './LocalizadorPage.css';

const LocalizadorPage = () => {
    const [localizador, setLocalizador] = useState(null);
    const [message, setMessage] = useState('');
    const [ubicacionEnlace, setUbicacionEnlace] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLocalizador = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const decoded = JSON.parse(atob(token.split('.')[1]));
                const userId = decoded.id;

                const response = await fetch(`${API_BASE_URL}usuarios/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setLocalizador({
                        ...data,
                        tiempoUbicacionActualizada: calculateTimeAgo(data.fecha_ubicacion_actualizada),
                    });
                    setUbicacionEnlace(data.ubicacion_enlace || '');
                } else {
                    const errorData = await response.json();
                    setMessage(errorData.message || 'No se pudo cargar la información del localizador.');
                }
            } catch (err) {
                console.error('Error al conectar con la API:', err);
                setMessage('Error al procesar la solicitud.');
            }
        };

        fetchLocalizador();
    }, [navigate]);

    const handleUpdateEnlace = async (e) => {
        e.preventDefault();

        if (!ubicacionEnlace) {
            showErrorAlert('Error', 'El enlace de ubicación no puede estar vacío.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}recolectores/${localizador.recolector_id}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ubicacion_enlace: ubicacionEnlace }),
            });

            if (response.ok) {
                const updatedData = await response.json();

                // Actualizar el estado de localizador y mantener la sincronización de ubicacionEnlace
                setLocalizador((prev) => ({
                    ...prev,
                    ubicacion_enlace: updatedData.ubicacion_enlace,
                    tiempoUbicacionActualizada: calculateTimeAgo(updatedData.fecha_ubicacion_actualizada),
                }));

                // Sincronizar el estado de ubicacionEnlace con el nuevo valor
                setUbicacionEnlace(updatedData.ubicacion_enlace);

                showSuccessAlert('Éxito', 'El enlace de ubicación ha sido actualizado.');
            } else {
                showErrorAlert('Error', 'No se pudo actualizar el enlace de ubicación.');
            }
        } catch (error) {
            showErrorAlert('Error', 'Hubo un problema al conectar con la API.');
            console.error('Error:', error);
        }
    };

    const handleToggleEstado = async () => {
        try {
            const newEstado = localizador.estado === 'activo' ? 'inactivo' : 'activo';

            const response = await fetch(`${API_BASE_URL}recolectores/${localizador.recolector_id}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado: newEstado }),
            });

            if (response.ok) {
                showSuccessAlert('Éxito', `El estado ha sido cambiado a ${newEstado}.`);
                setLocalizador((prev) => ({
                    ...prev,
                    estado: newEstado,
                }));
            } else {
                showErrorAlert('Error', 'No se pudo cambiar el estado.');
            }
        } catch (error) {
            showErrorAlert('Error', 'Hubo un problema al conectar con la API.');
            console.error('Error:', error);
        }
    };

    if (message) {
        return (
            <div className="error-container text-center">
                <p className="text-danger">{message}</p>
            </div>
        );
    }

    if (!localizador) {
        return (
            <div className="loading-container text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container localizador-page">
            <TituloConRegreso titulo="Vista de Localizador" />
            <div className="localizador-content text-center">
                <h1 className="mb-3">Bienvenido, {localizador.username}</h1>
                <h2 className="mb-3">Rol: {localizador.role}</h2>
                <h3 className="mb-3">Recolector Asignado: {localizador.nombre_recolector || 'No asignado'}</h3>
                <p className="mb-3">Última ubicación actualizada: {localizador.tiempoUbicacionActualizada}</p>
                <form onSubmit={handleUpdateEnlace}>
                    <div className="form-group">
                        <label htmlFor="ubicacionEnlace">Enlace de Ubicación</label>
                        <input
                            type="text"
                            id="ubicacionEnlace"
                            className="form-control"
                            value={ubicacionEnlace}
                            onChange={(e) => setUbicacionEnlace(e.target.value)}
                        />

                        <button type="submit" className="btn btn-primary mt-3">
                            Actualizar Ubicación
                        </button>
                    </div>
                </form>
                <div className="estado-recolector mt-4">
                    <h4>Estado del Recolector</h4>
                    <span
                        className={`badge ${localizador.estado === 'activo' ? 'bg-success' : 'bg-danger'}`}
                    >
                        {localizador.estado === 'activo' ? 'Activo' : 'Inactivo'}
                    </span>
                    <button
                        className="btn btn-secondary mt-3"
                        onClick={handleToggleEstado}
                    >
                        Cambiar a {localizador.estado === 'activo' ? 'Inactivo' : 'Activo'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LocalizadorPage;
