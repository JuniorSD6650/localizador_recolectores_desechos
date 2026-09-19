import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../../utils';
import RouteMapDrawer from '../../components/Map/RouteMapDrawer';

const RegisterZonaModal = ({ show, onClose, onRegister }) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState(null);
    const [routeData, setRouteData] = useState({ coordenadas: [], color: '#1976D2' });

    const handleRegister = async () => {
        if (!nombre.trim()) {
            showErrorAlert('Campo requerido', 'El nombre de la zona es obligatorio.');
            return;
        }

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        if (imagen) {
            formData.append('imagen', imagen);
        }
        if (routeData.coordenadas && routeData.coordenadas.length > 0) {
            formData.append('coordenadas_ruta', JSON.stringify(routeData.coordenadas));
        }
        formData.append('color_ruta', routeData.color || '#1976D2');

        try {
            const response = await fetch(`${API_BASE_URL}zonas`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const newZona = await response.json();
                showSuccessAlert('Éxito', 'Zona y recorrido registrados correctamente');
                onRegister(newZona);
                // Reset
                setNombre('');
                setDescripcion('');
                setImagen(null);
                setRouteData({ coordenadas: [], color: '#1976D2' });
                onClose();
            } else {
                showErrorAlert('Error', 'No se pudo registrar la zona');
            }
        } catch (error) {
            showErrorAlert('Error', 'Error al conectar con la API');
        }
    };

    if (!show) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">
                            Registrar Nueva Zona y Ruta
                        </h2>
                        <p className="text-xs text-gray-500">
                            Define la información básica y marca los puntos del recorrido planificado.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-lg p-1"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Nombre de la Zona *
                            </label>
                            <input
                                type="text"
                                className="border border-gray-300 p-2 rounded-lg w-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Ej. Paucarbamba S1 y S2"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Imagen de Referencia
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                className="border border-gray-300 p-1.5 rounded-lg w-full text-xs"
                                onChange={(e) => setImagen(e.target.files[0])}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Descripción / Observaciones
                        </label>
                        <textarea
                            rows={2}
                            className="border border-gray-300 p-2 rounded-lg w-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Detalles sobre el sector, horarios o tipo de recolección..."
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>

                    <div className="pt-3 border-t">
                        <RouteMapDrawer
                            initialCoords={routeData.coordenadas}
                            initialColor={routeData.color}
                            onChange={setRouteData}
                        />
                    </div>
                </div>

                <div className="p-4 border-t bg-gray-50 flex justify-end space-x-3">
                    <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-100"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm"
                        onClick={handleRegister}
                    >
                        Guardar Zona y Ruta
                    </button>
                </div>
            </div>
        </div>
    );
};

RegisterZonaModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
};

export default RegisterZonaModal;