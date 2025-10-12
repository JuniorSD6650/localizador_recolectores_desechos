import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../utils';
import TituloConRegreso from '../components/TituloConRegreso/TituloConRegreso';
import Cargando from '../components/Cargando/carga';
import withLoading from '../components/Cargando/withLoading';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const formatDate = (dateString) => {
    if (!dateString) return 'Sin fecha de actualización';
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/');
    return new Date(`${year}-${month}-${day}T${timePart}`).toLocaleString();
};

const VehiculoDetailPage = () => {
    const { recolectorId } = useParams();
    const [recolector, setRecolector] = useState(null);
    const [ubicacionEnlace, setUbicacionEnlace] = useState('');
    const [estadoOperativo, setEstadoOperativo] = useState('');
    const [isSharing, setIsSharing] = useState(false);
    const [errorGeo, setErrorGeo] = useState(null);
    const watchPositionRef = useRef(null);

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

    // Verificar soporte de geolocalización
    const checkGeolocationSupport = () => {
        if (!("geolocation" in navigator)) {
            showErrorAlert('Error', 'Tu dispositivo no soporta geolocalización');
            return false;
        }
        return true;
    };

    // Manejar errores de geolocalización
    const handleGeolocationError = (error) => {
        let mensaje = 'Error desconocido al obtener ubicación';
        switch (error.code) {
            case error.PERMISSION_DENIED:
                mensaje = 'Necesitamos permiso para acceder a tu ubicación';
                break;
            case error.POSITION_UNAVAILABLE:
                mensaje = 'La información de ubicación no está disponible';
                break;
            case error.TIMEOUT:
                mensaje = 'Se agotó el tiempo para obtener la ubicación';
                break;
        }
        setErrorGeo(mensaje);
        setIsSharing(false);
        showErrorAlert('Error', mensaje);
        if (watchPositionRef.current) {
            navigator.geolocation.clearWatch(watchPositionRef.current);
            watchPositionRef.current = null;
        }
    };

    // Limpiar al desmontar
    useEffect(() => {
        return () => {
            if (watchPositionRef.current) {
                navigator.geolocation.clearWatch(watchPositionRef.current);
                watchPositionRef.current = null;
            }
        };
    }, []);

    const handleShareLocation = async () => {
        if (!isSharing) {
            setErrorGeo(null);
            if (!checkGeolocationSupport()) return;

            try {
                // Opciones de geolocalización
                const options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                };

                // Iniciar seguimiento de ubicación
                watchPositionRef.current = navigator.geolocation.watchPosition(
                    async (position) => {
                        try {
                            const response = await fetch(`${API_BASE_URL}recolectores/${recolectorId}/ubicacion`, {
                                method: 'PUT',
                                headers: {
                                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    latitud: position.coords.latitude.toString(),
                                    longitud: position.coords.longitude.toString()
                                })
                            });

                            if (!response.ok) throw new Error('Error al actualizar ubicación');

                            // Solo mostrar alerta la primera vez
                            if (!isSharing) {
                                showSuccessAlert('Éxito', 'Compartiendo ubicación en tiempo real');
                                setIsSharing(true);
                            }
                        } catch (error) {
                            handleGeolocationError(error);
                        }
                    },
                    handleGeolocationError,
                    options
                );
            } catch (error) {
                handleGeolocationError(error);
            }
        } else {
            // Detener seguimiento
            if (watchPositionRef.current) {
                navigator.geolocation.clearWatch(watchPositionRef.current);
                watchPositionRef.current = null;
            }
            setIsSharing(false);
            showSuccessAlert('Éxito', 'Se ha detenido de compartir la ubicación');
        }
    };

    if (!recolector) {
        return (
            <Cargando />
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen mt-16">
            <TituloConRegreso titulo="Detalles del Vehículo" to="/localizador" />
            <div className='flex justify-center items-center'>
                <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold mb-2">Vehículo: {recolector.nombre_recolector}</h1>
                        <h2 className="text-xl mb-2">Placa: {recolector.placa}</h2>
                        <h3 className="text-lg mb-2">Tipo de Vehículo: {recolector.tipo_vehiculo}</h3>
                        <h3 className="text-lg mb-2">Estado Operativo: {estadoOperativo}</h3>
                        <h3 className="text-lg mb-2">Fecha de Última Actualización: {formatDate(recolector.fecha_ubicacion_actualizada)}</h3>
                    </div>
                    <div className="mt-4 text-center mb-6">
                        <h4 className="text-lg font-semibold mb-2">Estado Operativo</h4>
                        <span className={`inline-block px-2 py-1 text-sm font-medium rounded-full mb-2 `}>
                            <div className="flex flex-col items-center">
                                <LocalShippingIcon
                                    style={{ fontSize: '35px', color: estadoOperativo === 'operativo' ? 'green' : 'red' }}
                                />
                                <span>{estadoOperativo === 'operativo' ? 'Operativo' : 'Inoperativo'}</span>
                            </div>
                        </span>
                        <button
                            className="bg-customOrange text-white px-4 py-2 rounded hover:bg-customOrangeHover w-auto ml-2 mb-2"
                            onClick={handleToggleEstadoOperativo}
                        >
                            Cambiar Estado
                        </button>
                    </div>
                    <form onSubmit={handleUpdateEnlace} className="mb-6 text-center">
                        <div className="mb-4">
                            <h4 className="text-lg font-semibold mb-2"> Enlace de Ubicación</h4>
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
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full mb-4"
                        >
                            Actualizar Ubicación
                        </button>
                        <button
                            type="button"
                            onClick={handleShareLocation}
                            className={`${
                                isSharing 
                                    ? 'bg-green-500 hover:bg-green-600' 
                                    : 'bg-red-500 hover:bg-red-600'
                            } text-white px-4 py-2 rounded w-full transition-colors duration-300`}
                            disabled={!!errorGeo}
                        >
                            {isSharing ? 'Dejar de Compartir Ubicación' : 'Compartir Ubicación'}
                        </button>
                        {errorGeo && (
                            <p className="mt-2 text-red-500 text-sm">{errorGeo}</p>
                        )}
                    </form>

                </div>
            </div>
        </div>
    );
};

export default withLoading(VehiculoDetailPage);