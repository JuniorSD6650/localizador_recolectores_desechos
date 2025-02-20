import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, calculateTimeAgo, showSuccessAlert, showErrorAlert } from '../utils';
import TituloConRegreso from '../components/TituloConRegreso/TituloConRegreso';
import { format, isSameDay } from 'date-fns';
import withLoading from '../components/Cargando/withLoading';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const LocalizadorPage = ({ isLoading }) => {
    const [personal, setPersonal] = useState(null);
    const [credenciales, setCredenciales] = useState(null);
    const [message, setMessage] = useState('');
    const [observaciones, setObservaciones] = useState('Ninguna observación');
    const [jornadaId, setJornadaId] = useState(null);
    const [isSameDayJornada, setIsSameDayJornada] = useState(false);
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
                checkJornada(userId);
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'No se pudo cargar la información del personal.');
            }
        } catch (err) {
            console.error('Error al conectar con la API:', err);
            setMessage('Error al procesar la solicitud.');
        }
    }, [navigate]);

    const checkJornada = async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}jornadas?usuario_id=${userId}&limit=1`);
            if (response.ok) {
                const data = await response.json();
                if (data.jornadas.length > 0) {
                    const lastJornada = data.jornadas[0];
                    const lastJornadaDate = new Date(lastJornada.fecha_inicio);
                    const today = new Date();
                    setJornadaId(lastJornada.id);
                    setIsSameDayJornada(isSameDay(lastJornadaDate, today) && !lastJornada.fecha_fin);
                }
            }
        } catch (error) {
            console.error('Error al verificar la jornada:', error);
        }
    };

    useEffect(() => {
        fetchPersonal();
    }, [fetchPersonal]);

    const handleStartJornada = async () => {
        try {
            const token = localStorage.getItem('token');
            const decoded = JSON.parse(atob(token.split('.')[1]));
            const userId = decoded.id;

            const response = await fetch(`${API_BASE_URL}jornadas`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ observaciones, usuario_id: userId }),
            });

            if (response.ok) {
                showSuccessAlert('Éxito', 'Jornada iniciada correctamente.');
                fetchPersonal();
            } else {
                const errorData = await response.json();
                showErrorAlert('Error', errorData.message || 'No se pudo iniciar la jornada.');
            }
        } catch (error) {
            showErrorAlert('Error', 'Hubo un problema al conectar con la API.');
            console.error('Error:', error);
        }
    };

    const handleEndJornada = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}jornadas/${jornadaId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fecha_fin: format(new Date(), 'yyyy-MM-dd HH:mm:ss') }),
            });

            if (response.ok) {
                showSuccessAlert('Éxito', 'Jornada finalizada correctamente.');
                setIsSameDayJornada(false);
                setJornadaId(null);
                setObservaciones('Ninguna observación');
                fetchPersonal();
            } else {
                const errorData = await response.json();
                showErrorAlert('Error', errorData.message || 'No se pudo finalizar la jornada.');
            }
        } catch (error) {
            showErrorAlert('Error', 'Hubo un problema al conectar con la API.');
            console.error('Error:', error);
        }
    };

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
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen mt-16">
            <TituloConRegreso titulo="Vista de Localizador" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl">
                    <div className="text-center mb-6">
                        <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                            {personal.nombres[0]}
                            {personal.primer_apellido[0]}
                        </div>
                        <h1 className="text-2xl font-bold">Bienvenido</h1>
                        <h1 className="text-4xl font-bold mb-5">{credenciales.username}</h1>
                        <h2 className="text-xl font-bold">Rol:</h2>
                        <h2 className="text-xl mb-2">{personal.role}</h2>
                        <h3 className="text-lg font-bold">Nombre:</h3>
                        <h3 className="text-lg mb-2">{personal.nombres} {personal.primer_apellido} {personal.segundo_apellido}</h3>
                        <h3 className="text-lg font-bold">Email:</h3>
                        <h3 className="text-lg mb-2">{personal.email}</h3>
                        <h3 className="text-lg font-bold">Teléfono:</h3>
                        <h3 className="text-lg mb-2">{personal.telefono}</h3>
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <div className="p-4 rounded-xl mb-4">
                        <h4 className="text-lg font-semibold mb-4">Marcar asistencia</h4>
                        {!isSameDayJornada ? (
                            <>
                                <input
                                    type="text"
                                    className="border rounded w-full mb-4 p-2"
                                    placeholder="Observaciones"
                                    value={observaciones}
                                    onChange={(e) => setObservaciones(e.target.value)}
                                />
                                <button
                                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
                                    onClick={handleStartJornada}
                                >
                                    Marcar Entrada
                                </button>
                            </>
                        ) : (
                            <button
                                className="bg-red-500 text-white px-4 rounded hover:bg-red-600 w-full"
                                onClick={handleEndJornada}
                            >
                                Marcar Salida
                            </button>
                        )}
                    </div>
                    <div className="p-4 rounded-xl">
                        {personal.recolectores && personal.recolectores.length > 0 && (
                            <div className="mt-6">
                                <h4 className="text-lg font-semibold mb-4">Recolectores Asignados</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {personal.recolectores.map((recolector) => (
                                        <div key={recolector.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                            <h5 className="text-md font-semibold mb-2">{recolector.nombre_recolector}</h5>
                                            <div className="grid grid-cols-3 xl:grid-cols-3 gap-2">
                                                <div className="col-span-2">
                                                    <p className="text-sm mb-2">Placa: {recolector.placa}</p>
                                                    <p className="text-sm mb-2">Tipo: {recolector.tipo_vehiculo}</p>
                                                    <p className="text-sm mb-2">Estado: {recolector.estado_operativo}</p>
                                                </div>
                                                <div className="flex items-center justify-center">
                                                    <LocalShippingIcon
                                                        style={{ fontSize: '50px', color: recolector.estado_operativo === 'operativo' ? 'green' : 'red' }}
                                                    />
                                                </div>
                                            </div>
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
            </div>
        </div>
    );
};

export default withLoading(LocalizadorPage);