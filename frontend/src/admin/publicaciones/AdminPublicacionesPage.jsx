import React, { useState, useEffect } from 'react';
import {
    API_BASE_URL,
    BASE_URL,
    showSuccessAlert,
    showErrorAlert,
    showCustomAlert
} from '../../utils';
import TituloConRegreso from '../../components/TituloConRegreso/TituloConRegreso';
import RegisterPublicacionModal from './RegisterPublicacionModal';
import EditPublicacionModal from './EditPublicacionModal';
import Pagination from '../../components/Pagination/Pagination';

// Icons
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';

const AdminPublicacionesPage = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [message, setMessage] = useState('');
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPublicacion, setSelectedPublicacion] = useState(null);

    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');

    const [filterTitulo, setFilterTitulo] = useState('');
    const [filterDescripcion, setFilterDescripcion] = useState('');
    const [filterActivo, setFilterActivo] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    const obtenerPublicaciones = async (page) => {
        try {
            const queryString = buildQueryString();
            const response = await fetch(`${API_BASE_URL}publicaciones?${queryString}`);
            const data = await response.json();

            if (response.ok) {
                setPublicaciones(data.publicaciones);
                setTotalPages(data.pagination.totalPages);
            } else {
                setMessage('No se pudieron cargar las publicaciones');
            }
        } catch (error) {
            setMessage('Error al conectar con la API');
        }
    };

    useEffect(() => {
        obtenerPublicaciones(currentPage);
    }, [currentPage]);

    const buildQueryString = () => {
        const params = new URLSearchParams();
        if (filterTitulo) params.append('titulo', filterTitulo);
        if (filterDescripcion) params.append('descripcion', filterDescripcion);
        if (filterActivo) params.append('activo', filterActivo);
        params.append('page', currentPage);
        params.append('limit', limit);
        return params.toString();
    };

    const handleSearch = () => {
        setCurrentPage(1);
        obtenerPublicaciones(1);
    };

    const handleLimpiar = () => {
        setFilterTitulo('');
        setFilterDescripcion('');
        setFilterActivo('');
        setMessage('');
        setCurrentPage(1);
        obtenerPublicaciones(1);
    };

    const handleRegister = (newPublicacion) => {
        obtenerPublicaciones(currentPage);
    };

    const handleUpdate = (updatedPublicacion) => {
        obtenerPublicaciones(currentPage);
    };

    const handleDelete = async (id) => {
        const confirmed = await showCustomAlert({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer. ¿Deseas eliminar esta publicación?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (confirmed.isConfirmed) {
            try {
                const response = await fetch(`${API_BASE_URL}publicaciones/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setPublicaciones((prev) => prev.filter((pub) => pub.id !== id));
                    showSuccessAlert('Eliminado', 'La publicación se eliminó con éxito.');
                    obtenerPublicaciones(currentPage);
                } else {
                    showErrorAlert('Error', 'No se pudo eliminar la publicación.');
                }
            } catch (error) {
                showErrorAlert('Error', 'No se pudo eliminar la publicación.');
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

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen mt-16">
            <TituloConRegreso titulo="Gestión de Publicaciones" to="/admin" />

            {message && <p className="text-red-500">{message}</p>}

            <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        className="border p-2 rounded"
                        placeholder="Título"
                        value={filterTitulo}
                        onChange={(e) => setFilterTitulo(e.target.value)}
                    />
                    <input
                        className="border p-2 rounded"
                        placeholder="Descripción"
                        value={filterDescripcion}
                        onChange={(e) => setFilterDescripcion(e.target.value)}
                    />
                    <select
                        className="border p-2 rounded"
                        value={filterActivo}
                        onChange={(e) => setFilterActivo(e.target.value)}
                    >
                        <option value="">Todos</option>
                        <option value="true">Activo</option>
                        <option value="false">Inactivo</option>
                    </select>
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
                    onClick={() => setShowRegisterModal(true)}
                >
                    Nueva Publicación
                </button>
            </div>

            {publicaciones.length === 0 ? (
                <p>No hay publicaciones registradas</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 border-b">Título</th>
                                <th className="px-6 py-3 border-b">Imagen</th>
                                <th className="px-6 py-3 border-b">Descripción</th>
                                <th className="px-6 py-3 border-b">Activo</th>
                                <th className="px-6 py-3 border-b">Fecha Creación</th>
                                <th className="px-6 py-3 border-b">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {publicaciones.map((pub) => (
                                <tr key={pub.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 border-b">{pub.titulo}</td>
                                    <td className="px-6 py-4 border-b">
                                        {pub.imagen_url ? (
                                            <img
                                                src={`${BASE_URL}${pub.imagen_url}`}
                                                alt={pub.titulo}
                                                className="h-16 object-cover mx-auto cursor-pointer"
                                                onClick={() => handleImageClick(pub.imagen_url)}
                                            />
                                        ) : (
                                            '---'
                                        )}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {pub.descripcion || '---'}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {pub.activo === 1 ? 'Sí' : 'No'}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {pub.created_at || '---'}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        <div className="flex space-x-2">
                                            <button
                                                className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500"
                                                onClick={() => {
                                                    setSelectedPublicacion(pub);
                                                    setShowEditModal(true);
                                                }}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                                onClick={() => handleDelete(pub.id)}
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

            <RegisterPublicacionModal
                show={showRegisterModal}
                onClose={() => setShowRegisterModal(false)}
                onRegister={handleRegister}
            />

            <EditPublicacionModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onUpdate={handleUpdate}
                publicacion={selectedPublicacion}
            />

            {showImageModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-8"
                    onClick={closeImageModal}
                >
                    <img
                        src={`${BASE_URL}${selectedImageUrl}`}
                        alt="Publicación"
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

export default AdminPublicacionesPage;
