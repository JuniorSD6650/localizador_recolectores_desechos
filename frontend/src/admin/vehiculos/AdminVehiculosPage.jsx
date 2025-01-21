import React, { useState, useEffect } from 'react';
import { API_BASE_URL, showSuccessAlert, showErrorAlert, showCustomAlert } from '../../utils';
import TituloConRegreso from '../../components/TituloConRegreso';
import RegisterVehicleModal from './RegisterVehicleModal';
import EditVehicleModal from './EditVehicleModal';

const AdminVehiculosPage = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [message, setMessage] = useState('');
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    useEffect(() => {
        const fetchVehiculos = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}recolectores`);
                const data = await response.json();

                if (response.ok) {
                    setVehiculos(data);
                } else {
                    setMessage('No se pudieron cargar los vehículos');
                }
            } catch (error) {
                setMessage('Error al conectar con la API');
            }
        };

        fetchVehiculos();
    }, []);

    const handleRegister = (newVehicle) => {
        setVehiculos((prevVehiculos) => [...prevVehiculos, newVehicle]);
    };

    const handleUpdate = (updatedVehicle) => {
        setVehiculos((prevVehiculos) =>
            prevVehiculos.map((vehiculo) =>
                vehiculo.id === updatedVehicle.id ? updatedVehicle : vehiculo
            )
        );
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
                    setVehiculos((prevVehiculos) => prevVehiculos.filter((vehiculo) => vehiculo.id !== id));
                    showSuccessAlert('Eliminado', 'El vehículo se eliminó con éxito.');
                } else {
                    showErrorAlert('Error', 'No se pudo eliminar el vehículo.');
                }
            } catch (error) {
                showErrorAlert('Error', 'Hubo un problema al conectar con la API.');
            }
        }
    };

    return (
        <div className="container my-5 text-center">
            <TituloConRegreso titulo="Gestión de Vehículos" to="/admin" />

            {message && <p className="text-danger">{message}</p>}

            <div className="mb-3 d-flex justify-content-end">
                <button className="btn-register" onClick={() => setShowRegisterModal(true)}>
                    Nuevo Vehículo
                </button>
            </div>

            {vehiculos.length === 0 ? (
                <p className="text-center">No hay vehículos registrados</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-hover text-center">
                        <thead className="table-light">
                            <tr>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>Zona Responsable</th>
                                <th>Ubicación</th>
                                <th>Actualización Ubicación</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehiculos.map((vehiculo) => (
                                <tr key={vehiculo.id}>
                                    <td>{vehiculo.nombre_recolector}</td>
                                    <td>{vehiculo.telefono_recolector || 'No disponible'}</td>
                                    <td>{vehiculo.zona_responsable || 'No disponible'}</td>
                                    <td>{vehiculo.ubicacion_enlace || 'No disponible'}</td>
                                    <td>{vehiculo.fecha_ubicacion_actualizada || 'No disponible'}</td>
                                    <td>
                                        <span
                                            className={`badge ${vehiculo.estado === 'activo' ? 'bg-success' : 'bg-danger'
                                                }`}
                                        >
                                            {vehiculo.estado.charAt(0).toUpperCase() + vehiculo.estado.slice(1)}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-edit me-2"
                                            onClick={() => {
                                                setSelectedVehicle(vehiculo);
                                                setShowEditModal(true);
                                            }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(vehiculo.id)}
                                        >
                                            Eliminar
                                        </button>
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
        </div>
    );
};

export default AdminVehiculosPage;
