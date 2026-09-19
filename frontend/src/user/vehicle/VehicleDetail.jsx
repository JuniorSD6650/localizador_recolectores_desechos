import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL, calculateTimeAgo, parseDate } from '../../utils';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import UpdateIcon from '@mui/icons-material/Update';
import TituloConRegreso from '../../components/TituloConRegreso/TituloConRegreso';
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

    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const routesLayerRef = useRef(null);
    const hasFitBoundsRef = useRef(false);

    // 🚚 Obtener detalles del vehículo
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

    // 📍 Obtener ubicación periódicamente en tiempo real
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
        const interval = setInterval(fetchUbicacion, 2000);
        return () => clearInterval(interval);
    }, [id]);

    // 🔹 Inicializar mapa Leaflet una sola vez
    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        const defaultLat = ubicacion?.latitud ? parseFloat(ubicacion.latitud) : -9.9306;
        const defaultLng = ubicacion?.longitud ? parseFloat(ubicacion.longitud) : -76.2422;

        const map = L.map(mapRef.current).setView([defaultLat, defaultLng], userZoom);

        const MAX_ALLOWED_ZOOM = 17;
        map.setMaxZoom(MAX_ALLOWED_ZOOM);

        const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
                '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        });

        const esriSat = L.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            {
                maxZoom: MAX_ALLOWED_ZOOM,
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

        // Capa para los trazos de las rutas
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

    // 🛣️ Dibujar el trazo de la ruta sobre el mapa de Leaflet
    useEffect(() => {
        const map = mapInstanceRef.current;
        const routesLayer = routesLayerRef.current;
        if (!map || !routesLayer || !vehicle) return;

        routesLayer.clearLayers();

        const bounds = L.latLngBounds([]);
        let hasRoutePoints = false;

        const zonas = Array.isArray(vehicle.zonas_asignadas) ? vehicle.zonas_asignadas : [];

        zonas.forEach((zona) => {
            const coords = Array.isArray(zona.coordenadas_ruta)
                ? zona.coordenadas_ruta
                : (typeof zona.coordenadas_ruta === 'string'
                    ? JSON.parse(zona.coordenadas_ruta || '[]')
                    : []);

            if (coords.length > 0) {
                hasRoutePoints = true;
                const latlngs = coords.map((c) => [c.lat, c.lng]);
                const colorTrazo = zona.color_ruta || '#1976D2';

                // Trazo de la ruta sobre el mapa
                const polyline = L.polyline(latlngs, {
                    color: colorTrazo,
                    weight: 5,
                    opacity: 0.85,
                    lineJoin: 'round',
                }).addTo(routesLayer);

                polyline.bindPopup(`<b>Ruta:</b> ${zona.nombre}`);

                latlngs.forEach((ll) => bounds.extend(ll));
            }
        });

        if (ubicacion?.latitud && ubicacion?.longitud) {
            bounds.extend([parseFloat(ubicacion.latitud), parseFloat(ubicacion.longitud)]);
        }

        if (!hasFitBoundsRef.current && (hasRoutePoints || (ubicacion?.latitud && ubicacion?.longitud))) {
            if (bounds.isValid()) {
                map.fitBounds(bounds, { padding: [40, 40] });
                hasFitBoundsRef.current = true;
            }
        }
    }, [vehicle]);

    // 🚚 Ubicación del camión en tiempo real sobre el mapa de Leaflet
    useEffect(() => {
        const map = mapInstanceRef.current;
        if (!map || !ubicacion?.latitud || !ubicacion?.longitud) return;

        const { latitud, longitud } = ubicacion;
        const lat = parseFloat(latitud);
        const lng = parseFloat(longitud);

        if (!markerRef.current) {
            const marker = L.marker([lat, lng], {
                icon: truckLeafletIcon,
            })
                .addTo(map)
                .bindPopup(`Ubicación actual del vehículo<br/>Lat: ${lat}<br/>Long: ${lng}`)
                .openPopup();

            markerRef.current = marker;

            if (!hasFitBoundsRef.current) {
                map.setView([lat, lng], userZoom);
            }
        } else {
            markerRef.current
                .setLatLng([lat, lng])
                .setPopupContent(
                    `Ubicación actual del vehículo<br/>Lat: ${lat}<br/>Long: ${lng}`
                );

            map.panTo([lat, lng], { animate: true, duration: 0.5 });
        }
    }, [ubicacion]);

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

    const zonasTexto = Array.isArray(vehicle.zonas_asignadas)
        ? vehicle.zonas_asignadas.map((z) => z.nombre || z).join(', ')
        : vehicle.zonas_asignadas || 'Sin zonas asignadas';

    // 🧭 Render principal con la estructura y colores originales
    return (
        <div className="container mx-auto px-4 py-8 min-h-screen mt-16">
            <TituloConRegreso titulo="Detalles" to="/recolectores" />

            <div className="w-full shadow-lg p-6 bg-white rounded">
                {/* Datos del vehículo */}
                <div className="flex flex-col items-center mb-4">
                    <div className="flex items-center mb-2">
                        <LocalShippingIcon
                            className={vehicle.estado_operativo === 'operativo' ? 'text-green-500' : 'text-red-500'}
                            style={{ fontSize: '2.5rem' }}
                        />
                        <span
                            className={`ml-2 px-2 py-1 rounded ${vehicle.estado_operativo === 'operativo'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                        >
                            {vehicle.estado_operativo === 'operativo' ? 'Operativo' : 'Inoperativo'}
                        </span>
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800">{vehicle.nombre_recolector}</h1>
                        <h2 className="text-xl text-gray-600">{zonasTexto}</h2>
                    </div>
                </div>

                {/* Datos adicionales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {vehicle.ubicacion_enlace && (
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
                    )}

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

                {/* 🗺️ Mapa de Leaflet: muestra el trazo de la ruta y la ubicación del camión en tiempo real */}
                <div className="w-full" style={{ height: '480px', position: 'relative' }}>
                    <div
                        ref={mapRef}
                        className="w-full h-full rounded"
                        style={{ position: 'absolute', inset: 0 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default VehicleDetail;