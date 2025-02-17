import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../../utils';

const EditZonaModal = ({ show, onClose, onUpdate, zona }) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    useEffect(() => {
        if (zona) {
            setNombre(zona.nombre);
            setDescripcion(zona.descripcion);
        }
    }, [zona]);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}zonas/${zona.id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, descripcion }),
            });

            if (response.ok) {
                const updatedZona = await response.json();
                showSuccessAlert('Éxito', 'Zona actualizada correctamente');
                onUpdate(updatedZona);
                onClose();
            } else {
                showErrorAlert('Error', 'No se pudo actualizar la zona');
            }
        } catch (error) {
            showErrorAlert('Error', 'Error al conectar con la API');
        }
    };

    if (!show) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-lg w-full max-w-md relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-700">
                        Editar Zona
                    </h2>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-gray-700">Nombre</label>
                        <input
                            type="text"
                            className="border p-2 rounded w-full"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Descripción</label>
                        <textarea
                            className="border p-2 rounded w-full"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>
                </div>

                <div className="p-4 border-t flex justify-end space-x-3">
                    <button
                        type="button"
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                    <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={handleUpdate}
                    >
                        Actualizar
                    </button>
                </div>
            </div>
        </div>
    );
};

EditZonaModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    zona: PropTypes.shape({
        id: PropTypes.number,
        nombre: PropTypes.string,
        descripcion: PropTypes.string,
    }),
};

export default EditZonaModal;