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

// Distancia en metros entre dos puntos
const distanceBetweenMeters = (p1, p2) => {
    if (!p1 || !p2) return 0;
    const R = 6371000; // metros
    const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
    const dLng = ((p2.lng - p1.lng) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((p1.lat * Math.PI) / 180) *
        Math.cos((p2.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
};

const COLOR_PRESETS = [
    { label: 'Azul Institucional', value: '#1976D2' },
    { label: 'Azul Marino', value: '#0D3B66' },
    { label: 'Cian Océano', value: '#0284C7' },
    { label: 'Celeste Cielo', value: '#06B6D4' },
    { label: 'Verde Bosque', value: '#047857' },
    { label: 'Verde Esmeralda', value: '#059669' },
    { label: 'Verde Eco Lima', value: '#65A30D' },
    { label: 'Verde Menta', value: '#10B981' },
    { label: 'Ámbar Dorado', value: '#D97706' },
    { label: 'Naranja Fuego', value: '#EA580C' },
    { label: 'Naranja Mandarina', value: '#F97316' },
    { label: 'Rojo Carmesí', value: '#DC2626' },
    { label: 'Rojo Rubí Intenso', value: '#991B1B' },
    { label: 'Fucsia Magenta', value: '#C026D3' },
    { label: 'Rosa Neón', value: '#DB2777' },
    { label: 'Violeta Eléctrico', value: '#7C3AED' },
    { label: 'Púrpura Profundo', value: '#581C87' },
    { label: 'Café / Marrón', value: '#78350F' },
    { label: 'Gris Pizarra', value: '#475569' },
    { label: 'Negro Azabache', value: '#0F172A' }
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
    const hasInitialFittedRef = useRef(false);

    // Sincronizar si cambia initialCoords externamente
    useEffect(() => {
        if (Array.isArray(initialCoords)) {
            setCoords(initialCoords);
        }
    }, [JSON.stringify(initialCoords)]);

    useEffect(() => {
        if (initialColor) {
            setColor(initialColor);
        }
    }, [initialColor]);

    // Notificar cambios al componente padre
    useEffect(() => {
        onChange({ coordenadas: coords, color });
    }, [coords, color]);

    // Determinar si el circuito está cerrado (primer punto = último punto)
    const isCircuitClosed =
        coords.length >= 3 &&
        Math.abs(coords[0].lat - coords[coords.length - 1].lat) < 0.00008 &&
        Math.abs(coords[0].lng - coords[coords.length - 1].lng) < 0.00008;

    // Distancia entre inicio y final si no está cerrado
    const startEndDistMeters =
        coords.length >= 2 && !isCircuitClosed
            ? distanceBetweenMeters(coords[0], coords[coords.length - 1])
            : null;

    const isNearStart = startEndDistMeters !== null && startEndDistMeters <= 200;

    // Inicializar mapa Leaflet con soporte de renderizado garantizado
    useEffect(() => {
        if (!mapContainerRef.current || mapInstanceRef.current) return;

        const defaultCenter =
            coords.length > 0
                ? [coords[0].lat, coords[0].lng]
                : [-9.9306, -76.2422]; // Amarilis, Huánuco

        const map = L.map(mapContainerRef.current, {
            zoomControl: true,
            center: defaultCenter,
            zoom: coords.length > 0 ? 15 : 14
        });

        const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
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
            'Mapa Callejero': osm,
            'Vista Satélite': esriSat
        }, null, { position: 'topright' }).addTo(map);

        const markersLayer = L.layerGroup().addTo(map);
        markersLayerRef.current = markersLayer;

        // Escuchar clics en el mapa para agregar puntos secuenciales
        map.on('click', (e) => {
            const clickLat = parseFloat(e.latlng.lat.toFixed(6));
            const clickLng = parseFloat(e.latlng.lng.toFixed(6));

            setCoords((prev) => {
                // Si el usuario hace clic muy cerca del punto inicial (< 25m) y hay al menos 3 puntos, cerrar circuito
                if (prev.length >= 3) {
                    const distToStart = distanceBetweenMeters({ lat: clickLat, lng: clickLng }, prev[0]);
                    if (distToStart <= 25) {
                        return [...prev, { lat: prev[0].lat, lng: prev[0].lng }];
                    }
                }
                return [...prev, { lat: clickLat, lng: clickLng }];
            });
        });

        mapInstanceRef.current = map;

        // Invalidar tamaño en múltiples fases para asegurar renderizado en modales
        const timer1 = setTimeout(() => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.invalidateSize();
            }
        }, 50);

        const timer2 = setTimeout(() => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.invalidateSize();
                if (coords.length > 1 && !hasInitialFittedRef.current) {
                    const bounds = L.latLngBounds(coords.map((c) => [c.lat, c.lng]));
                    mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 16 });
                    hasInitialFittedRef.current = true;
                } else if (coords.length === 1 && !hasInitialFittedRef.current) {
                    mapInstanceRef.current.setView([coords[0].lat, coords[0].lng], 16);
                    hasInitialFittedRef.current = true;
                }
            }
        }, 200);

        const timer3 = setTimeout(() => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.invalidateSize();
            }
        }, 500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            map.remove();
            mapInstanceRef.current = null;
        };
    }, []);

    // Actualizar polilínea y nodos arrastrables interactivos
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

        // Polilínea del recorrido
        const polyline = L.polyline(latlngs, {
            color: color,
            weight: 5,
            opacity: 0.9,
            dashArray: isCircuitClosed ? null : '6, 6',
            lineJoin: 'round',
            lineCap: 'round'
        }).addTo(map);
        polylineRef.current = polyline;

        // Centrado inicial automático sobre la ruta cargada
        if (!hasInitialFittedRef.current) {
            map.invalidateSize();
            if (coords.length > 1) {
                const bounds = L.latLngBounds(latlngs);
                map.fitBounds(bounds, { padding: [40, 40], maxZoom: 16 });
                hasInitialFittedRef.current = true;
            } else if (coords.length === 1) {
                map.setView([coords[0].lat, coords[0].lng], 16);
                hasInitialFittedRef.current = true;
            }
        }

        // Crear marcadores interactivos (nodos arrastrables)
        coords.forEach((c, idx) => {
            const isStart = idx === 0;
            const isEnd = idx === coords.length - 1 && coords.length > 1;

            let bg = color;
            let label = `${idx + 1}`;

            if (isStart) {
                bg = '#16a34a'; // Verde inicio
                label = isCircuitClosed ? '1 (INICIO/FIN)' : '1 (INICIO)';
            } else if (isEnd) {
                bg = isCircuitClosed ? '#16a34a' : '#dc2626'; // Verde si cierra circuito, Rojo si fin abierto
                label = `${idx + 1} (FIN)`;
            }

            const iconHtml = `
                <div style="
                    background-color: ${bg};
                    color: white;
                    border-radius: 9999px;
                    padding: 2px 8px;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.3px;
                    border: 2px solid white;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.45);
                    text-align: center;
                    white-space: nowrap;
                    cursor: grab;
                    transform: translate(-50%, -50%);
                    user-select: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <span>${label}</span>
                </div>
            `;

            const icon = L.divIcon({
                className: 'route-node-marker',
                html: iconHtml,
                iconSize: [44, 22],
                iconAnchor: [22, 11]
            });

            const marker = L.marker([c.lat, c.lng], {
                icon,
                draggable: true,
                autoPan: true,
                title: `Nodo ${idx + 1} - Arrastra para mover`
            });

            // Arrastre en vivo: actualizar trazado de la polilínea fluidamente
            marker.on('drag', (e) => {
                const currentLatLng = e.target.getLatLng();
                if (polylineRef.current) {
                    const currentPoints = polylineRef.current.getLatLngs();
                    currentPoints[idx] = currentLatLng;
                    polylineRef.current.setLatLngs(currentPoints);
                }
            });

            // Fin del arrastre: fijar nueva posición y comprobar snapping de cierre
            marker.on('dragend', (e) => {
                const newPos = e.target.getLatLng();
                let newLat = parseFloat(newPos.lat.toFixed(6));
                let newLng = parseFloat(newPos.lng.toFixed(6));

                // Snapping inteligente si se arrastra el último punto cerca del primero (< 35 metros)
                if (idx === coords.length - 1 && coords.length >= 3 && !isStart) {
                    const distToFirst = distanceBetweenMeters({ lat: newLat, lng: newLng }, coords[0]);
                    if (distToFirst <= 35) {
                        newLat = coords[0].lat;
                        newLng = coords[0].lng;
                        marker.setLatLng([newLat, newLng]);
                    }
                }

                setCoords((prev) => {
                    const updated = [...prev];
                    updated[idx] = { lat: newLat, lng: newLng };
                    return updated;
                });
            });

            // Popup para inspección y eliminación de nodo puntual
            const popupWrapper = document.createElement('div');
            popupWrapper.className = 'text-xs p-1 space-y-1';
            popupWrapper.style.minWidth = '160px';

            const headerDiv = document.createElement('div');
            headerDiv.style.display = 'flex';
            headerDiv.style.justifyContent = 'space-between';
            headerDiv.style.alignItems = 'center';
            headerDiv.style.fontWeight = 'bold';
            headerDiv.style.borderBottom = '1px solid #e5e7eb';
            headerDiv.style.paddingBottom = '4px';
            headerDiv.innerHTML = `
                <span>Nodo ${idx + 1} ${isStart ? '(Inicio)' : isEnd ? '(Fin)' : ''}</span>
                <span style="font-size: 9px; padding: 2px 6px; background: #eff6ff; color: #1d4ed8; border-radius: 9999px;">Móvil</span>
            `;
            popupWrapper.appendChild(headerDiv);

            const coordsDiv = document.createElement('div');
            coordsDiv.style.fontSize = '11px';
            coordsDiv.style.color = '#4b5563';
            coordsDiv.style.margin = '4px 0';
            coordsDiv.innerHTML = `
                Lat: <b>${c.lat.toFixed(6)}</b><br/>
                Lng: <b>${c.lng.toFixed(6)}</b>
            `;
            popupWrapper.appendChild(coordsDiv);

            const tipDiv = document.createElement('div');
            tipDiv.style.fontSize = '10px';
            tipDiv.style.color = '#9ca3af';
            tipDiv.style.fontStyle = 'italic';
            tipDiv.textContent = '💡 Arrastra para reubicar este punto.';
            popupWrapper.appendChild(tipDiv);

            // Botón para eliminar este nodo específico
            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.style.width = '100%';
            deleteBtn.style.marginTop = '6px';
            deleteBtn.style.padding = '4px 8px';
            deleteBtn.style.fontSize = '11px';
            deleteBtn.style.fontWeight = '600';
            deleteBtn.style.color = '#dc2626';
            deleteBtn.style.backgroundColor = '#fef2f2';
            deleteBtn.style.border = '1px solid #fecaca';
            deleteBtn.style.borderRadius = '6px';
            deleteBtn.style.cursor = 'pointer';
            deleteBtn.innerHTML = '🗑 Eliminar este nodo';
            deleteBtn.onclick = (event) => {
                event.stopPropagation();
                setCoords((prev) => prev.filter((_, i) => i !== idx));
                map.closePopup();
            };
            popupWrapper.appendChild(deleteBtn);

            marker.bindPopup(popupWrapper);
            marker.addTo(markersLayer);
        });
    }, [coords, color, isCircuitClosed]);

    // Centrar mapa a la ruta trazada
    const handleFitBounds = () => {
        const map = mapInstanceRef.current;
        if (!map || coords.length === 0) return;
        map.invalidateSize();
        if (coords.length > 1) {
            const bounds = L.latLngBounds(coords.map((c) => [c.lat, c.lng]));
            map.fitBounds(bounds, { padding: [40, 40], maxZoom: 16 });
        } else {
            map.setView([coords[0].lat, coords[0].lng], 16);
        }
    };

    // Conectar inicio con final para cerrar circuito
    const handleCloseCircuit = () => {
        if (coords.length < 3 || isCircuitClosed) return;
        setCoords((prev) => [...prev, { lat: prev[0].lat, lng: prev[0].lng }]);
    };

    // Abrir circuito si está cerrado
    const handleOpenCircuit = () => {
        if (isCircuitClosed) {
            setCoords((prev) => prev.slice(0, -1));
        }
    };

    // Deshacer último punto
    const handleUndo = () => {
        setCoords((prev) => prev.slice(0, -1));
    };

    // Limpiar toda la ruta
    const handleClear = () => {
        setCoords([]);
        hasInitialFittedRef.current = false;
    };

    // Cargar trazado de muestra
    const handleLoadSample = () => {
        const sample = [
            { lat: -9.9306, lng: -76.2422 },
            { lat: -9.9318, lng: -76.2405 },
            { lat: -9.9335, lng: -76.2412 },
            { lat: -9.9348, lng: -76.2428 },
            { lat: -9.9332, lng: -76.2442 },
            { lat: -9.9306, lng: -76.2422 } // Circuito cerrado de muestra
        ];
        hasInitialFittedRef.current = false;
        setCoords(sample);
    };

    // Aplicar JSON manual
    const handleApplyJson = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            if (
                Array.isArray(parsed) &&
                parsed.length > 0 &&
                parsed.every((p) => typeof p.lat === 'number' && typeof p.lng === 'number')
            ) {
                hasInitialFittedRef.current = false;
                setCoords(parsed);
                setShowJsonInput(false);
                setJsonInput('');
            } else {
                alert('Formato inválido. Debe ser un array con lat y lng. Ej: [{"lat": -9.93, "lng": -76.24}]');
            }
        } catch {
            alert('JSON inválido. Revisa la sintaxis.');
        }
    };

    const distance = calculateRouteDistance(coords);

    return (
        <div className="space-y-3">
            {/* Barra superior de estado e información */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-800">Editor de Ruta y Nodos</span>
                        {isCircuitClosed ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full border border-green-300">
                                <span>✓</span> Circuito Cerrado
                            </span>
                        ) : coords.length >= 3 ? (
                            <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                                Trazado abierto
                            </span>
                        ) : null}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                        Haz clic en el mapa para añadir puntos. <b>Arrastra cualquier nodo</b> para moverlo o haz clic en él para eliminarlo.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2.5 py-1 rounded-lg">
                        {coords.length} {coords.length === 1 ? 'nodo' : 'nodos'}
                    </span>
                    {coords.length > 1 && (
                        <span className="text-xs bg-green-100 text-green-800 font-bold px-2.5 py-1 rounded-lg">
                            ~{distance} km
                        </span>
                    )}
                </div>
            </div>

            {/* Alerta inteligente si el inicio y el fin están muy cerca para cerrar circuito */}
            {isNearStart && !isCircuitClosed && (
                <div className="flex items-center justify-between gap-3 bg-amber-50 border border-amber-300 px-3.5 py-2 rounded-xl text-xs text-amber-900">
                    <div className="flex items-center gap-2">
                        <span className="text-base">💡</span>
                        <span>
                            El punto final está a solo <b>{startEndDistMeters} metros</b> del punto de inicio. ¿Deseas cerrar el circuito de recolección?
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={handleCloseCircuit}
                        className="px-3 py-1 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-sm"
                    >
                        🔄 Cerrar Circuito Aquí
                    </button>
                </div>
            )}

            {/* Barra de herramientas y controles */}
            <div className="flex flex-wrap items-center justify-between gap-2.5">
                {/* Selector de color ampliado y personalizado */}
                <div className="flex flex-wrap items-center gap-2">
                    <label className="text-xs font-semibold text-gray-700">Color:</label>
                    <div className="flex flex-wrap items-center gap-1.5 max-w-sm sm:max-w-md">
                        {COLOR_PRESETS.map((p) => (
                            <button
                                key={p.value}
                                type="button"
                                title={p.label}
                                className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer ${
                                    color.toLowerCase() === p.value.toLowerCase()
                                        ? 'scale-125 border-gray-900 shadow-md ring-2 ring-blue-400'
                                        : 'border-white hover:scale-110 shadow-sm'
                                }`}
                                style={{ backgroundColor: p.value }}
                                onClick={() => setColor(p.value)}
                            />
                        ))}
                        {/* Selector de color personalizado nativo */}
                        <label
                            title="Seleccionar cualquier color personalizado"
                            className="flex items-center gap-1 px-2 py-0.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 cursor-pointer shadow-sm text-xs font-semibold text-gray-700"
                        >
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-4 h-4 rounded cursor-pointer border-0 p-0 bg-transparent"
                            />
                            <span className="text-[10px] font-mono">{color.toUpperCase()}</span>
                        </label>
                    </div>
                </div>

                {/* Botones de acción rápida */}
                <div className="flex flex-wrap items-center gap-1.5">
                    {/* Botón de cerrar / abrir circuito */}
                    {coords.length >= 3 && (
                        isCircuitClosed ? (
                            <button
                                type="button"
                                onClick={handleOpenCircuit}
                                className="px-2.5 py-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer"
                                title="Desconectar el punto final del inicial"
                            >
                                🔓 Abrir Circuito
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleCloseCircuit}
                                className="px-2.5 py-1 text-xs font-bold text-green-700 bg-green-50 border border-green-300 rounded-lg hover:bg-green-100 transition-colors cursor-pointer flex items-center gap-1"
                                title="Unir automáticamente el punto final con el inicial"
                            >
                                <span>🔄</span> Cerrar Circuito
                            </button>
                        )
                    )}

                    {/* Centrar ruta en pantalla */}
                    <button
                        type="button"
                        onClick={handleFitBounds}
                        disabled={coords.length === 0}
                        className="px-2.5 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition-colors cursor-pointer"
                        title="Ajustar y centrar la vista sobre la ruta completa"
                    >
                        🎯 Centrar
                    </button>

                    {/* Deshacer */}
                    <button
                        type="button"
                        onClick={handleUndo}
                        disabled={coords.length === 0}
                        className="px-2.5 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition-colors cursor-pointer"
                        title="Eliminar el último punto añadido"
                    >
                        ↩ Deshacer
                    </button>

                    {/* Limpiar */}
                    <button
                        type="button"
                        onClick={handleClear}
                        disabled={coords.length === 0}
                        className="px-2.5 py-1 text-xs font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-40 transition-colors cursor-pointer"
                        title="Borrar todos los nodos trazados"
                    >
                        🗑 Limpiar
                    </button>

                    {/* Ejemplo */}
                    <button
                        type="button"
                        onClick={handleLoadSample}
                        className="px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer"
                        title="Cargar recorrido de prueba"
                    >
                        ✨ Ejemplo
                    </button>

                    {/* JSON toggle */}
                    <button
                        type="button"
                        onClick={() => setShowJsonInput(!showJsonInput)}
                        className="px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                        {showJsonInput ? 'Ocultar JSON' : 'Pegar JSON'}
                    </button>
                </div>
            </div>

            {/* Entrada JSON opcional */}
            {showJsonInput && (
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                    <label className="text-xs font-bold text-gray-700">Array de Coordenadas JSON:</label>
                    <textarea
                        rows={3}
                        className="w-full text-xs font-mono p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder='[{"lat": -9.9306, "lng": -76.2422}, {"lat": -9.9325, "lng": -76.2410}]'
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={handleApplyJson}
                            className="px-3.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition cursor-pointer"
                        >
                            Cargar Coordenadas
                        </button>
                    </div>
                </div>
            )}

            {/* Contenedor del Mapa Leaflet amplio con altura explícita garantizada */}
            <div
                className="w-full rounded-xl overflow-hidden border border-gray-300 shadow-inner relative bg-gray-100"
                style={{ height: '460px', minHeight: '460px' }}
            >
                <div
                    ref={mapContainerRef}
                    className="w-full h-full"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 1
                    }}
                />
            </div>
        </div>
    );
};

RouteMapDrawer.propTypes = {
    initialCoords: PropTypes.array,
    initialColor: PropTypes.string,
    onChange: PropTypes.func
};

export default RouteMapDrawer;
