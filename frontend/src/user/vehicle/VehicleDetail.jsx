import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL, calculateTimeAgo, parseDate } from '../../utils';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import UpdateIcon from '@mui/icons-material/Update';
import MapIcon from '@mui/icons-material/Map';
import TituloConRegreso from '../../components/TituloConRegreso/TituloConRegreso';
import RoutePreviewModal from '../../components/Map/RoutePreviewModal';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix íconos Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// CÓDIGO DEL ÍCONO PERSONALIZADO (LocalShippingIcon)
const truckIconSvg = `<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1g8w9s8" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LocalShippingIcon">
  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm13.5-8.5 2.5 3.5h-4V9h1.5v.5zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM4 6h10v2H4V6zm11 1.5h1.5v-2H15v2z"/>
</svg>`;

const truckIconStyle = `
  width: 32px;
  height: 32px;
  background-color: white;
  border-radius: 50%;
  border: 2px solid #1976D2;
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
`;

const truckLeafletIcon = L.divIcon({
    className: 'custom-truck-marker',
    html: `<div style="${truckIconStyle}">${truckIconSvg}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

// ----------------------------------------------------
// ✨ FUNCIÓN AUXILIAR PARA FORMATEAR FECHA DD/MM/AAAA HH:mm:ss
// ----------------------------------------------------
const formatRelativeOrAbsoluteTime = (dateString) => {
    if (!dateString) return 'Sin datos de ubicación';

    const date = parseDate(dateString);

    if (!date || isNaN(date.getTime())) {
        return 'Fecha no disponible';
    }

    const now = new Date();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (now - date < twentyFourHours) {
        return calculateTimeAgo(dateString);
    } else {
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }
};

const VehicleDetail = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [message, setMessage] = useState('');
    const [ubicacion, setUbicacion] = useState(null);
    const [userZoom, setUserZoom] = useState(15);
    const [showRouteModal, setShowRouteModal] = useState(false);

    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const routesLayerRef = useRef(null);

    // 🛣️ Dibuja el trazo de la ruta en el mapa principal ÚNICAMENTE si existe
    const drawRoutesIfAny = (map, zonasAsignadas) => {
        if (!map) return;

        if (!routesLayerRef.current) {
            routesLayerRef.current = L.layerGroup().addTo(map);
        } else {
            routesLayerRef.current.clearLayers();
        }

        if (!zonasAsignadas) return;

        const zonas = Array.isArray(zonasAsignadas) ? zonasAsignadas : [];

        zonas.forEach((zona) => {
            let coords = [];
            if (Array.isArray(zona.coordenadas_ruta)) {
                coords = zona.coordenadas_ruta;
            } else if (typeof zona.coordenadas_ruta === 'string') {
                try {
                    coords = JSON.parse(zona.coordenadas_ruta || '[]');
                } catch { }
            }

            if (Array.isArray(coords) && coords.length > 1) {
                const latlngs = coords
                    .filter((c) => c && typeof c.lat === 'number' && typeof c.lng === 'number')
                    .map((c) => [c.lat, c.lng]);

                if (latlngs.length > 1) {
                    const color = zona.color_ruta || '#1976D2';

                    L.polyline(latlngs, {
                        color: color,
                        weight: 5,
                        opacity: 0.85,
                    }).addTo(routesLayerRef.current);
                }
            }
        });
    };

    // 🚚 Obtener detalles del vehículo
    useEffect(() => {
        let isMounted = true;

        const fetchVehicle = async () => {
            try {
                const response = await fetch(API_BASE_URL + `recolectores/${id}`);
                const data = await response.json();
                if (!isMounted) return;

                if (response.ok && data) {
                    setVehicle(data);
                    if (data.latitud && data.longitud && !isNaN(parseFloat(data.latitud)) && !isNaN(parseFloat(data.longitud))) {
                        setUbicacion({
                            latitud: parseFloat(data.latitud),
                            longitud: parseFloat(data.longitud),
                            fecha_ubicacion_actualizada: data.fecha_ubicacion_actualizada || null,
                        });
                    }
                } else {
                    setMessage(data?.error || data?.message || 'No se pudo obtener los detalles del recolector');
                }
            } catch {
                if (isMounted) setMessage('Error al conectar con la API');
            }
        };

        fetchVehicle();

        return () => {
            isMounted = false;
        };
    }, [id]);

    // 📍 Obtener ubicación periódicamente en tiempo real
    useEffect(() => {
        let isMounted = true;

        const fetchUbicacion = async () => {
            try {
                const response = await fetch(API_BASE_URL + `recolectores/${id}/ubicacion`);
                const data = await response.json();
                if (!isMounted) return;

                if (response.ok && data && data.latitud && data.longitud && !isNaN(parseFloat(data.latitud)) && !isNaN(parseFloat(data.longitud))) {
                    setUbicacion({
                        latitud: parseFloat(data.latitud),
                        longitud: parseFloat(data.longitud),
                        fecha_ubicacion_actualizada: data.fecha_ubicacion_actualizada || null,
                    });
                }
            } catch { }
        };

        fetchUbicacion();
        const interval = setInterval(fetchUbicacion, 2000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [id]);

    // 🔹 Inicializar mapa de Leaflet una vez montado el contenedor en el DOM
    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;
        if (mapRef.current._leaflet_id) return;

        try {
            const hasValidCoords =
                ubicacion?.latitud &&
                ubicacion?.longitud &&
                !isNaN(parseFloat(ubicacion.latitud)) &&
                !isNaN(parseFloat(ubicacion.longitud));

            const lat = hasValidCoords ? parseFloat(ubicacion.latitud) : -9.9306;
            const lng = hasValidCoords ? parseFloat(ubicacion.longitud) : -76.2422;

            // Crear mapa optimizado centrado en el vehículo
            const map = L.map(mapRef.current, {
                preferCanvas: true // Optimización: renderizado en Canvas para alto rendimiento
            }).setView([lat, lng], userZoom);

            const MAX_ALLOWED_ZOOM = 17;
            map.setMaxZoom(MAX_ALLOWED_ZOOM);

            const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution:
                    '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                keepBuffer: 2,
                updateWhenIdle: true,
            });

            const esriSat = L.tileLayer(
                'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                {
                    maxZoom: MAX_ALLOWED_ZOOM,
                    keepBuffer: 2,
                    updateWhenIdle: true,
                    attribution:
                        'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
                }
            );

            osm.addTo(map);

            L.control.layers(
                {
                    'Mapa Estándar': osm,
                    'Satélite / Relieve': esriSat,
                }
            ).addTo(map);

            map.on('baselayerchange', (e) => {
                try {
                    if (!e) return;
                    map.setMaxZoom(MAX_ALLOWED_ZOOM);
                    if (map.getZoom() > MAX_ALLOWED_ZOOM) map.setZoom(MAX_ALLOWED_ZOOM);
                } catch (err) {
                    console.error('Error manejando baselayerchange:', err);
                }
            });

            map.on('zoomend', () => {
                setUserZoom(map.getZoom());
            });

            if (hasValidCoords) {
                const marker = L.marker([lat, lng], {
                    icon: truckLeafletIcon,
                })
                    .addTo(map)
                    .bindPopup(`Ubicación actual del vehículo<br/>Lat: ${lat}<br/>Long: ${lng}`)
                    .openPopup();

                markerRef.current = marker;
            }

            mapInstanceRef.current = map;

            if (vehicle?.zonas_asignadas) {
                drawRoutesIfAny(map, vehicle.zonas_asignadas);
            }

            setTimeout(() => {
                if (mapInstanceRef.current) {
                    mapInstanceRef.current.invalidateSize();
                }
            }, 250);
        } catch (error) {
            console.error('Error al inicializar el mapa:', error);
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
                markerRef.current = null;
                routesLayerRef.current = null;
            }
        };
    }, [vehicle]);

    // 🔹 Siempre fija y centra la cámara en el vehículo en tiempo real cuando recibe ubicación
    useEffect(() => {
        const map = mapInstanceRef.current;
        if (!map || !ubicacion?.latitud || !ubicacion?.longitud) return;

        const lat = parseFloat(ubicacion.latitud);
        const lng = parseFloat(ubicacion.longitud);
        if (isNaN(lat) || isNaN(lng)) return;

        if (!markerRef.current) {
            const marker = L.marker([lat, lng], {
                icon: truckLeafletIcon,
            })
                .addTo(map)
                .bindPopup(`Ubicación actual del vehículo<br/>Lat: ${lat}<br/>Long: ${lng}`)
                .openPopup();

            markerRef.current = marker;
            map.panTo([lat, lng], { animate: true, duration: 0.5 });
        } else {
            markerRef.current
                .setLatLng([lat, lng])
                .setPopupContent(
                    `Ubicación actual del vehículo<br/>Lat: ${lat}<br/>Long: ${lng}`
                );

            // Siempre fijando y siguiendo al vehículo
            map.panTo([lat, lng], { animate: true, duration: 0.5 });
        }
    }, [ubicacion]);

    // 🛣️ Si se cargan o actualizan las zonas del vehículo, dibujar trazo si existe
    useEffect(() => {
        if (mapInstanceRef.current && vehicle?.zonas_asignadas) {
            drawRoutesIfAny(mapInstanceRef.current, vehicle.zonas_asignadas);
        }
    }, [vehicle]);

    // ⚠️ Estados de carga / error
    if (message) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">{message}</p>
            </div>
        );
    }

    if (!vehicle) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    // Rutas válidas para el modal de visualización completa
    const validRoutes = useMemo(() => {
        return Array.isArray(vehicle?.zonas_asignadas)
            ? vehicle.zonas_asignadas.filter((z) => {
                let coords = z.coordenadas_ruta;
                if (typeof coords === 'string') {
                    try { coords = JSON.parse(coords || '[]'); } catch { coords = []; }
                }
                return Array.isArray(coords) && coords.length > 1;
            })
            : [];
    }, [vehicle?.zonas_asignadas]);

    const hasRoute = validRoutes.length > 0;

    const zonasTexto = useMemo(() => {
        if (!vehicle?.zonas_asignadas) return '';
        if (Array.isArray(vehicle.zonas_asignadas)) {
            const nombres = vehicle.zonas_asignadas
                .map((z) => (typeof z === 'object' && z !== null ? z.nombre : z))
                .filter(Boolean);
            return nombres.length > 0 ? nombres.join(', ') : '';
        }
        return typeof vehicle.zonas_asignadas === 'string' ? vehicle.zonas_asignadas : '';
    }, [vehicle?.zonas_asignadas]);

    const isOperativo = vehicle?.estado_operativo === 'operativo';

    // 🧭 Render principal
    return (
        <div className="container mx-auto px-4 py-8 min-h-screen mt-16">
            <TituloConRegreso titulo="Detalles" to="/recolectores" />

            <div className="w-full shadow-lg p-6 bg-white rounded">
                {/* Datos del vehículo */}
                <div className="flex flex-col items-center mb-4">
                    <div className="flex items-center mb-2">
                        <LocalShippingIcon
                            className={isOperativo ? 'text-green-500' : 'text-red-500'}
                            style={{ fontSize: '2.5rem' }}
                        />
                        <span
                            className={`ml-2 px-2 py-1 rounded ${isOperativo
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                        >
                            {isOperativo ? 'Operativo' : 'Inoperativo'}
                        </span>
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">{vehicle?.nombre_recolector || 'Recolector'}</h1>
                        {zonasTexto ? (
                            <h2 className="text-xl text-gray-600">{zonasTexto}</h2>
                        ) : null}
                    </div>
                </div>

                {/* Datos adicionales y acción Ver Ruta */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {vehicle?.ubicacion_enlace && String(vehicle.ubicacion_enlace).trim() !== '' ? (
                        <div className="flex flex-col items-center p-4 bg-white rounded shadow">
                            <LocationOnIcon className="text-blue-500 mb-2" />
                            <a
                                href={vehicle.ubicacion_enlace}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                Localizar Vehículo
                            </a>
                        </div>
                    ) : null}

                    {hasRoute ? (
                        <div className="flex flex-col items-center p-4 bg-white rounded shadow">
                            <MapIcon className="text-blue-500 mb-2" />
                            <button
                                type="button"
                                onClick={() => setShowRouteModal(true)}
                                className="text-blue-500 hover:underline font-medium cursor-pointer"
                            >
                                Ver Ruta Completa
                            </button>
                        </div>
                    ) : null}

                    {ubicacion?.fecha_ubicacion_actualizada ? (
                        <div className="flex flex-col items-center p-4 bg-white rounded shadow">
                            <UpdateIcon className="text-blue-500 mb-2" />
                            <div className="text-center">
                                <span className="block text-gray-600">Última actualización</span>
                                <span className="block text-gray-800">
                                    {formatRelativeOrAbsoluteTime(ubicacion.fecha_ubicacion_actualizada)}
                                </span>
                            </div>
                        </div>
                    ) : null}
                </div>

                {/* Encabezado del mapa con botón directo a Ver Ruta */}
                <div className="flex items-center justify-between mb-2 px-1">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse inline-block" />
                        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Seguimiento en vivo del vehículo
                        </span>
                    </div>

                    {hasRoute && (
                        <button
                            type="button"
                            onClick={() => setShowRouteModal(true)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-xs cursor-pointer"
                        >
                            <MapIcon style={{ fontSize: '15px' }} />
                            <span>Ver Ruta Completa</span>
                        </button>
                    )}
                </div>

                {/* 🗺️ Mapa de seguimiento en vivo (siempre fijando al vehículo) */}
                <div className="w-full" style={{ height: '420px', position: 'relative' }}>
                    <div
                        ref={mapRef}
                        className="w-full h-full rounded"
                        style={{ position: 'absolute', inset: 0 }}
                    />
                </div>
            </div>

            {/* 🗺️ Modal dedicado para observar ÚNICAMENTE el mapa y la ruta completa (sin el camión en tiempo real) */}
            <RoutePreviewModal
                show={showRouteModal}
                onClose={() => setShowRouteModal(false)}
                title={`Ruta Completa - ${vehicle?.nombre_recolector || 'Recolector'}`}
                subtitle={zonasTexto ? `Zonas asignadas: ${zonasTexto}` : ''}
                routes={validRoutes}
                vehicleLocation={null}
            />
        </div>
    );
};

export default VehicleDetail;