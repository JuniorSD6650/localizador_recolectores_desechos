import React, { useState } from 'react';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../../utils';

const RegisterVehicleModal = ({ show, onClose, onRegister }) => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [zona, setZona] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (telefono && !/^[0-9]{9}$/.test(telefono)) {
            showErrorAlert(
                'Error',
                'El número de teléfono debe ser numérico y tener exactamente 9 dígitos.'
            );
            return;
        }

        const data = {
            nombre_recolector: nombre,
            telefono_recolector: telefono || null,
            zona_responsable: zona || null,
            estado: 'activo',
            organizacion_id: 1,
        };

        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}recolectores`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                showSuccessAlert(
                    '¡Vehículo registrado!',
                    'El nuevo vehículo se ha registrado exitosamente.'
                );
                onRegister({
                    ...result,
                    estado: result.estado || 'activo',
                    telefono_recolector: result.telefono_recolector || 'No disponible',
                    zona_responsable: result.zona_responsable || 'No asignada',
                });

                setNombre('');
                setTelefono('');
                setZona('');
                onClose();
            } else {
                showErrorAlert('Error', 'No se pudo registrar el vehículo.');
            }
        } catch (error) {
            showErrorAlert('Error', 'Hubo un problema al conectar con la API.');
        } finally {
            setLoading(false);
        }
    };

    const handleTelefonoChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setTelefono(value.slice(0, 9));
    };

    if (!show) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow max-w-md w-full p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <h4 className="text-xl font-semibold mb-4">Registrar Nuevo Vehículo</h4>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                            Nombre del Vehículo
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 
                         text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Ingrese el nombre del vehículo"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                            Teléfono
                        </label>
                        <input
                            type="text"
                            id="telefono"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 
                         text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={telefono}
                            onChange={handleTelefonoChange}
                            placeholder="Ingrese el teléfono (opcional)"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="zona" className="block text-sm font-medium text-gray-700">
                            Zona Responsable
                        </label>
                        <input
                            type="text"
                            id="zona"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 
                         text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={zona}
                            onChange={(e) => setZona(e.target.value)}
                            placeholder="Ingrese la zona responsable (opcional)"
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Registrando...' : 'Registrar'}
                        </button>
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterVehicleModal;
