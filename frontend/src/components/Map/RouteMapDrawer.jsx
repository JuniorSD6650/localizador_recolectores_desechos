import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Calcular distancia total en km (Haversine)
export const calculateRouteDistance = (coords) => {
    if (!coords || coords.length < 2) return 0;
    const R = 6371; // Radio de la Tierra en km
    let total = 0;
    for (let i = 0; i < coords.length - 1; i++) {
        const dLat = ((coords[i + 1].lat - coords[i].lat) * Math.PI) / 180;
        const dLng = ((coords[i + 1].lng - coords[i].lng) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((coords[i].lat * Math.PI) / 180) *
            Math.cos((coords[i + 1].lat * Math.PI) / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        total += R * c;
    }
    return total.toFixed(2);
};

const COLOR_PRESETS = [
    { label: 'Azul', value: '#1976D2' },
    { label: 'Azul Oscuro', value: '#04548C' },
    { label: 'Verde', value: '#049434' },
    { label: 'Verde Eco', value: '#5FBB01' },
    { label: 'Naranja', value: '#FC640C' }
];

const RouteMapDrawer = ({
    initialCoords = [],
    initialColor = '#1976D2',
    onChange = () => { }
}) => {
    const [coords, setCoords] = useState(Array.isArray(initialCoords) ? initialCoords : []);
    const [color, setColor] = useState(initialColor || '#1976D2');
    const [showJsonInput, setShowJsonInput] = useState(false);
    const [jsonInput, setJsonInput] = useState('');

    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const polylineRef = useRef(null);
    const markersLayerRef = useRef(null);

    // Notificar cambios al padre
    useEffect(() => {
        onChange({ coordenadas: coords, color });
    }, [coords, color]);

    // Inicializar mapa Leaflet
    useEffect(() => {
        if (!mapContainerRef.current || mapInstanceRef.current) return;

        const defaultCenter = coords.length > 0
            ? [coords[0].lat, coords[0].lng]
            : [-9.9306, -76.2422]; // Amarilis, Huánuco

        const map = L.map(mapContainerRef.current).setView(defaultCenter, 15);

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

        const markersLayer = L.layerGroup().addTo(map);
        markersLayerRef.current = markersLayer;

        // Escuchar clics en el mapa para agregar puntos
        map.on('click', (e) => {
            const newPoint = {
                lat: parseFloat(e.latlng.lat.toFixed(6)),
                lng: parseFloat(e.latlng.lng.toFixed(6))
            };
            setCoords((prev) => [...prev, newPoint]);
        });

        mapInstanceRef.current = map;
        setTimeout(() => map.invalidateSize(), 300);

        return () => {
            map.remove();
            mapInstanceRef.current = null;
        };
    }, []);

    // Actualizar polilínea y marcadores cuando cambian coords o color
    useEffect(() => {
        const map = mapInstanceRef.current;
        const markersLayer = markersLayerRef.current;
        if (!map || !markersLayer) return;

        markersLayer.clearLayers();

        if (polylineRef.current) {
            polylineRef.current.remove();
            polylineRef.current = null;
        }

        if (coords.length === 0) return;

        const latlngs = coords.map((c) => [c.lat, c.lng]);

        // Dibujar polilínea del recorrido
        const polyline = L.polyline(latlngs, {
            color: color,
            weight: 5,
            opacity: 0.85,
            dashArray: '8, 8',
            lineJoin: 'round'
        }).addTo(map);
        polylineRef.current = polyline;

        // Crear marcadores para Inicio, Fin y puntos intermedios
        coords.forEach((c, idx) => {
            const isStart = idx === 0;
            const isEnd = idx === coords.length - 1 && coords.length > 1;

            let iconHtml = '';
            let bg = color;
            let label = `${idx + 1}`;

            if (isStart) {
                bg = '#16a34a'; // Verde inicio
                label = 'INICIO';
            } else if (isEnd) {
                bg = '#dc2626'; // Rojo fin
                label = 'FIN';
            }

            iconHtml = `
        <div style="
          background-color: ${bg};
          color: white;
          border-radius: 9999px;
          padding: 2px 8px;
          font-size: 11px;
          font-weight: bold;
          border: 2px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.4);
          text-align: center;
          white-space: nowrap;
          transform: translate(-50%, -50%);
        ">${label}</div>
      `;

            const icon = L.divIcon({
                className: 'route-waypoint-marker',
                html: iconHtml,
                iconSize: [40, 20],
                iconAnchor: [20, 10]
            });

            L.marker([c.lat, c.lng], { icon })
                .bindPopup(`<b>${isStart ? 'Punto de Inicio' : isEnd ? 'Punto Final' : `Punto ${idx + 1}`}</b><br/>Lat: ${c.lat}<br/>Lng: ${c.lng}`)
                .addTo(markersLayer);
        });

        // Ajustar vista a la ruta completa si hay puntos
        if (coords.length > 1) {
            map.fitBounds(polyline.getBounds(), { padding: [30, 30] });
        }
    }, [coords, color]);

    const handleUndo = () => {
        setCoords((prev) => prev.slice(0, -1));
    };

    const handleClear = () => {
        setCoords([]);
    };

    const handleLoadSample = () => {
        // Ruta de prueba por Amarilis
        const sample = [
            { lat: -9.9306, lng: -76.2422 },
            { lat: -9.9318, lng: -76.2411 },
            { lat: -9.9332, lng: -76.2403 },
            { lat: -9.9346, lng: -76.2415 },
            { lat: -9.9358, lng: -76.2428 }
        ];
        setCoords(sample);
    };

    const handleApplyJson = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            if (Array.isArray(parsed) && parsed.every((p) => typeof p.lat === 'number' && typeof p.lng === 'number')) {
                setCoords(parsed);
                setShowJsonInput(false);
                setJsonInput('');
            } else {
                alert('Formato inválido. Debe ser un array de objetos con "lat" y "lng". Ej: [{"lat": -9.93, "lng": -76.24}]');
            }
        } catch {
            alert('JSON inválido. Revisa la sintaxis.');
        }
    };

    const distance = calculateRouteDistance(coords);

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 bg-gray-50 p-3 rounded-lg border">
                <div>
                    <span className="text-sm font-semibold text-gray-700">Trazador de Ruta en Mapa</span>
                    <p className="text-xs text-gray-500">
                        Haz clic sobre el mapa para colocar los puntos del recorrido secuencialmente.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2.5 py-1 rounded-full">
                        {coords.length} {coords.length === 1 ? 'punto' : 'puntos'}
                    </span>
                    {coords.length > 1 && (
                        <span className="text-xs bg-green-100 text-green-800 font-semibold px-2.5 py-1 rounded-full">
                            ~{distance} km
                        </span>
                    )}
                </div>
            </div>

            {/* Controles de barra superior */}
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <label className="text-xs font-medium text-gray-600">Color:</label>
                    <div className="flex gap-1">
                        {COLOR_PRESETS.map((p) => (
                            <button
                                key={p.value}
                                type="button"
                                title={p.label}
                                className={`w-6 h-6 rounded-full border-2 transition-transform ${color === p.value ? 'scale-110 border-gray-900 shadow-sm' : 'border-white'}`}
                                style={{ backgroundColor: p.value }}
                                onClick={() => setColor(p.value)}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleUndo}
                        disabled={coords.length === 0}
                        className="px-2.5 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                    >
                        ↩ Deshacer
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        disabled={coords.length === 0}
                        className="px-2.5 py-1 text-xs font-medium text-red-600 bg-white border border-red-200 rounded hover:bg-red-50 disabled:opacity-50"
                    >
                        🗑 Limpiar
                    </button>
                    <button
                        type="button"
                        onClick={handleLoadSample}
                        className="px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded hover:bg-indigo-100"
                    >
                        ✨ Cargar Ejemplo
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowJsonInput(!showJsonInput)}
                        className="px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
                    >
                        {showJsonInput ? 'Ocultar JSON' : 'Pegar JSON'}
                    </button>
                </div>
            </div>

            {/* Input JSON opcional */}
            {showJsonInput && (
                <div className="p-3 bg-gray-100 rounded-lg border space-y-2">
                    <label className="text-xs font-medium text-gray-700">Pegar array de coordenadas JSON:</label>
                    <textarea
                        rows={3}
                        className="w-full text-xs font-mono p-2 border rounded"
                        placeholder='[{"lat": -9.9306, "lng": -76.2422}, {"lat": -9.9325, "lng": -76.2410}]'
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={handleApplyJson}
                            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                        >
                            Aplicar Coordenadas
                        </button>
                    </div>
                </div>
            )}

            {/* Contenedor del Mapa Leaflet */}
            <div
                ref={mapContainerRef}
                className="w-full h-72 rounded-lg border border-gray-300 shadow-inner z-0"
            />
        </div>
    );
};

RouteMapDrawer.propTypes = {
    initialCoords: PropTypes.array,
    initialColor: PropTypes.string,
    onChange: PropTypes.func
};

export default RouteMapDrawer;
