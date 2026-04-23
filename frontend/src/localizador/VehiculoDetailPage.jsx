import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../utils';
import TituloConRegreso from '../components/TituloConRegreso/TituloConRegreso';
import Cargando from '../components/Cargando/carga';
import withLoading from '../components/Cargando/withLoading';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const VehiculoDetailPage = () => {
    const { recolectorId } = useParams();
    const [recolector, setRecolector] = useState(null);
    const [ubicacionEnlace, setUbicacionEnlace] = useState('');
    const [estadoOperativo, setEstadoOperativo] = useState('');
    const [isSharing, setIsSharing] = useState(false);

    const watchIdRef = useRef(null);
    const lastCoordsRef = useRef({ lat: null, lng: null });
    const transmissionIntervalRef = useRef(null);

    const apiRequest = async (end, meth = 'GET', body = null) => {
        try {
            const res = await fetch(`${API_BASE_URL}${end}`, {
                method: meth,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: body ? JSON.stringify(body) : null
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Error en el servidor');
            return data;
        } catch (err) {
            showErrorAlert('Error', err.message);
            return null;
        }
    };

    useEffect(() => {
        (async () => {
            const d = await apiRequest(`recolectores/${recolectorId}`);
            if (d) {
                setRecolector(d);
                setUbicacionEnlace(d.ubicacion_enlace || '');
                setEstadoOperativo(d.estado_operativo || '');
            }
        })();
        return () => stopTracking();
    }, [recolectorId]);

    const stopTracking = () => {
        if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
        if (transmissionIntervalRef.current) clearInterval(transmissionIntervalRef.current);
        watchIdRef.current = null;
        transmissionIntervalRef.current = null;
        setIsSharing(false);
    };

    // Actualización de enlace con sincronización de respuesta del servidor
    const handleUpdateEnlace = async () => {
        const valorOriginal = recolector.ubicacion_enlace || '';
        const valorEnviado = ubicacionEnlace.trim() === '' ? null : ubicacionEnlace.trim();

        const data = await apiRequest(`recolectores/${recolectorId}`, 'PUT', {
            ubicacion_enlace: valorEnviado
        });

        if (data && data.recolector) {
            // ÉXITO: Actualizamos ambos estados con la verdad del servidor
            setRecolector(data.recolector);
            setUbicacionEnlace(data.recolector.ubicacion_enlace || '');
            showSuccessAlert('Éxito', data.message);
        } else {
            // ERROR: El backend falló, regresamos el input a su valor anterior
            setUbicacionEnlace(valorOriginal);
            // El showErrorAlert ya se dispara dentro de apiRequest
        }
    };

    const startTracking = () => {
        if (isSharing) {
            stopTracking();
            showSuccessAlert('GPS', 'Transmisión detenida');
            return;
        }

        if (!("geolocation" in navigator)) return showErrorAlert('Error', 'GPS no disponible');

        watchIdRef.current = navigator.geolocation.watchPosition(
            (pos) => {
                lastCoordsRef.current = {
                    lat: pos.coords.latitude.toString(),
                    lng: pos.coords.longitude.toString()
                };
            },
            (err) => {
                stopTracking();
                const msg = err.code === 1 ? "Permiso GPS denegado" : "Error al obtener ubicación";
                showErrorAlert('GPS Error', msg);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );

        setIsSharing(true);
        showSuccessAlert('En vivo', 'Transmitiendo coordenadas cada 2s');

        transmissionIntervalRef.current = setInterval(async () => {
            const { lat, lng } = lastCoordsRef.current;
            if (!lat || !lng) return;

            try {
                await fetch(`${API_BASE_URL}recolectores/${recolectorId}/ubicacion`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ latitud: lat, longitud: lng })
                });
            } catch (e) { console.error("Error envío GPS:", e); }
        }, 2000);
    };

    if (!recolector) return <Cargando />;

    return (
        <div className="container mx-auto px-4 py-8 mt-16 min-h-screen">
            <TituloConRegreso titulo="Gestión de Unidad" to="/localizador" />
            <div className="flex justify-center">
                <div className="bg-white shadow-xl rounded-2xl p-6 max-w-4xl w-full border border-gray-100 flex flex-wrap md:flex-nowrap gap-8">

                    <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-8">
                        <div className="space-y-1 mb-6">
                            <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">{recolector.nombre_recolector}</h1>
                            <p className="text-blue-600 font-bold text-lg">{recolector.placa}</p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <LocalShippingIcon sx={{ fontSize: 40, color: estadoOperativo === 'operativo' ? '#10b981' : '#ef4444' }} />
                                <span className={`text-sm font-bold uppercase ${estadoOperativo === 'operativo' ? 'text-green-600' : 'text-red-600'}`}>{estadoOperativo}</span>
                            </div>
                            <button onClick={async () => {
                                const n = estadoOperativo === 'operativo' ? 'inoperativo' : 'operativo';
                                const res = await apiRequest(`recolectores/${recolectorId}`, 'PUT', { estado_operativo: n });
                                if (res) setEstadoOperativo(n);
                            }} className="bg-white border border-gray-200 text-gray-700 text-xs font-bold px-3 py-2 rounded-lg hover:bg-gray-100 transition shadow-sm">
                                CAMBIAR
                            </button>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">Enlace de rastreo (Maps/Externo)</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    className="flex-1 bg-gray-50 border-none rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Vacío para eliminar enlace"
                                    value={ubicacionEnlace}
                                    onChange={(e) => setUbicacionEnlace(e.target.value)}
                                />
                                <button onClick={handleUpdateEnlace} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors">OK</button>
                            </div>
                        </div>

                        <button onClick={startTracking}
                            className={`w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase transition-all shadow-lg ${isSharing ? 'bg-green-500 text-white border-b-4 border-green-700' : 'bg-red-600 text-white hover:bg-red-700'}`}>
                            {isSharing ? '📡 Transmitiendo en vivo' : 'Iniciar GPS Integrado'}
                        </button>

                        {isSharing && (
                            <p className="text-[10px] text-center text-green-600 font-bold animate-pulse uppercase">
                                Actualizando coordenadas cada 2 segundos...
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default withLoading(VehiculoDetailPage);