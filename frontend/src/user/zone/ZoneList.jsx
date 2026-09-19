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
import RoutePreviewModal from '../../components/Map/RoutePreviewModal';
import MapIcon from '@mui/icons-material/Map';

const ZoneList = () => {
    const [zonas, setZonas] = useState([]);
    const [message, setMessage] = useState('');
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');

    const [showRouteModal, setShowRouteModal] = useState(false);
    const [selectedRouteZona, setSelectedRouteZona] = useState(null);

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
        obtenerZonas();
    };

    const handleLimpiar = () => {
        setFilterNombre('');
        setFilterDescripcion('');
        setMessage('');
        setCurrentPage(1);
        obtenerZonas();
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

    const handleViewRoute = (zona) => {
        setSelectedRouteZona(zona);
        setShowRouteModal(true);
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen mt-16">
            <TituloConRegreso titulo="Lista de Zonas" to="/" />

            {/* Filtros */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Buscar por nombre..."
                            value={filterNombre}
                            onChange={(e) => setFilterNombre(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Buscar por descripción..."
                            value={filterDescripcion}
                            onChange={(e) => setFilterDescripcion(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
                    >
                        Buscar
                    </button>
                    <button
                        onClick={handleLimpiar}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300 transition"
                    >
                        Limpiar
                    </button>
                </div>
            </div>

            {message && <p className="text-red-500 mb-4">{message}</p>}

            {zonas.length === 0 ? (
                <p>No hay zonas registradas</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                                <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ruta en Mapa</th>
                                <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
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
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0"
                                                    style={{ backgroundColor: zona.color_ruta || '#1976D2' }}
                                                />
                                                <span>{zona.nombre}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                                            {zona.descripcion || '---'}
                                        </td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap">
                                            {hasRoute ? (
                                                <button
                                                    type="button"
                                                    onClick={() => handleViewRoute(zona)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer shadow-xs"
                                                    title="Ver recorrido completo en el mapa"
                                                >
                                                    <MapIcon style={{ fontSize: '16px' }} />
                                                    <span>Ver Ruta ({coords.length} pts)</span>
                                                </button>
                                            ) : (
                                                <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200">
                                                    Sin ruta
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {zona.imagen ? (
                                                <img
                                                    src={`${BASE_URL}${zona.imagen}`}
                                                    alt={zona.nombre}
                                                    className="h-16 object-cover mx-auto cursor-pointer rounded"
                                                    onClick={() => handleImageClick(zona.imagen)}
                                                />
                                            ) : (
                                                '---'
                                            )}
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

            {showImageModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={closeImageModal}
                >
                    <img
                        src={`${BASE_URL}${selectedImageUrl}`}
                        alt="Zona"
                        className="object-cover h-96 rounded"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        className="absolute top-5 right-5 text-white text-2xl bg-gray-800 bg-opacity-50 rounded-full px-2 py-1"
                        onClick={closeImageModal}
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* Modal para ver la ruta completa trazada en el mapa sin el vehículo */}
            <RoutePreviewModal
                show={showRouteModal}
                onClose={() => {
                    setShowRouteModal(false);
                    setSelectedRouteZona(null);
                }}
                title={`Ruta Completa - ${selectedRouteZona?.nombre || 'Zona'}`}
                subtitle={selectedRouteZona?.descripcion || 'Trazado planificado del recorrido de recolección'}
                routes={selectedRouteZona ? [selectedRouteZona] : []}
                vehicleLocation={null}
            />
        </div>
    );
};

export default ZoneList;