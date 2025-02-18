import React, { useState, useEffect } from 'react';
import {
    API_BASE_URL,
    showSuccessAlert,
    showErrorAlert,
    showCustomAlert
} from '../../utils';
import TituloConRegreso from '../../components/TituloConRegreso/TituloConRegreso';
import RegisterVehicleModal from './RegisterVehicleModal';
import EditVehicleModal from './EditVehicleModal';
import Pagination from '../../components/Pagination/Pagination';

const AdminVehiculosPage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [message, setMessage] = useState('');
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    const obtenerVehiculos = async (page) => {
        try {
            const response = await fetch(`${API_BASE_URL}recolectores?page=${page}&limit=${limit}`);
            const data = await response.json();

            if (response.ok) {
                setVehicles(data.recolectores || []);
                setTotalPages(data.pagination.totalPages);
            } else {
                setMessage('No se pudieron cargar los vehículos');
            }
        } catch (error) {
            setMessage('Error al conectar con la API');
        }
    };

    useEffect(() => {
        obtenerVehiculos(currentPage);
    }, [currentPage]);

    const handleRegister = (newVehicle) => {
        obtenerVehiculos(currentPage);
    };

    const handleUpdate = (updatedVehicle) => {
        obtenerVehiculos(currentPage);
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
                    setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== id));
                    showSuccessAlert('Eliminado', 'El vehículo se eliminó con éxito.');
                    obtenerVehiculos(currentPage);
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

            {vehicles.length === 0 ? (
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
                                <th className="px-6 py-3 border-b">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.map((vehicle) => (
                                <tr key={vehicle.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 border-b">{vehicle.nombre_recolector}</td>
                                    <td className="px-6 py-4 border-b">{vehicle.placa}</td>
                                    <td className="px-6 py-4 border-b">{vehicle.tipo_vehiculo}</td>
                                    <td className="px-6 py-4 border-b">{vehicle.estado_operativo}</td>
                                    <td className="px-6 py-4 border-b">
                                        <div className="flex space-x-2">
                                            <button
                                                className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500"
                                                onClick={() => {
                                                    setSelectedVehicle(vehicle);
                                                    setShowEditModal(true);
                                                }}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                                onClick={() => handleDelete(vehicle.id)}
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

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />

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
        </div>
    );
};

export default AdminVehiculosPage;