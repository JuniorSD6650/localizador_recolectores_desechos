import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, calculateTimeAgo } from '../utils';
import TituloConRegreso from '../components/TituloConRegreso/TituloConRegreso';

const LocalizadorPage = () => {
    const [personal, setPersonal] = useState(null);
    const [credenciales, setCredenciales] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const fetchPersonal = useCallback(async () => {
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
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPersonal({
                    ...data.usuario,
                    tiempoUbicacionActualizada: data.usuario.fecha_ubicacion_actualizada ? calculateTimeAgo(data.usuario.fecha_ubicacion_actualizada) : 'Sin fecha de actualización',
                });
                setCredenciales(data.credenciales);
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'No se pudo cargar la información del personal.');
            }
        } catch (err) {
            console.error('Error al conectar con la API:', err);
            setMessage('Error al procesar la solicitud.');
        }
    }, [navigate]);

    useEffect(() => {
        fetchPersonal();
    }, [fetchPersonal]);

    const handleEditVehicle = (recolectorId) => {
        navigate(`/localizador/vehiculo/${recolectorId}`);
    };

    if (message) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">{message}</p>
            </div>
        );
    }

    if (!personal) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen mt-16">
            <TituloConRegreso titulo="Vista de Localizador" />
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold mb-2">Bienvenido, {credenciales.username}</h1>
                    <h2 className="text-xl mb-2">Rol: {personal.role}</h2>
                    <h3 className="text-lg mb-2">Nombre: {personal.nombres} {personal.primer_apellido} {personal.segundo_apellido}</h3>
                    <h3 className="text-lg mb-2">Email: {personal.email}</h3>
                    <h3 className="text-lg mb-2">Teléfono: {personal.telefono}</h3>
                    <p className="mb-4">Última ubicación actualizada: {personal.tiempoUbicacionActualizada}</p>
                </div>
                {personal.recolectores && personal.recolectores.length > 0 && (
                    <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-4">Recolectores Asignados</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {personal.recolectores.map((recolector) => (
                                <div key={recolector.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                    <h5 className="text-md font-semibold mb-2">{recolector.nombre_recolector}</h5>
                                    <p className="text-sm mb-2">Placa: {recolector.placa}</p>
                                    <p className="text-sm mb-2">Tipo: {recolector.tipo_vehiculo}</p>
                                    <p className="text-sm mb-2">Estado: {recolector.estado_operativo}</p>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-3 w-full"
                                        onClick={() => handleEditVehicle(recolector.id)}
                                    >
                                        Editar Vehículo
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LocalizadorPage;