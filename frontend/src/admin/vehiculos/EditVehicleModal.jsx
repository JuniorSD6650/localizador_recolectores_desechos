import React, { useState, useEffect } from 'react';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../../utils';

const EditVehicleModal = ({ show, onClose, onUpdate, vehicle }) => {
    const [nombre, setNombre] = useState('');
    const [placa, setPlaca] = useState('');
    const [tipoVehiculo, setTipoVehiculo] = useState('');
    const [estadoOperativo, setEstadoOperativo] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (vehicle) {
            setNombre(vehicle.nombre_recolector);
            setPlaca(vehicle.placa);
            setTipoVehiculo(vehicle.tipo_vehiculo);
            setEstadoOperativo(vehicle.estado_operativo);
        }
    }, [vehicle]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            nombre_recolector: nombre,
            placa: placa,
            tipo_vehiculo: tipoVehiculo,
            estado_operativo: estadoOperativo,
        };

        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}recolectores/${vehicle.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                showSuccessAlert('¡Vehículo actualizado!', 'El vehículo se ha actualizado exitosamente.');
                onUpdate(result);
                onClose();
            } else {
                showErrorAlert('Error', 'No se pudo actualizar el vehículo.');
            }
        } catch (error) {
            showErrorAlert('Error', 'Hubo un problema al conectar con la API.');
        } finally {
            setLoading(false);
        }
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
                <h4 className="text-xl font-semibold mb-4">Editar Vehículo</h4>

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
                        <label htmlFor="placa" className="block text-sm font-medium text-gray-700">
                            Placa
                        </label>
                        <input
                            type="text"
                            id="placa"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 
                         text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={placa}
                            onChange={(e) => setPlaca(e.target.value)}
                            placeholder="Ingrese la placa del vehículo"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="tipoVehiculo" className="block text-sm font-medium text-gray-700">
                            Tipo de Vehículo
                        </label>
                        <input
                            type="text"
                            id="tipoVehiculo"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 
                         text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={tipoVehiculo}
                            onChange={(e) => setTipoVehiculo(e.target.value)}
                            placeholder="Ingrese el tipo de vehículo"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="estadoOperativo" className="block text-sm font-medium text-gray-700">
                            Estado Operativo
                        </label>
                        <select
                            id="estadoOperativo"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 
                         text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={estadoOperativo}
                            onChange={(e) => setEstadoOperativo(e.target.value)}
                            required
                        >
                            <option value="operativo">Operativo</option>
                            <option value="inoperativo">Inoperativo</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
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

export default EditVehicleModal;