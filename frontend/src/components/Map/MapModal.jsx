import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Importar íconos
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix the Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

const MapModal = ({ ubicacion, onClose }) => {

    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);

    useEffect(() => {

        // Esperar a que el DOM esté listo
        setTimeout(() => {
            if (!mapRef.current || !ubicacion?.latitud || !ubicacion?.longitud) {
                return;
            }

            try {
                const lat = parseFloat(ubicacion.latitud);
                const lng = parseFloat(ubicacion.longitud);

                // Limpiar mapa existente
                if (mapInstanceRef.current) {
                    mapInstanceRef.current.remove();
                    mapInstanceRef.current = null;
                }

                // Crear nueva instancia del mapa
                const map = L.map(mapRef.current).setView([lat, lng], 15);

                // Aplicar desde el inicio un límite seguro de zoom para evitar requests a tiles inexistentes.
                const MAX_ALLOWED_ZOOM = 17;
                map.setMaxZoom(MAX_ALLOWED_ZOOM);

                // Capa base estándar
                const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                });

                // Capa satélite Esri
                const esriSat = L.tileLayer(
                    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                    {
                        maxZoom: MAX_ALLOWED_ZOOM,
                        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                    }
                );

                // Añadir capa base por defecto
                osm.addTo(map);

                // Añadir marcador
                L.marker([lat, lng])
                    .addTo(map)
                    .bindPopup(
                        `Ubicación exacta del reporte<br/>Lat: ${lat}<br/>Long: ${lng}`
                    )
                    .openPopup();

                // Control de capas
                L.control.layers(
                    {
                        'Mapa estándar': osm,
                        'Satélite': esriSat
                    }
                ).addTo(map);

                // Asegurar que el maxZoom se mantiene en el límite seguro al cambiar de capa
                map.on('baselayerchange', (e) => {
                    try {
                        if (!e) return;
                        map.setMaxZoom(MAX_ALLOWED_ZOOM);
                        if (map.getZoom() > MAX_ALLOWED_ZOOM) map.setZoom(MAX_ALLOWED_ZOOM);
                    } catch (err) {
                        // eslint-disable-next-line no-console
                        console.error('Error manejando baselayerchange en MapModal:', err);
                    }
                });

                mapInstanceRef.current = map;

                // Forzar actualización del mapa
                map.invalidateSize();
            } catch (error) {
                console.error('Error al inicializar el mapa:', error);
            }
        }, 100);

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [ubicacion]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                className="bg-white p-4 rounded-lg w-11/12 max-w-4xl max-h-[90vh] relative"
                onClick={e => e.stopPropagation()}
            >
                {/* Botón de cerrar */}
                <button
                    type="button"
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    onClick={onClose}
                    title="Cerrar"
                >
                    ✕
                </button>
                <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">Ubicación del Reporte</h3>
                    {ubicacion && ubicacion.latitud && ubicacion.longitud && (
                        <button
                            type="button"
                            className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                            onClick={() => {
                                const url = `https://www.google.com/maps?q=${ubicacion.latitud},${ubicacion.longitud}`;
                                window.open(url, '_blank');
                            }}
                            title="Abrir en Google Maps"
                        >
                            Ver en Google Maps
                        </button>
                    )}
                </div>
                <div
                    ref={mapRef}
                    style={{
                        height: '500px',
                        width: '100%',
                        position: 'relative',
                        zIndex: 1
                    }}
                />
            </div>
        </div>
    );
};

export default MapModal;