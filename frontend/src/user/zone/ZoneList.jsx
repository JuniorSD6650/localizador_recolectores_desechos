import React, { useState, useEffect } from 'react';
import {
    API_BASE_URL,
    BASE_URL,
    showSuccessAlert,
    showErrorAlert,
    showCustomAlert
} from '../../utils';
import TituloConRegreso from '../../components/TituloConRegreso/TituloConRegreso';

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
            <TituloConRegreso titulo="Lista de Zonas" to="/" />

            {message && <p className="text-red-500">{message}</p>}

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