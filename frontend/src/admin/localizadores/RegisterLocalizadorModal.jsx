import React, { useState } from 'react';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../../utils';

const RegisterLocalizadorModal = ({ show, onClose, onRegister, recolectores }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        recolector_id: null,
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
                const newLocalizador = await response.json();
                onRegister(newLocalizador);
                showSuccessAlert('Éxito', 'Localizador registrado correctamente');
                onClose();
                setFormData({ username: '', password: '', recolector_id: null });
            } else {
                showErrorAlert('Error', 'No se pudo registrar el localizador');
            }
        } catch (error) {
            showErrorAlert('Error', 'Error al conectar con la API');
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

            <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">

                <div className="p-6 border-b">
                    <h5 className="text-xl font-semibold">Registrar Nuevo Localizador</h5>
                    <button
                        type="button"
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                           shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={formData.username}
                                onChange={(e) =>
                                    setFormData({ ...formData, username: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                           shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Recolector Asignado
                            </label>
                            <select
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                           shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={formData.recolector_id || ''}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        recolector_id: e.target.value || null,
                                    })
                                }
                            >
                                <option value="" disabled>
                                    Seleccionar un recolector
                                </option>
                                {recolectores.map((rec) => (
                                    <option key={rec.id} value={rec.id}>
                                        {rec.nombre_recolector}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="p-6 border-t flex justify-end space-x-3">
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

export default RegisterLocalizadorModal;
