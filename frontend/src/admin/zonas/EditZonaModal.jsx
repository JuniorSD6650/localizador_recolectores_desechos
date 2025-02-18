import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../../utils';

const EditZonaModal = ({ show, onClose, onUpdate, zona }) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState(null);

    useEffect(() => {
        if (zona) {
            setNombre(zona.nombre);
            setDescripcion(zona.descripcion);
        }
    }, [zona]);

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        if (imagen) {
            formData.append('imagen', imagen);
        }

        try {
            const response = await fetch(`${API_BASE_URL}zonas/${zona.id}`, {
                method: 'PUT',
                body: formData,
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
                className="bg-white rounded-lg shadow-lg w-full max-w-lg relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-700">
                        Editar Zona
                    </h2>
                </div>

                <div className="p-6 space-y-6">
                    <input
                        type="text"
                        className="border p-2 rounded w-full"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <textarea
                        className="border p-2 rounded w-full"
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                    <input
                        type="file"
                        className="border p-2 rounded w-full"
                        onChange={(e) => setImagen(e.target.files[0])}
                    />
                </div>

                <div className="p-4 border-t flex justify-end space-x-3">
                    <button
                        type="button"
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        onClick={onClose}
                    >
                        Cancelar
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
        id: PropTypes.number.isRequired,
        nombre: PropTypes.string.isRequired,
        descripcion: PropTypes.string,
        imagen: PropTypes.string,
    }),
};

export default EditZonaModal;