import React, { useState, useEffect } from 'react';
import {
    API_BASE_URL,
    showSuccessAlert,
    showErrorAlert,
    showCustomAlert
} from '../../utils';
import TituloConRegreso from '../../components/TituloConRegreso/TituloConRegreso';
import RegisterZonaModal from './RegisterZonaModal';
import EditZonaModal from './EditZonaModal';
import Pagination from '../../components/Pagination/Pagination';

const AdminZonasPage = () => {
    const [zonas, setZonas] = useState([]);
    const [message, setMessage] = useState('');
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedZona, setSelectedZona] = useState(null);

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    const obtenerZonas = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}zonas?page=${currentPage}&limit=${limit}`);
            const data = await response.json();

            if (response.ok) {
                setZonas(data.zonas);
                setTotalPages(data.pagination.totalPages);
            } else {
                setMessage('No se pudieron cargar las zonas');
            }
        } catch (error) {
            setMessage('Error al conectar con la API');
        }
    };

    useEffect(() => {
        obtenerZonas();
    }, [currentPage]);

    const handleRegister = (newZona) => {
        setZonas((prev) => [...prev, newZona]);
        obtenerZonas();
    };

    const handleUpdate = (updatedZona) => {
        setZonas((prev) =>
            prev.map((zona) =>
                zona.id === updatedZona.id ? updatedZona : zona
            )
        );
        obtenerZonas();
    };

    const handleDelete = async (id) => {
        const confirmed = await showCustomAlert({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer. ¿Deseas eliminar esta zona?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (confirmed.isConfirmed) {
            try {
                const response = await fetch(`${API_BASE_URL}zonas/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setZonas((prev) => prev.filter((zona) => zona.id !== id));
                    showSuccessAlert('Eliminado', 'La zona se eliminó con éxito.');
                } else {
                    showErrorAlert('Error', 'No se pudo eliminar la zona.');
                }
            } catch (error) {
                showErrorAlert('Error', 'No se pudo eliminar la zona.');
            }
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="max-w-full px-4 my-5 text-center">
            <TituloConRegreso titulo="Gestión de Zonas" to="/admin" />

            {message && <p className="text-red-500">{message}</p>}

            <div className="flex justify-end">
                <button
                    className="bg-blue-500 text-white text-sm p-2 rounded-md hover:bg-blue-600 mb-1"
                    style={{ width: 'auto' }}
                    onClick={() => setShowRegisterModal(true)}
                >
                    Nueva Zona
                </button>
            </div>

            {zonas.length === 0 ? (
                <p>No hay zonas registradas</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 border-b">Nombre</th>
                                <th className="px-6 py-3 border-b">Descripción</th>
                                <th className="px-6 py-3 border-b">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {zonas.map((zona) => (
                                <tr key={zona.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 border-b">
                                        {zona.nombre}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {zona.descripcion || '---'}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        <div className="flex space-x-2">
                                            <button
                                                className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500"
                                                onClick={() => {
                                                    setSelectedZona(zona);
                                                    setShowEditModal(true);
                                                }}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                                onClick={() => handleDelete(zona.id)}
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
                onPageChange={handlePageChange}
            />

            <RegisterZonaModal
                show={showRegisterModal}
                onClose={() => setShowRegisterModal(false)}
                onRegister={handleRegister}
            />

            <EditZonaModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onUpdate={handleUpdate}
                zona={selectedZona}
            />
        </div>
    );
};

export default AdminZonasPage;