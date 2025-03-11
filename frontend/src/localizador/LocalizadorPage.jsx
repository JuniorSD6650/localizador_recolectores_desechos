import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, calculateTimeAgo, showSuccessAlert, showErrorAlert } from '../utils';
import TituloConRegreso from '../components/TituloConRegreso/TituloConRegreso';
import { format, isSameDay, parse } from 'date-fns';
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
                console.log('Jornadas response:', data);
                
                if (data.jornadas.length > 0) {
                    const lastJornada = data.jornadas[0];
                    
                    // Parse the date from DD/MM/YYYY format
                    let lastJornadaDate;
                    try {
                        // Parse the date using date-fns parse function
                        lastJornadaDate = parse(
                            lastJornada.fecha_inicio, 
                            'dd/MM/yyyy HH:mm:ss', 
                            new Date()
                        );
                        console.log('Parsed jornada date:', lastJornadaDate);
                    } catch (e) {
                        console.error('Error parsing date:', e);
                        // Fallback: try to manually parse the date
                        const [datePart, timePart] = lastJornada.fecha_inicio.split(' ');
                        const [day, month, year] = datePart.split('/');
                        lastJornadaDate = new Date(`${year}-${month}-${day}T${timePart}`);
                        console.log('Fallback parsed date:', lastJornadaDate);
                    }
                    
                    const today = new Date();
                    console.log('Today:', today);
                    
                    setJornadaId(lastJornada.id);
                    const isToday = isSameDay(lastJornadaDate, today);
                    const hasNoEndDate = !lastJornada.fecha_fin;
                    console.log('Is same day:', isToday);
                    console.log('Has no end date:', hasNoEndDate);
                    
                    setIsSameDayJornada(isToday && hasNoEndDate);
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
                const data = await response.json();
                console.log('Start jornada response:', data);
                
                showSuccessAlert('Éxito', 'Jornada iniciada correctamente.');
                
                // Manually set the state instead of waiting for fetchPersonal
                if (data && data.jornada && data.jornada.id) {
                    setJornadaId(data.jornada.id);
                    setIsSameDayJornada(true);
                    console.log('Manually setting jornada state:', data.jornada.id);
                }
                
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <div className="text-center mb-6">
                        <div className="w-20 h-20 bg-customBlue rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
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
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-6">
                        <h4 className="text-lg font-semibold mb-4">Marcar asistencia</h4>
                        {!isSameDayJornada ? (
                            <>
                                <textarea
                                    className="my-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-eco-blue focus:border-eco-blue sm:text-sm"
                                    rows="3"
                                    value={observaciones}
                                    onChange={(e) => setObservaciones(e.target.value)}
                                    placeholder="Observaciones"
                                ></textarea>

                                <button
                                    className="bg-customBlue text-white p-2 rounded hover:bg-blue-600 w-full"
                                    onClick={handleStartJornada}
                                >
                                    Marcar Entrada
                                </button>
                            </>
                        ) : (
                            <button
                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 w-full"
                                onClick={handleEndJornada}
                            >
                                Marcar Salida
                            </button>
                        )}
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                        {personal.recolectores && personal.recolectores.length > 0 && (
                            <div>
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
                                                className="bg-customBlue text-white px-4 py-2 rounded hover:bg-blue-600 mt-3 w-full"
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