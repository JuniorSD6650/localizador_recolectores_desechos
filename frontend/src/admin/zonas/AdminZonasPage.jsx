import React, { useState, useEffect } from 'react';
import {
    API_BASE_URL,
    BASE_URL,
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

    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');

    const [filterNombre, setFilterNombre] = useState('');
    const [filterDescripcion, setFilterDescripcion] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 8;

    const obtenerZonas = async () => {
        try {
            const queryString = buildQueryString();
            const response = await fetch(`${API_BASE_URL}zonas?${queryString}`);
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

    const buildQueryString = () => {
        const params = new URLSearchParams();
        if (filterNombre) params.append('nombre', filterNombre);
        if (filterDescripcion) params.append('descripcion', filterDescripcion);
        params.append('page', currentPage);
        params.append('limit', limit);
        return params.toString();
    };

    const handleSearch = () => {
        setCurrentPage(1);
        obtenerZonas(1);
    };

    const handleLimpiar = () => {
        setFilterNombre('');
        setFilterDescripcion('');
        setMessage('');
        setCurrentPage(1);
        obtenerZonas(1);
    };

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

    const handleImageClick = (imageUrl) => {
        setSelectedImageUrl(imageUrl);
        setShowImageModal(true);
    };

    const closeImageModal = () => {
        setShowImageModal(false);
        setSelectedImageUrl('');
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen mt-16">
            <TituloConRegreso titulo="Gestión de Zonas" to="/admin" />

            {message && <p className="text-red-500">{message}</p>}

            <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        className="border p-2 rounded"
                        placeholder="Nombre"
                        value={filterNombre}
                        onChange={(e) => setFilterNombre(e.target.value)}
                    />
                    <input
                        className="border p-2 rounded"
                        placeholder="Descripción"
                        value={filterDescripcion}
                        onChange={(e) => setFilterDescripcion(e.target.value)}
                    />
                </div>
                <div className="flex justify-end items-center mt-4 space-x-4">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={handleSearch}
                    >
                        Buscar
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        onClick={handleLimpiar}
                    >
                        Limpiar
                    </button>
                </div>
            </div>

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
                                <th className="px-6 py-3 border-b">Imagen</th>
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
                                        {zona.imagen ? (
                                            <img
                                                src={`${BASE_URL}${zona.imagen}`}
                                                alt={zona.nombre}
                                                className="h-16 object-cover mx-auto cursor-pointer"
                                                onClick={() => handleImageClick(zona.imagen)}
                                            />
                                        ) : (
                                            '---'
                                        )}
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

            {showImageModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={closeImageModal}
                >
                    <img
                        src={`${BASE_URL}${selectedImageUrl}`}
                        alt="Zona"
                        className="object-cover h-96"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        className="absolute top-5 right-5 text-white text-2xl bg-gray-800 bg-opacity-50 rounded-full px-2 py-1"
                        onClick={closeImageModal}
                    >
                        X
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminZonasPage;