import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL, calculateTimeAgo, parseDate } from '../../utils';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import UpdateIcon from '@mui/icons-material/Update';
import MapIcon from '@mui/icons-material/Map';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import TituloConRegreso from '../../components/TituloConRegreso/TituloConRegreso';
import { calculateRouteDistance } from '../../components/Map/RouteMapDrawer';
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

const truckIconSvg = `<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1g8w9s8" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm13.5-8.5 2.5 3.5h-4V9h1.5v.5zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM4 6h10v2H4V6zm11 1.5h1.5v-2H15v2z"/>
</svg>`;

const truckIconStyle = `
  width: 36px;
  height: 36px;
  background-color: white;
  border-radius: 50%;
  border: 3px solid #04548c;
  box-shadow: 0 0 8px rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
`;

const truckLeafletIcon = L.divIcon({
    className: 'custom-truck-marker',
    html: `<div style="${truckIconStyle}">${truckIconSvg}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
});

const formatRelativeOrAbsoluteTime = (dateString) => {
    if (!dateString) return 'Sin datos de ubicación';
    const date = parseDate(dateString);
    if (!date || isNaN(date.getTime())) return 'Fecha no disponible';

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

    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const routesLayerRef = useRef(null);

    // 🚚 Obtener detalles del vehículo y sus zonas asignadas
    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const response = await fetch(API_BASE_URL + `recolectores/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setVehicle(data);
                    if (data.latitud && data.longitud) {
                        setUbicacion({
                            latitud: parseFloat(data.latitud),
                            longitud: parseFloat(data.longitud),
                            fecha_ubicacion_actualizada: data.fecha_ubicacion_actualizada,
                        });
                    }
                } else {
                    setMessage('No se pudo obtener los detalles del recolector');
                }
            } catch {
                setMessage('Error al conectar con la API');
            }
        };
        fetchVehicle();
    }, [id]);

    // 📍 Consultar ubicación periódicamente en tiempo real
    useEffect(() => {
        const fetchUbicacion = async () => {
            try {
                const response = await fetch(API_BASE_URL + `recolectores/${id}/ubicacion`);
                const data = await response.json();
                if (response.ok && data.latitud && data.longitud) {
                    setUbicacion({
                        latitud: parseFloat(data.latitud),
                        longitud: parseFloat(data.longitud),
                        fecha_ubicacion_actualizada: data.fecha_ubicacion_actualizada,
                    });
                }
            } catch { }
        };

        fetchUbicacion();
        const interval = setInterval(fetchUbicacion, 3000);
        return () => clearInterval(interval);
    }, [id]);

    // 🗺️ Inicializar Mapa Leaflet (una sola vez)
    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        const defaultCenter = [-9.9306, -76.2422];
        const map = L.map(mapRef.current).setView(defaultCenter, 15);
        const MAX_ALLOWED_ZOOM = 18;
        map.setMaxZoom(MAX_ALLOWED_ZOOM);

        const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        const esriSat = L.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            {
                maxZoom: MAX_ALLOWED_ZOOM,
                attribution: 'Tiles © Esri'
            }
        );

        osm.addTo(map);

        L.control.layers({
            'Mapa Estándar': osm,
            'Satélite': esriSat,
        }).addTo(map);

        // Capa para rutas y marcadores
        const routesLayer = L.layerGroup().addTo(map);
        routesLayerRef.current = routesLayer;

        mapInstanceRef.current = map;
        setTimeout(() => map.invalidateSize(), 200);

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    // 🛣️ Dibujar las Rutas Planificadas asignadas al vehículo
    useEffect(() => {
        const map = mapInstanceRef.current;
        const routesLayer = routesLayerRef.current;
        if (!map || !routesLayer || !vehicle) return;

        routesLayer.clearLayers();

        const bounds = L.latLngBounds([]);
        const zonasAsignadas = Array.isArray(vehicle.zonas_asignadas) ? vehicle.zonas_asignadas : [];

        zonasAsignadas.forEach((zona) => {
            const coords = Array.isArray(zona.coordenadas_ruta)
                ? zona.coordenadas_ruta
                : (typeof zona.coordenadas_ruta === 'string'
                    ? JSON.parse(zona.coordenadas_ruta || '[]')
                    : []);

            if (coords.length === 0) return;

            const routeColor = zona.color_ruta || '#1976D2';
            const latlngs = coords.map((c) => [c.lat, c.lng]);

            // Polilínea de la ruta
            const polyline = L.polyline(latlngs, {
                color: routeColor,
                weight: 5,
                opacity: 0.85,
                lineJoin: 'round'
            }).addTo(routesLayer);

            const distance = calculateRouteDistance(coords);

            polyline.bindPopup(`
        <div style="font-family: sans-serif;">
          <b style="color: ${routeColor}; font-size: 14px;">${zona.nombre}</b>
          <p style="margin: 4px 0; font-size: 12px; color: #444;">${zona.descripcion || 'Ruta planificada de recolección'}</p>
          <div style="font-size: 11px; color: #666; margin-top: 4px; border-top: 1px solid #eee; padding-top: 4px;">
            <b>Puntos:</b> ${coords.length} | <b>Distancia aprox.:</b> ~${distance} km
          </div>
        </div>
      `);

            latlngs.forEach((ll) => bounds.extend(ll));

            // Marcador de Inicio
            const start = coords[0];
            const startIcon = L.divIcon({
                className: 'vehicle-route-start-marker',
                html: `
          <div style="
            background-color: #16a34a;
            color: white;
            border-radius: 9999px;
            padding: 2px 7px;
            font-size: 10px;
            font-weight: bold;
            border: 2px solid white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.4);
            white-space: nowrap;
            transform: translate(-50%, -50%);
          ">INICIO: ${zona.nombre}</div>
        `,
                iconSize: [80, 18],
                iconAnchor: [40, 9]
            });

            L.marker([start.lat, start.lng], { icon: startIcon })
                .bindPopup(`<b>Inicio de Recorrido:</b> ${zona.nombre}`)
                .addTo(routesLayer);

            // Marcador de Fin (si hay más de 1 punto)
            if (coords.length > 1) {
                const end = coords[coords.length - 1];
                const endIcon = L.divIcon({
                    className: 'vehicle-route-end-marker',
                    html: `
            <div style="
              background-color: #dc2626;
              color: white;
              border-radius: 9999px;
              padding: 2px 7px;
              font-size: 10px;
              font-weight: bold;
              border: 2px solid white;
              box-shadow: 0 2px 5px rgba(0,0,0,0.4);
              white-space: nowrap;
              transform: translate(-50%, -50%);
            ">FIN: ${zona.nombre}</div>
          `,
                    iconSize: [70, 18],
                    iconAnchor: [35, 9]
                });

                L.marker([end.lat, end.lng], { icon: endIcon })
                    .bindPopup(`<b>Fin de Recorrido:</b> ${zona.nombre}`)
                    .addTo(routesLayer);
            }
        });

        // Incluir ubicación del camión en los límites iniciales
        if (ubicacion?.latitud && ubicacion?.longitud) {
            bounds.extend([ubicacion.latitud, ubicacion.longitud]);
        }

        if (bounds.isValid()) {
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [vehicle]);

    // 🚚 Actualizar marcador del camión en tiempo real
    useEffect(() => {
        const map = mapInstanceRef.current;
        if (!map || !ubicacion?.latitud || !ubicacion?.longitud) return;

        const { latitud, longitud } = ubicacion;

        if (!markerRef.current) {
            const marker = L.marker([latitud, longitud], {
                icon: truckLeafletIcon,
                zIndexOffset: 1000
            })
                .addTo(map)
                .bindPopup(`
          <div style="font-family: sans-serif; text-align: center;">
            <b style="color: #04548c; font-size: 13px;">${vehicle?.nombre_recolector || 'Recolector'}</b><br/>
            Placa: <b>${vehicle?.placa || ''}</b><br/>
            <span style="font-size: 11px; color: #666;">Posición en tiempo real</span>
          </div>
        `);

            markerRef.current = marker;
        } else {
            markerRef.current.setLatLng([latitud, longitud]);
        }
    }, [ubicacion, vehicle]);

    // Controles de mapa
    const handleCenterTruck = () => {
        if (!mapInstanceRef.current || !ubicacion?.latitud || !ubicacion?.longitud) return;
        mapInstanceRef.current.setView([ubicacion.latitud, ubicacion.longitud], 16, { animate: true });
        if (markerRef.current) markerRef.current.openPopup();
    };

    const handleFitFullRoute = () => {
        if (!mapInstanceRef.current || !vehicle) return;
        const bounds = L.latLngBounds([]);
        const zonas = Array.isArray(vehicle.zonas_asignadas) ? vehicle.zonas_asignadas : [];

        zonas.forEach((z) => {
            const coords = Array.isArray(z.coordenadas_ruta) ? z.coordenadas_ruta : [];
            coords.forEach((c) => bounds.extend([c.lat, c.lng]));
        });

        if (ubicacion?.latitud && ubicacion?.longitud) {
            bounds.extend([ubicacion.latitud, ubicacion.longitud]);
        }

        if (bounds.isValid()) {
            mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
        }
    };

    if (message) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500 font-medium">{message}</p>
            </div>
        );
    }

    if (!vehicle) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
        );
    }

    const zonasAsignadas = Array.isArray(vehicle.zonas_asignadas) ? vehicle.zonas_asignadas : [];
    const zonasConRuta = zonasAsignadas.filter((z) => Array.isArray(z.coordenadas_ruta) && z.coordenadas_ruta.length > 0);

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen mt-16 max-w-6xl">
            <TituloConRegreso titulo="Seguimiento de Recolector" to="/recolectores" />

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
                {/* Header del Vehículo */}
                <div className="p-6 border-b bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/20">
                                <LocalShippingIcon style={{ fontSize: '2.5rem' }} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-bold">{vehicle.nombre_recolector}</h1>
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${vehicle.estado_operativo === 'operativo'
                                                ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                                                : 'bg-red-500/20 text-red-300 border border-red-400/30'
                                            }`}
                                    >
                                        {vehicle.estado_operativo === 'operativo' ? 'Operativo' : 'Inoperativo'}
                                    </span>
                                </div>
                                <p className="text-sm text-blue-200 mt-0.5">
                                    Placa: <span className="font-mono font-bold text-white">{vehicle.placa}</span> | Tipo: {vehicle.tipo_vehiculo}
                                </p>
                            </div>
                        </div>

                        {/* Indicadores de última actualización */}
                        {ubicacion?.fecha_ubicacion_actualizada && (
                            <div className="bg-white/10 backdrop-blur-xs border border-white/20 px-4 py-2 rounded-xl text-right">
                                <div className="text-xs text-blue-200 flex items-center gap-1 justify-end">
                                    <UpdateIcon fontSize="inherit" /> Última actualización GPS
                                </div>
                                <div className="text-sm font-semibold text-white">
                                    {formatRelativeOrAbsoluteTime(ubicacion.fecha_ubicacion_actualizada)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Zonas y Rutas Asignadas */}
                <div className="p-6 bg-gray-50 border-b">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                            <MapIcon fontSize="small" className="text-blue-600" />
                            Ruta(s) Planificada(s) de este Vehículo
                        </h2>
                        <span className="text-xs text-gray-500">
                            {zonasConRuta.length} {zonasConRuta.length === 1 ? 'ruta trazada' : 'rutas trazadas'} en el mapa
                        </span>
                    </div>

                    {zonasAsignadas.length === 0 ? (
                        <p className="text-sm text-gray-500 italic">No hay zonas asignadas a este vehículo.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {zonasAsignadas.map((zona) => {
                                const coords = Array.isArray(zona.coordenadas_ruta) ? zona.coordenadas_ruta : [];
                                const hasRoute = coords.length > 0;
                                const distance = calculateRouteDistance(coords);

                                return (
                                    <div
                                        key={zona.id}
                                        className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span
                                                    className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                                                    style={{ backgroundColor: zona.color_ruta || '#1976D2' }}
                                                />
                                                <h3 className="font-semibold text-gray-900 text-sm truncate">
                                                    {zona.nombre}
                                                </h3>
                                            </div>
                                            {zona.descripcion && (
                                                <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                                                    {zona.descripcion}
                                                </p>
                                            )}
                                        </div>

                                        <div className="pt-2 border-t flex items-center justify-between text-[11px] text-gray-600">
                                            {hasRoute ? (
                                                <>
                                                    <span>📍 {coords.length} puntos</span>
                                                    <span className="font-semibold text-blue-700">~{distance} km</span>
                                                </>
                                            ) : (
                                                <span className="text-gray-400 italic">Sin recorrido trazado</span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Mapa Interactivo de Seguimiento y Rutas */}
                <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                            <span className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-full bg-blue-700 border-2 border-white shadow-xs inline-block" />
                                <b>Camión</b> (En vivo)
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-full bg-green-600 inline-block" />
                                <b>Inicio</b>
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-full bg-red-600 inline-block" />
                                <b>Fin</b>
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-6 h-1 rounded bg-blue-600 inline-block" />
                                Recorrido programado
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            {ubicacion?.latitud && (
                                <button
                                    onClick={handleCenterTruck}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 shadow-xs transition-colors"
                                >
                                    <MyLocationIcon style={{ fontSize: 14 }} />
                                    <span>Centrar en Camión</span>
                                </button>
                            )}
                            <button
                                onClick={handleFitFullRoute}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-200 shadow-xs transition-colors"
                            >
                                <ZoomOutMapIcon style={{ fontSize: 14 }} />
                                <span>Ver Ruta Completa</span>
                            </button>
                        </div>
                    </div>

                    <div className="w-full h-[500px] rounded-xl overflow-hidden border border-gray-200 shadow-inner relative z-0">
                        <div ref={mapRef} className="w-full h-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetail;