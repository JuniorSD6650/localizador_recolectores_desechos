import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { calculateRouteDistance } from './RouteMapDrawer';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CloseIcon from '@mui/icons-material/Close';

const RoutePreviewModal = ({
    show = false,
    onClose = () => { },
    title = 'Recorrido en Mapa',
    subtitle = '',
    // Array de zonas: [{ id, nombre, color_ruta, coordenadas_ruta, descripcion }]
    routes = [],
    // Ubicación opcional de vehículo: { latitud, longitud, nombre_recolector, placa }
    vehicleLocation = null,
}) => {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);

    useEffect(() => {
        if (!show || !mapContainerRef.current) return;

        // Limpiar mapa anterior si existiera
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
        }

        const defaultCenter = [-9.9306, -76.2422];
        const map = L.map(mapContainerRef.current).setView(defaultCenter, 14);

        const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        });

        const esriSat = L.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            {
                maxZoom: 18,
                attribution: 'Tiles © Esri'
            }
        );

        osm.addTo(map);

        L.control.layers({
            'Mapa Estándar': osm,
            'Satélite': esriSat
        }).addTo(map);

        const bounds = L.latLngBounds([]);

        // Dibujar cada ruta recibida
        routes.forEach((route, rIdx) => {
            const coords = Array.isArray(route.coordenadas_ruta)
                ? route.coordenadas_ruta
                : (typeof route.coordenadas_ruta === 'string'
                    ? JSON.parse(route.coordenadas_ruta || '[]')
                    : []);

            if (coords.length === 0) return;

            const routeColor = route.color_ruta || '#1976D2';
            const latlngs = coords.map((c) => [c.lat, c.lng]);

            // Polilínea de la ruta
            const polyline = L.polyline(latlngs, {
                color: routeColor,
                weight: 5,
                opacity: 0.85,
                lineJoin: 'round'
            }).addTo(map);

            const distance = calculateRouteDistance(coords);

            polyline.bindPopup(`
        <div style="font-family: sans-serif;">
          <b style="color: ${routeColor};">${route.nombre || `Ruta ${rIdx + 1}`}</b>
          ${route.descripcion ? `<p style="margin: 4px 0; font-size: 12px;">${route.descripcion}</p>` : ''}
          <div style="font-size: 11px; color: #666; margin-top: 4px;">
            Puntos: ${coords.length} | Distancia estimada: ~${distance} km
          </div>
        </div>
      `);

            latlngs.forEach((ll) => bounds.extend(ll));

            // Marcador Inicio
            const startCoord = coords[0];
            const startIcon = L.divIcon({
                className: 'route-start-marker',
                html: `
          <div style="
            background-color: #16a34a;
            color: white;
            border-radius: 9999px;
            padding: 2px 7px;
            font-size: 10px;
            font-weight: bold;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.4);
            white-space: nowrap;
            transform: translate(-50%, -50%);
          ">INICIO</div>
        `,
                iconSize: [36, 18],
                iconAnchor: [18, 9]
            });
            L.marker([startCoord.lat, startCoord.lng], { icon: startIcon })
                .bindPopup(`<b>Inicio de Recorrido</b><br/>${route.nombre || ''}`)
                .addTo(map);

            // Marcador Fin (si tiene más de 1 punto)
            if (coords.length > 1) {
                const endCoord = coords[coords.length - 1];
                const endIcon = L.divIcon({
                    className: 'route-end-marker',
                    html: `
            <div style="
              background-color: #dc2626;
              color: white;
              border-radius: 9999px;
              padding: 2px 7px;
              font-size: 10px;
              font-weight: bold;
              border: 2px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.4);
              white-space: nowrap;
              transform: translate(-50%, -50%);
            ">FIN</div>
          `,
                    iconSize: [36, 18],
                    iconAnchor: [18, 9]
                });
                L.marker([endCoord.lat, endCoord.lng], { icon: endIcon })
                    .bindPopup(`<b>Fin de Recorrido</b><br/>${route.nombre || ''}`)
                    .addTo(map);
            }
        });

        // Si se proporciona ubicación del vehículo, dibujarlo en el mapa
        if (vehicleLocation?.latitud && vehicleLocation?.longitud) {
            const vLat = parseFloat(vehicleLocation.latitud);
            const vLng = parseFloat(vehicleLocation.longitud);

            if (!isNaN(vLat) && !isNaN(vLng)) {
                bounds.extend([vLat, vLng]);

                const truckIcon = L.divIcon({
                    className: 'custom-truck-preview-marker',
                    html: `
            <div style="
              width: 36px;
              height: 36px;
              background-color: #ffffff;
              border: 3px solid #04548c;
              border-radius: 50%;
              box-shadow: 0 0 10px rgba(4,84,140,0.6);
              display: flex;
              align-items: center;
              justify-content: center;
              transform: translate(-50%, -50%);
            ">
              <svg style="width: 20px; height: 20px; fill: #04548c;" viewBox="0 0 24 24">
                <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm13.5-8.5 2.5 3.5h-4V9h1.5v.5zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM4 6h10v2H4V6zm11 1.5h1.5v-2H15v2z"/>
              </svg>
            </div>
          `,
                    iconSize: [36, 36],
                    iconAnchor: [18, 18]
                });

                L.marker([vLat, vLng], { icon: truckIcon })
                    .bindPopup(`
            <b>${vehicleLocation.nombre_recolector || 'Vehículo Recolector'}</b><br/>
            Placa: ${vehicleLocation.placa || 'N/A'}<br/>
            <i>Ubicación actual reportada</i>
          `)
                    .addTo(map)
                    .openPopup();
            }
        }

        // Ajustar zoom para abarcar todas las rutas y el vehículo
        if (bounds.isValid()) {
            map.fitBounds(bounds, { padding: [40, 40] });
        }

        mapInstanceRef.current = map;
        setTimeout(() => map.invalidateSize(), 200);

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [show, routes, vehicleLocation]);

    if (!show) return null;

    const validRoutes = routes.filter((r) => {
        const c = Array.isArray(r.coordenadas_ruta)
            ? r.coordenadas_ruta
            : (typeof r.coordenadas_ruta === 'string'
                ? JSON.parse(r.coordenadas_ruta || '[]')
                : []);
        return c.length > 0;
    });

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* Leyenda de Rutas */}
                {validRoutes.length > 0 && (
                    <div className="px-6 py-2 bg-blue-50 border-b flex flex-wrap items-center gap-3 text-xs">
                        <span className="font-semibold text-gray-700">Rutas en pantalla:</span>
                        {validRoutes.map((r, i) => {
                            const c = Array.isArray(r.coordenadas_ruta) ? r.coordenadas_ruta : JSON.parse(r.coordenadas_ruta || '[]');
                            const d = calculateRouteDistance(c);
                            return (
                                <span
                                    key={r.id || i}
                                    className="inline-flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border shadow-xs"
                                >
                                    <span
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: r.color_ruta || '#1976D2' }}
                                    />
                                    <span className="font-medium text-gray-800">{r.nombre}</span>
                                    <span className="text-gray-500 text-[11px]">(~{d} km, {c.length} pts)</span>
                                </span>
                            );
                        })}
                        {vehicleLocation && (
                            <span className="inline-flex items-center gap-1 text-blue-700 bg-white px-2.5 py-1 rounded-full border shadow-xs">
                                <LocalShippingIcon fontSize="inherit" />
                                <span>Posición del Vehículo</span>
                            </span>
                        )}
                    </div>
                )}

                {/* Mapa */}
                <div className="flex-1 min-h-[420px] relative bg-gray-100">
                    {validRoutes.length === 0 && !vehicleLocation?.latitud ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 p-6 text-center">
                            <p className="font-medium">Esta zona o vehículo no tiene coordenadas de recorrido configuradas aún.</p>
                            <p className="text-xs text-gray-400 mt-1">El administrador puede configurar el trazado desde la edición de zonas.</p>
                        </div>
                    ) : (
                        <div ref={mapContainerRef} className="w-full h-full min-h-[420px]" />
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-3 border-t bg-gray-50 flex items-center justify-between">
                    <div className="text-xs text-gray-500 flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-600 inline-block" /> Inicio
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" /> Fin
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-4 h-1 rounded bg-blue-600 inline-block" /> Trayecto planificado
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

RoutePreviewModal.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    routes: PropTypes.array,
    vehicleLocation: PropTypes.object
};

export default RoutePreviewModal;
