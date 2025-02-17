import React, { useState, useEffect } from 'react';
import {
    API_BASE_URL,
    showSuccessAlert,
    showErrorAlert,
    showCustomAlert,
} from '../../utils';
import TituloConRegreso from '../../components/TituloConRegreso/TituloConRegreso';
import RegisterVehicleModal from './RegisterVehicleModal';
import EditVehicleModal from './EditVehicleModal';
import AssignedZonesModal from './AssignedZonesModal';

const AdminVehiculosPage = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [message, setMessage] = useState('');
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAssignedZonesModal, setShowAssignedZonesModal] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [selectedAssignments, setSelectedAssignments] = useState([]);

    const obtener = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}recolectores`);
            const data = await response.json();

            if (response.ok) {
                setVehiculos(data.recolectores);
            } else {
                setMessage('No se pudieron cargar los vehículos');
            }
        } catch (error) {
            setMessage('Error al conectar con la API');
        }
    };

    const obtenerAsignaciones = async (recolectorId) => {
        try {
            const response = await fetch(`${API_BASE_URL}zona-recolector?recolector_id=${recolectorId}`);
            const data = await response.json();

            if (response.ok) {
                setSelectedAssignments(data.asignaciones.map(assignment => ({
                    ...assignment,
                    id: assignment.id.toString(),
                })));
            } else {
                showErrorAlert('Error', 'No se pudieron cargar las asignaciones de zonas');
            }
        } catch (error) {
            showErrorAlert('Error', 'Error al conectar con la API');
        }
    };

    useEffect(() => {
        obtener();
    }, []);

    const handleRegister = (newVehicle) => {
        setVehiculos((prev) => [...prev, newVehicle]);
        obtener();
    };

    const handleUpdate = (updatedVehicle) => {
        setVehiculos((prev) =>
            prev.map((vehiculo) =>
                vehiculo.id === updatedVehicle.id ? updatedVehicle : vehiculo
            )
        );
        obtener();
    };

    const handleDelete = async (id) => {
        const confirmed = await showCustomAlert({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer. ¿Deseas eliminar este vehículo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (confirmed.isConfirmed) {
            try {
                const response = await fetch(`${API_BASE_URL}recolectores/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setVehiculos((prev) => prev.filter((veh) => veh.id !== id));
                    showSuccessAlert('Eliminado', 'El vehículo se eliminó con éxito.');
                } else {
                    showErrorAlert('Error', 'No se pudo eliminar el vehículo.');
                }
            } catch (error) {
                showErrorAlert('Error', 'No se pudo eliminar el vehículo.');
            }
        }
    };

    return (
        <div className="max-w-full px-4 my-5 text-center">
            <TituloConRegreso titulo="Gestión de Vehículos" to="/admin" />

            {message && <p className="text-red-500">{message}</p>}

            <div className="flex justify-end">
                <button
                    className="bg-blue-500 text-white text-sm p-2 rounded-md hover:bg-blue-600 mb-1"
                    style={{ width: 'auto' }}
                    onClick={() => setShowRegisterModal(true)}
                >
                    Nuevo Vehículo
                </button>
            </div>

            {vehiculos.length === 0 ? (
                <p>No hay vehículos registrados</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 border-b">Nombre</th>
                                <th className="px-6 py-3 border-b">Placa</th>
                                <th className="px-6 py-3 border-b">Tipo de Vehículo</th>
                                <th className="px-6 py-3 border-b">Estado Operativo</th>
                                <th className="px-6 py-3 border-b">Zonas Asignadas</th>
                                <th className="px-6 py-3 border-b">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehiculos.map((vehiculo) => (
                                <tr key={vehiculo.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 border-b">
                                        {vehiculo.nombre_recolector}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {vehiculo.placa}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {vehiculo.tipo_vehiculo}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        <span
                                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${vehiculo.estado_operativo === 'operativo'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {vehiculo.estado_operativo}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                            onClick={() => {
                                                setSelectedVehicle(vehiculo);
                                                obtenerAsignaciones(vehiculo.id);
                                                setShowAssignedZonesModal(true);
                                            }}
                                        >
                                            Asignar Zonas ({vehiculo.zonas_asignadas.length})
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        <div className="flex space-x-2">
                                            <button
                                                className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500"
                                                onClick={() => {
                                                    setSelectedVehicle(vehiculo);
                                                    setShowEditModal(true);
                                                }}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                                onClick={() => handleDelete(vehiculo.id)}
                                            >
                                                Eliminar
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <RegisterVehicleModal
                show={showRegisterModal}
                onClose={() => setShowRegisterModal(false)}
                onRegister={handleRegister}
            />

            <EditVehicleModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onUpdate={handleUpdate}
                vehicle={selectedVehicle}
            />

            <AssignedZonesModal
                show={showAssignedZonesModal}
                onClose={() => setShowAssignedZonesModal(false)}
                assignments={selectedAssignments}
                recolectorId={selectedVehicle?.id?.toString()}
                onUpdate={() => {
                    obtenerAsignaciones(selectedVehicle?.id);
                    obtener();
                }}
            />
        </div>
    );
};

export default AdminVehiculosPage;