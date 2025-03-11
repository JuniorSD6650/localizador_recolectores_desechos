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

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                // Añadir marcador
                L.marker([lat, lng])
                    .addTo(map)
                    .bindPopup('Ubicación exacta del reporte')
                    .openPopup();

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
                className="bg-white p-4 rounded-lg w-11/12 max-w-4xl max-h-[90vh]"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Ubicación del Reporte</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
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