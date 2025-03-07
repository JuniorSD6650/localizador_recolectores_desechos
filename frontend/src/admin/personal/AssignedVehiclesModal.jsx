import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../../utils';

const AssignedVehiclesModal = ({ show, onClose, vehicles, userId = '', onUpdate = () => { } }) => {
    const [availableVehicles, setAvailableVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState('');

    useEffect(() => {
        if (show) {
            fetchAvailableVehicles();
        }
    }, [show, vehicles]);

    const fetchAvailableVehicles = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}recolectores/list`);
            if (response.ok) {
                const data = await response.json();
                const assignedVehicleIds = new Set(vehicles.map(vehicle => vehicle.recolector_id));
                const filteredVehicles = data.filter(vehicle => !assignedVehicleIds.has(vehicle.id));
                setAvailableVehicles(filteredVehicles);
            } else {
                showErrorAlert('Error', 'No se pudieron cargar los vehículos disponibles');
            }
        } catch (error) {
            showErrorAlert('Error', 'Error al conectar con la API');
        }
    };

    const handleAssignVehicle = async () => {
        if (!selectedVehicle) return;
        
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "usuario_id": userId,
                "recolector_id": selectedVehicle
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const response = await fetch(`${API_BASE_URL}usuario-recolector/`, requestOptions);

            if (response.ok) {
                showSuccessAlert('Éxito', 'Vehículo asignado correctamente');
                if (onUpdate) onUpdate();
                fetchAvailableVehicles();
                setSelectedVehicle('');
            } else {
                const errorData = await response.json();
                showErrorAlert('Error', errorData.details || 'No se pudo asignar el vehículo');
            }
        } catch (error) {
            showErrorAlert('Error', 'Error al conectar con la API');
        }
    };

    const handleDeleteAssignment = async (asignacionId) => {
        try {
            const requestOptions = {
                method: "DELETE",
                redirect: "follow"
            };

            const response = await fetch(`${API_BASE_URL}usuario-recolector/${asignacionId}`, requestOptions);

            if (response.ok) {
                showSuccessAlert('Éxito', 'Asignación eliminada correctamente');
                if (onUpdate) onUpdate();
                fetchAvailableVehicles();
            } else {
                showErrorAlert('Error', 'No se pudo eliminar la asignación');
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
                        Vehículos Asignados
                    </h2>
                </div>

                <div className="p-6 space-y-6">
                    {vehicles.length === 0 ? (
                        <p>No hay vehículos asignados.</p>
                    ) : (
                        <ul className="list-disc list-inside">
                            {vehicles.map((vehicle, index) => (
                                <li key={index} className="mb-2 flex justify-between items-center">
                                    <div className="text-lg flex-grow">
                                        <span className="font-semibold">Nombre:</span> {vehicle.nombre_recolector} <br />
                                        <span className="font-semibold">Tipo de Vehículo:</span> {vehicle.tipo_vehiculo} <br />
                                        <span className="font-semibold">Placa:</span> {vehicle.placa}
                                    </div>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs w-16"
                                        onClick={() => handleDeleteAssignment(vehicle.asignacion_id)}
                                    >
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="p-6 space-y-6">
                    <h3 className="text-lg font-semibold text-gray-700">Asignar Nuevo Vehículo</h3>
                    <div className="flex space-x-4">
                        <select
                            className="border p-2 rounded w-full"
                            value={selectedVehicle}
                            onChange={(e) => setSelectedVehicle(e.target.value)}
                        >
                            <option value="">Seleccione un vehículo</option>
                            {availableVehicles.map((vehicle) => (
                                <option key={vehicle.id} value={vehicle.id}>
                                    {vehicle.nombre_recolector}
                                </option>
                            ))}
                        </select>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={handleAssignVehicle}
                        >
                            Asignar
                        </button>
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
                </div>
            </div>
        </div>
    );
};

AssignedVehiclesModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    vehicles: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            nombre_recolector: PropTypes.string.isRequired,
            tipo_vehiculo: PropTypes.string.isRequired,
            placa: PropTypes.string.isRequired,
            asignacion_id: PropTypes.string.isRequired,
        })
    ).isRequired,
    userId: PropTypes.string,
    onUpdate: PropTypes.func,
};

export default AssignedVehiclesModal;