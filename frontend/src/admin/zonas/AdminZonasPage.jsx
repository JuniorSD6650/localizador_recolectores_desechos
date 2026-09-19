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
import ZonaRouteModal from './ZonaRouteModal';
import Pagination from '../../components/Pagination/Pagination';
import MapIcon from '@mui/icons-material/Map';

const AdminZonasPage = () => {
    const [zonas, setZonas] = useState([]);
    const [message, setMessage] = useState('');
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedZona, setSelectedZona] = useState(null);

    const [showRouteEditorModal, setShowRouteEditorModal] = useState(false);
    const [selectedRouteZona, setSelectedRouteZona] = useState(null);

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

    const handleRegister = () => {
        obtenerZonas();
    };

    const handleUpdate = () => {
        obtenerZonas();
    };

    const handleDelete = async (id) => {
        const result = await showCustomAlert({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará la zona permanentemente.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`${API_BASE_URL}zonas/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    showSuccessAlert('Eliminada', 'La zona ha sido eliminada.');
                    obtenerZonas();
                } else {
                    showErrorAlert('Error', 'No se pudo eliminar la zona.');
                }
            } catch (error) {
                showErrorAlert('Error', 'Error al conectar con la API.');
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
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleOpenRouteEditor = (zona) => {
        setSelectedRouteZona(zona);
        setShowRouteEditorModal(true);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <TituloConRegreso title="Gestión de Zonas y Rutas" />

            {message && <p className="text-red-500 mb-4">{message}</p>}

            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        className="border p-2 rounded"
                        placeholder="Filtrar por nombre"
                        value={filterNombre}
                        onChange={(e) => setFilterNombre(e.target.value)}
                    />
                    <input
                        type="text"
                        className="border p-2 rounded"
                        placeholder="Filtrar por descripción"
                        value={filterDescripcion}
                        onChange={(e) => setFilterDescripcion(e.target.value)}
                    />
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                        onClick={handleSearch}
                    >
                        Buscar
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 cursor-pointer"
                        onClick={handleLimpiar}
                    >
                        Limpiar
                    </button>
                </div>
            </div>

            <div className="flex justify-end mb-4">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium shadow-sm flex items-center gap-1.5 text-sm cursor-pointer"
                    onClick={() => setShowRegisterModal(true)}
                >
                    <span>+</span> Nueva Zona
                </button>
            </div>

            {zonas.length === 0 ? (
                <div className="bg-white p-8 rounded-lg text-center text-gray-500 shadow-sm">
                    No se encontraron zonas registradas.
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                    <table className="min-w-full border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">Nombre</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">Descripción</th>
                                <th className="px-6 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase">Ruta Geográfica</th>
                                <th className="px-6 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase">Imagen</th>
                                <th className="px-6 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {zonas.map((zona) => {
                                let coords = [];
                                if (Array.isArray(zona.coordenadas_ruta)) {
                                    coords = zona.coordenadas_ruta;
                                } else if (typeof zona.coordenadas_ruta === 'string') {
                                    try {
                                        coords = JSON.parse(zona.coordenadas_ruta || '[]');
                                    } catch {
                                        coords = [];
                                    }
                                }
                                const hasRoute = Array.isArray(coords) && coords.length > 0;

                                return (
                                    <tr key={zona.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="w-3 h-3 rounded-full flex-shrink-0"
                                                    style={{ backgroundColor: zona.color_ruta || '#1976D2' }}
                                                />
                                                {zona.nombre}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-sm max-w-xs truncate">
                                            {zona.descripcion || '---'}
                                        </td>

                                        {/* Columna única para gestión y edición de ruta */}
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                type="button"
                                                onClick={() => handleOpenRouteEditor(zona)}
                                                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer shadow-xs ${
                                                    hasRoute
                                                        ? 'text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 hover:border-blue-300'
                                                        : 'text-emerald-700 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 hover:border-emerald-400'
                                                }`}
                                                title={hasRoute ? "Modificar o ver trazado de la ruta" : "Trazar ruta de recolección"}
                                            >
                                                <MapIcon style={{ fontSize: '16px' }} />
                                                <span>{hasRoute ? `Ruta (${coords.length} pts)` : '+ Trazar Ruta'}</span>
                                            </button>
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            {zona.imagen ? (
                                                <img
                                                    src={`${BASE_URL}${zona.imagen}`}
                                                    alt={zona.nombre}
                                                    className="h-12 w-16 object-cover rounded mx-auto cursor-pointer shadow-xs hover:opacity-80 transition-opacity"
                                                    onClick={() => handleImageClick(zona.imagen)}
                                                />
                                            ) : (
                                                <span className="text-xs text-gray-400">Sin imagen</span>
                                            )}
                                        </td>

                                        {/* Columna Acciones: Solo editar datos básicos y eliminar (sin botón de ruta duplicado) */}
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center space-x-2">
                                                <button
                                                    className="bg-amber-500 text-white px-3 py-1.5 text-xs font-medium rounded-md hover:bg-amber-600 cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedZona(zona);
                                                        setShowEditModal(true);
                                                    }}
                                                    title="Editar nombre, descripción o imagen"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-3 py-1.5 text-xs font-medium rounded-md hover:bg-red-600 cursor-pointer"
                                                    onClick={() => handleDelete(zona.id)}
                                                    title="Eliminar zona"
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

            {/* Modal de Trazado y Edición de Ruta: Instanciado exclusivamente con key por ID de zona */}
            {showRouteEditorModal && selectedRouteZona && (
                <ZonaRouteModal
                    key={`zona-route-modal-${selectedRouteZona.id}`}
                    show={showRouteEditorModal}
                    onClose={() => {
                        setShowRouteEditorModal(false);
                        setSelectedRouteZona(null);
                    }}
                    onUpdate={obtenerZonas}
                    zona={selectedRouteZona}
                />
            )}

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
                        className="absolute top-5 right-5 text-white text-2xl bg-gray-800 bg-opacity-50 rounded-full px-2 py-1 cursor-pointer"
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