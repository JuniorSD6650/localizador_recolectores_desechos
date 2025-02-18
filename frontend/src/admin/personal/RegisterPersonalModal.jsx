import React, { useState } from 'react';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../../utils';

const RegisterPersonalModal = ({ show, onClose, onRegister }) => {
    const [formData, setFormData] = useState({
        role: 'conductor',
        nombres: '',
        primer_apellido: '',
        segundo_apellido: '',
        email: '',
        telefono: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}usuarios`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const newPersonal = await response.json();
                onRegister(newPersonal);
                showSuccessAlert('Éxito', 'Personal registrado correctamente');
                onClose();
                setFormData({
                    role: 'conductor',
                    nombres: '',
                    primer_apellido: '',
                    segundo_apellido: '',
                    email: '',
                    telefono: '',
                });
            } else {
                showErrorAlert('Error', 'No se pudo registrar el personal');
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
                className="bg-white rounded-lg shadow-lg w-full max-w-2xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-700">
                        Registrar Nuevo Personal
                    </h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Rol
                                </label>
                                <select
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                                    shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.role}
                                    onChange={(e) =>
                                        setFormData({ ...formData, role: e.target.value })
                                    }
                                >
                                    <option value="conductor">Conductor</option>
                                    <option value="recolector">Recolector</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nombres
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                             shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.nombres}
                                    onChange={(e) =>
                                        setFormData({ ...formData, nombres: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Primer Apellido
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                             shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.primer_apellido}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            primer_apellido: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Segundo Apellido
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                             shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.segundo_apellido}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            segundo_apellido: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                             shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Teléfono
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                             shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.telefono}
                                    onChange={(e) =>
                                        setFormData({ ...formData, telefono: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t flex justify-end space-x-3">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Registrar
                        </button>
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPersonalModal;
