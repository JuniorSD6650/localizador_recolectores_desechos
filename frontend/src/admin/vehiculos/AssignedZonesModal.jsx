import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../../utils';

const AssignedZonesModal = ({
    show,
    onClose,
    assignments,
    recolectorId = '',
    onUpdate = () => { }
}) => {
    const [availableZones, setAvailableZones] = useState([]);
    const [selectedZone, setSelectedZone] = useState('');

    useEffect(() => {
        if (show) {
            fetchAvailableZones();
        }
    }, [show]);

    const fetchAvailableZones = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}zonas/list`);
            if (response.ok) {
                const data = await response.json();
                setAvailableZones(Array.isArray(data) ? data : []);
            } else {
                showErrorAlert('Error', 'No se pudieron cargar las zonas disponibles');
            }
        } catch (error) {
            showErrorAlert('Error', 'Error al conectar con la API');
        }
    };

    const handleAssignZone = async () => {
        if (!selectedZone) return;

        try {
            const response = await fetch(`${API_BASE_URL}zona-recolector/`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    recolector_id: recolectorId,
                    zona_id: selectedZone
                }),
            });

            if (response.ok) {
                showSuccessAlert('Éxito', 'Zona asignada correctamente');
                setSelectedZone('');
                await onUpdate();
            } else {
                const errorData = await response.json();
                showErrorAlert('Error', errorData.details || 'No se pudo asignar la zona');
            }
        } catch (error) {
            showErrorAlert('Error', 'Error al conectar con la API');
        }
    };

    const handleDeleteAssignment = async (asignacionId) => {
        try {
            const response = await fetch(`${API_BASE_URL}zona-recolector/${asignacionId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                showSuccessAlert('Éxito', 'Asignación eliminada correctamente');
                await onUpdate();
            } else {
                showErrorAlert('Error', 'No se pudo eliminar la asignación');
            }
        } catch (error) {
            showErrorAlert('Error', 'Error al conectar con la API');
        }
    };

    if (!show) return null;

    const assignedIds = new Set(assignments.map(a => a.zona_id.toString()));
    const availableOptions = availableZones.filter(az => !assignedIds.has(az.id.toString()));

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
                        Zonas Asignadas
                    </h2>
                </div>

                <div className="p-6 space-y-6">
                    {assignments.length === 0 ? (
                        <p>No hay zonas asignadas.</p>
                    ) : (
                        <ul className="list-disc list-inside">
                            {assignments.map((assignment) => (
                                <li
                                    key={assignment.id}
                                    className="mb-2 flex justify-between items-center"
                                >
                                    <div className="text-lg flex-grow">
                                        <span className="font-semibold">Zona:</span>{' '}
                                        {assignment.zona_nombre} <br />
                                    </div>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs w-16"
                                        onClick={() => handleDeleteAssignment(assignment.asignacion_id)}
                                    >
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="p-6 space-y-6">
                    <h3 className="text-lg font-semibold text-gray-700">Asignar Nueva Zona</h3>
                    <div className="flex space-x-4">
                        <select
                            className="border p-2 rounded w-full"
                            value={selectedZone}
                            onChange={e => setSelectedZone(e.target.value)}
                        >
                            <option value="">Seleccione una zona</option>
                            {availableOptions.map(az => (
                                <option key={az.id} value={az.id}>
                                    {az.nombre}
                                </option>
                            ))}
                        </select>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={handleAssignZone}
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

AssignedZonesModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    assignments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            zona_nombre: PropTypes.string,
            zona_descripcion: PropTypes.string,
            asignacion_id: PropTypes.string,
        })
    ).isRequired,
    recolectorId: PropTypes.string,
    onUpdate: PropTypes.func,
};

export default AssignedZonesModal;