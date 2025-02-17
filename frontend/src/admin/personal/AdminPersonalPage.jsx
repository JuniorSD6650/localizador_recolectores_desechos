import React, { useState, useEffect } from 'react';
import {
    API_BASE_URL,
    showSuccessAlert,
    showErrorAlert,
    showCustomAlert
} from '../../utils';
import TituloConRegreso from '../../components/TituloConRegreso/TituloConRegreso';
import RegisterPersonalModal from './RegisterPersonalModal';
import AssignedVehiclesModal from './AssignedVehiclesModal';
import EditPersonalModal from './EditPersonalModal';
import Pagination from '../../components/Pagination/Pagination';

import SearchIcon from '@mui/icons-material/Search';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

const AdminPersonalPage = () => {
    const [personales, setPersonales] = useState([]);
    const [message, setMessage] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [showVehiclesModal, setShowVehiclesModal] = useState(false);
    const [vehiclesToShow, setVehiclesToShow] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [editingPersonal, setEditingPersonal] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    const [filterNombres, setFilterNombres] = useState('');
    const [filterEmail, setFilterEmail] = useState('');
    const [filterRole, setFilterRole] = useState('');

    useEffect(() => {
        fetchPersonales(currentPage);
    }, [currentPage]);

    const buildQueryString = () => {
        const params = new URLSearchParams();
        if (filterNombres) params.append('nombres', filterNombres);
        if (filterEmail) params.append('email', filterEmail);
        if (filterRole) params.append('role', filterRole);
        params.append('page', currentPage);
        params.append('limit', limit);
        return params.toString();
    };

    const fetchPersonales = async (page) => {
        try {
            const queryString = buildQueryString();
            const response = await fetch(`${API_BASE_URL}usuarios?${queryString}`);
            if (response.ok) {
                const data = await response.json();
                setPersonales(data.usuarios || []);
                setTotalPages(data.pagination.totalPages);
            } else {
                setMessage('No se pudieron cargar los personales');
            }
        } catch (error) {
            setMessage('Error al conectar con la API');
        }
    };

    const handleSearch = () => {
        setCurrentPage(1);
        fetchPersonales(1);
    };

    const handleLimpiar = () => {
        setFilterNombres('');
        setFilterEmail('');
        setFilterRole('');
        setMessage('');
        setCurrentPage(1);
        fetchPersonales(1);
    };

    const handleDelete = async (id) => {
        const confirmed = await showCustomAlert({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer. ¿Deseas eliminar este personal?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (confirmed.isConfirmed) {
            try {
                const response = await fetch(`${API_BASE_URL}usuarios/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    showSuccessAlert('Eliminado', 'El personal se eliminó con éxito.');
                    fetchPersonales(currentPage); 
                } else {
                    showErrorAlert('Error', 'No se pudo eliminar el personal.');
                }
            } catch (error) {
                showErrorAlert('Error', 'Hubo un problema al conectar con la API.');
            }
        }
    };

    const handleRegister = () => {
        fetchPersonales(currentPage);
    };

    const handleEdit = (personal) => {
        setEditingPersonal(personal);
        setShowEditModal(true);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const fetchAssignedVehicles = async (usuarioId) => {
        try {
            const response = await fetch(`${API_BASE_URL}usuario-recolector/?usuario_id=${usuarioId}`);
            if (response.ok) {
                const data = await response.json();
                const vehicles = data.asignaciones.map((vehicle) => ({
                    ...vehicle,
                    id: vehicle.recolector_id.toString(),
                    modelo: vehicle.modelo || 'Desconocido',
                    asignacion_id: vehicle.id.toString(),
                }));
                setVehiclesToShow(vehicles);
            } else {
                showErrorAlert('Error', 'No se pudieron cargar los vehículos asignados');
            }
        } catch (error) {
            showErrorAlert('Error', 'No se pudieron cargar los vehículos asignados');
        }
    };

    const handleShowVehicles = async (user) => {
        setCurrentUserId(user.id.toString());
        await fetchAssignedVehicles(user.id.toString());
        setShowVehiclesModal(true);
    };

    const handleUpdateAssignments = async () => {
        await fetchPersonales(currentPage);
        if (currentUserId) {
            await fetchAssignedVehicles(currentUserId); 
        }
    };

    return (
        <div className="max-w-full px-4 my-5 text-center">
            <TituloConRegreso titulo="Gestión de Personales" to="/admin" />

            {message && <p className="text-red-500">{message}</p>}

            <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        className="border p-2 rounded"
                        placeholder="Nombres"
                        value={filterNombres}
                        onChange={(e) => setFilterNombres(e.target.value)}
                    />
                    <input
                        className="border p-2 rounded"
                        placeholder="Email"
                        value={filterEmail}
                        onChange={(e) => setFilterEmail(e.target.value)}
                    />
                    <input
                        className="border p-2 rounded"
                        placeholder="Role"
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                    />
                </div>
                <div className="flex justify-end items-center mt-4 space-x-4">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={handleSearch}
                    >
                        <SearchIcon /> Buscar
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        onClick={handleLimpiar}
                    >
                        <CleaningServicesIcon /> Limpiar
                    </button>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    className="bg-blue-500 text-white text-sm p-2 rounded-md hover:bg-blue-600 mb-1"
                    style={{ width: 'auto' }}
                    onClick={() => setShowModal(true)}
                >
                    Nuevo Personal
                </button>
            </div>

            {Array.isArray(personales) && personales.length === 0 ? (
                <p className="text-center">No hay personales registrados</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 border-b">ID</th>
                                <th className="px-4 py-3 border-b">Rol</th>
                                <th className="px-4 py-3 border-b">Nombres</th>
                                <th className="px-4 py-3 border-b">Apellidos</th>
                                <th className="px-4 py-3 border-b">Email</th>
                                <th className="px-4 py-3 border-b">Teléfono</th>
                                <th className="px-4 py-3 border-b">Vehículos Asignados</th>
                                <th className="px-4 py-3 border-b">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {personales.map((personal, index) => {
                                const key = personal?.id ?? `row-${index}`;
                                const apellidos = [
                                    personal?.primer_apellido,
                                    personal?.segundo_apellido
                                ].filter(Boolean).join(' ');

                                return (
                                    <tr key={key} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 border-b">
                                            {personal?.id}
                                        </td>
                                        <td className="px-4 py-3 border-b">
                                            {personal?.role || '---'}
                                        </td>
                                        <td className="px-4 py-3 border-b">
                                            {personal?.nombres || '---'}
                                        </td>
                                        <td className="px-4 py-3 border-b">
                                            {apellidos || '---'}
                                        </td>
                                        <td className="px-4 py-3 border-b">
                                            {personal?.email || '---'}
                                        </td>
                                        <td className="px-4 py-3 border-b">
                                            {personal?.telefono || '---'}
                                        </td>
                                        <td className="px-4 py-3 border-b">
                                            <button
                                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                                onClick={() => handleShowVehicles(personal)}
                                            >
                                                Ver Vehículos ({personal.recolectores.length})
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 border-b">
                                            <div className="flex space-x-2">
                                                <button
                                                    className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500"
                                                    onClick={() => handleEdit(personal)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                                    onClick={() => handleDelete(personal.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            <RegisterPersonalModal
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                    setEditingPersonal(null);
                }}
                onRegister={handleRegister}
            />

            {currentUserId && (
                <AssignedVehiclesModal
                    show={showVehiclesModal}
                    onClose={() => setShowVehiclesModal(false)}
                    vehicles={vehiclesToShow}
                    userId={currentUserId}
                    onUpdate={handleUpdateAssignments}
                />
            )}

            <EditPersonalModal
                show={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    fetchPersonales(currentPage);
                }}
                onEdit={handleRegister}
                personal={editingPersonal}
            />
        </div>
    );
};

export default AdminPersonalPage;