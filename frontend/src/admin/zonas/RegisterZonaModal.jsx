import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../../utils';

const RegisterZonaModal = ({ show, onClose, onRegister }) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState(null);

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

        try {
            const response = await fetch(`${API_BASE_URL}zonas`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const newZona = await response.json();
                showSuccessAlert('Éxito', 'Zona registrada correctamente. Ahora puedes trazar su ruta con un solo clic en la tabla.');
                onRegister(newZona);
                // Reset
                setNombre('');
                setDescripcion('');
                setImagen(null);
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
                className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[92vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">
                            Registrar Nueva Zona
                        </h2>
                        <p className="text-xs text-gray-500">
                            Define la información básica de la zona. Podrás trazar su recorrido desde la tabla.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-lg p-1 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Nombre de la Zona *
                        </label>
                        <input
                            type="text"
                            className="border border-gray-300 p-2 rounded-lg w-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Ej. Paucarbamba Sector 1"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Imagen de Referencia (opcional)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            className="border border-gray-300 p-1.5 rounded-lg w-full text-xs cursor-pointer"
                            onChange={(e) => setImagen(e.target.files[0])}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Descripción / Observaciones
                        </label>
                        <textarea
                            rows={3}
                            className="border border-gray-300 p-2 rounded-lg w-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Detalles sobre el sector, horarios o tipo de recolección..."
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>
                </div>

                <div className="p-4 border-t bg-gray-50 flex justify-end space-x-3">
                    <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-100 cursor-pointer"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm cursor-pointer"
                        onClick={handleRegister}
                    >
                        Guardar Zona
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