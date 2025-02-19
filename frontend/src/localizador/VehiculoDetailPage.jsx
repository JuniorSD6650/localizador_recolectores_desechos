import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../utils';
import TituloConRegreso from '../components/TituloConRegreso/TituloConRegreso';

const formatDate = (dateString) => {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/');
    return new Date(`${year}-${month}-${day}T${timePart}`).toLocaleString();
};

const VehiculoDetailPage = () => {
    const { recolectorId } = useParams();
    const [recolector, setRecolector] = useState(null);
    const [ubicacionEnlace, setUbicacionEnlace] = useState('');
    const [estadoOperativo, setEstadoOperativo] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecolector = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}recolectores/${recolectorId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setRecolector(data);
                    setUbicacionEnlace(data.ubicacion_enlace || '');
                    setEstadoOperativo(data.estado_operativo || '');
                } else {
                    const errorData = await response.json();
                    showErrorAlert('Error', errorData.message || 'No se pudo cargar la información del recolector.');
                }
            } catch (error) {
                showErrorAlert('Error', 'Hubo un problema al conectar con la API.');
                console.error('Error:', error);
            }
        };

        fetchRecolector();
    }, [recolectorId]);

    const handleUpdateEnlace = async (e) => {
        e.preventDefault();

        if (!ubicacionEnlace.trim()) {
            showErrorAlert('Error', 'El enlace de ubicación no puede estar vacío.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}recolectores/${recolectorId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ubicacion_enlace: ubicacionEnlace.trim() }),
            });

            if (response.ok) {
                showSuccessAlert('Éxito', 'El enlace de ubicación ha sido actualizado.');
            } else {
                const errorData = await response.json();
                showErrorAlert('Error', errorData.message || 'No se pudo actualizar el enlace de ubicación.');
            }
        } catch (error) {
            showErrorAlert('Error', 'Hubo un problema al conectar con la API.');
            console.error('Error:', error);
        }
    };

    const handleToggleEstadoOperativo = async () => {
        try {
            const newEstadoOperativo = estadoOperativo === 'operativo' ? 'inoperativo' : 'operativo';
            const response = await fetch(`${API_BASE_URL}recolectores/${recolectorId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado_operativo: newEstadoOperativo }),
            });

            if (response.ok) {
                setEstadoOperativo(newEstadoOperativo);
                showSuccessAlert('Éxito', `El estado operativo ha sido cambiado a ${newEstadoOperativo}.`);
            } else {
                const errorData = await response.json();
                showErrorAlert('Error', errorData.message || 'No se pudo cambiar el estado operativo.');
            }
        } catch (error) {
            showErrorAlert('Error', 'Hubo un problema al conectar con la API.');
            console.error('Error:', error);
        }
    };

    if (!recolector) {
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
            <TituloConRegreso titulo="Detalles del Vehículo" to="/localizador" />
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold mb-2">Vehículo: {recolector.nombre_recolector}</h1>
                    <h2 className="text-xl mb-2">Placa: {recolector.placa}</h2>
                    <h3 className="text-lg mb-2">Tipo de Vehículo: {recolector.tipo_vehiculo}</h3>
                    <h3 className="text-lg mb-2">Estado Operativo: {estadoOperativo}</h3>
                    <h3 className="text-lg mb-2">Fecha de Última Actualización: {formatDate(recolector.fecha_ubicacion_actualizada)}</h3>
                </div>
                <form onSubmit={handleUpdateEnlace} className="mb-6">
                    <div className="mb-4">
                        <label htmlFor="ubicacionEnlace" className="block text-sm font-medium text-gray-700">
                            Enlace de Ubicación
                        </label>
                        <input
                            type="text"
                            id="ubicacionEnlace"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={ubicacionEnlace}
                            onChange={(e) => setUbicacionEnlace(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                    >
                        Actualizar Ubicación
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <h4 className="text-lg font-semibold mb-2">Estado Operativo</h4>
                    <span className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${estadoOperativo === 'operativo' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                        {estadoOperativo === 'operativo' ? 'Operativo' : 'Inoperativo'}
                    </span>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mt-3 w-full"
                        onClick={handleToggleEstadoOperativo}
                    >
                        Cambiar Estado Operativo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VehiculoDetailPage;