import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../../utils';
import RouteMapDrawer, { calculateRouteDistance } from '../../components/Map/RouteMapDrawer';
import MapIcon from '@mui/icons-material/Map';
import CloseIcon from '@mui/icons-material/Close';

const ZonaRouteModal = ({ show = false, onClose = () => { }, onUpdate = () => { }, zona = null }) => {
    // Extraer coordenadas iniciales de la zona de forma segura
    const initialCoords = useMemo(() => {
        if (!zona) return [];
        let coords = [];
        if (Array.isArray(zona.coordenadas_ruta)) {
            coords = zona.coordenadas_ruta;
        } else if (typeof zona.coordenadas_ruta === 'string') {
            try {
                coords = JSON.parse(zona.coordenadas_ruta || '[]');
            } catch {
                coords = [];
            }
        }
        return Array.isArray(coords) ? coords : [];
    }, [zona?.id, zona?.coordenadas_ruta]);

    const initialColor = zona?.color_ruta || '#1976D2';

    const [routeData, setRouteData] = useState({
        coordenadas: initialCoords,
        color: initialColor
    });
    const [saving, setSaving] = useState(false);

    // Reinicializar al abrir para una zona distinta
    useEffect(() => {
        if (zona) {
            setRouteData({
                coordenadas: initialCoords,
                color: initialColor
            });
        }
    }, [zona?.id, initialCoords, initialColor]);

    // Bloquear scroll en body mientras el modal esté activo
    useEffect(() => {
        if (!show) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, [show]);

    if (!show || !zona) return null;

    const handleSave = async () => {
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append('coordenadas_ruta', JSON.stringify(routeData.coordenadas || []));
            formData.append('color_ruta', routeData.color || '#1976D2');

            const response = await fetch(`${API_BASE_URL}zonas/${zona.id}`, {
                method: 'PUT',
                body: formData
            });

            if (response.ok) {
                showSuccessAlert(
                    'Ruta Guardada',
                    `El recorrido de la zona "${zona.nombre}" se guardó con éxito.`
                );
                onUpdate();
                onClose();
            } else {
                const errData = await response.json().catch(() => null);
                showErrorAlert('Error', errData?.error || 'No se pudo guardar la ruta de la zona.');
            }
        } catch (error) {
            console.error('Error al guardar ruta:', error);
            showErrorAlert('Error', 'Error de conexión con el servidor al guardar la ruta.');
        } finally {
            setSaving(false);
        }
    };

    const hasPoints = Array.isArray(routeData.coordenadas) && routeData.coordenadas.length > 0;
    const distance = hasPoints ? calculateRouteDistance(routeData.coordenadas) : '0';

    return createPortal(
        <div
            className="fixed inset-0 bg-black/75 flex items-center justify-center p-3 md:p-6"
            style={{ zIndex: 999999 }}
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[94vh] border border-gray-100 relative"
                style={{ zIndex: 1000000 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50/80">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shadow-xs">
                            <MapIcon fontSize="small" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <span>Trazado de Ruta:</span>
                                <span className="text-blue-700">{zona.nombre}</span>
                            </h2>
                            <p className="text-xs text-gray-500">
                                {hasPoints
                                    ? `Recorrido cargado con ${routeData.coordenadas.length} nodos (~${distance} km). Puedes mover nodos arrastrándolos o añadir nuevos.`
                                    : 'Sin trazado previo. Haz clic sobre las calles para definir el circuito de recolección.'}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        title="Cerrar"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* Body con el editor de mapa */}
                <div className="p-5 md:p-6 overflow-y-auto flex-1 bg-white">
                    <RouteMapDrawer
                        key={`drawer-zona-${zona.id}`}
                        initialCoords={initialCoords}
                        initialColor={initialColor}
                        onChange={setRouteData}
                    />
                </div>

                {/* Footer con resumen y acciones */}
                <div className="px-6 py-4 border-t bg-gray-50 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs">
                        <span className="font-semibold text-gray-700">Resumen:</span>
                        {hasPoints ? (
                            <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-semibold">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                {routeData.coordenadas.length} puntos (~{distance} km)
                            </span>
                        ) : (
                            <span className="text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full font-medium">
                                ⚠️ Sin puntos trazados aún
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            disabled={saving}
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            disabled={saving}
                            onClick={handleSave}
                            className="inline-flex items-center gap-2 px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition disabled:opacity-50 cursor-pointer"
                        >
                            {saving ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
                                    <span>Guardando...</span>
                                </>
                            ) : (
                                <span>Guardar Cambios</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

ZonaRouteModal.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    onUpdate: PropTypes.func,
    zona: PropTypes.object
};

export default ZonaRouteModal;
