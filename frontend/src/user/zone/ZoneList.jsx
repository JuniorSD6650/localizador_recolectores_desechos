import React, { useState, useEffect } from 'react';
import { API_BASE_URL, BASE_URL } from '../../utils';
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
    const [selectedRouteData, setSelectedRouteData] = useState({ routes: [], title: '', subtitle: '' });

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
                setZonas(data.zonas || []);
                setTotalPages(data.pagination?.totalPages || 1);
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
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleViewRoute = (zona) => {
        setSelectedRouteData({
            routes: [zona],
            title: `Recorrido: ${zona.nombre}`,
            subtitle: zona.descripcion || 'Ruta programada para recolección de residuos en este sector'
        });
        setShowRouteModal(true);
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen mt-16 max-w-6xl">
            <TituloConRegreso titulo="Zonas y Recorridos de Recolección" to="/" />

            {message && <p className="text-red-500 mb-4">{message}</p>}

            {/* Filtros de búsqueda */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        className="border border-gray-300 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Buscar por nombre de zona..."
                        value={filterNombre}
                        onChange={(e) => setFilterNombre(e.target.value)}
                    />
                    <input
                        type="text"
                        className="border border-gray-300 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Buscar por descripción o referencia..."
                        value={filterDescripcion}
                        onChange={(e) => setFilterDescripcion(e.target.value)}
                    />
                </div>
                <div className="flex justify-end space-x-3 mt-4">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 shadow-xs transition-colors"
                        onClick={handleSearch}
                    >
                        Buscar
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                        onClick={handleLimpiar}
                    >
                        Limpiar
                    </button>
                </div>
            </div>

            {/* Lista de Zonas */}
            {zonas.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl text-center text-gray-500 shadow-sm">
                    No se encontraron zonas disponibles.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {zonas.map((zona) => {
                        const coords = Array.isArray(zona.coordenadas_ruta) ? zona.coordenadas_ruta : [];
                        const hasRoute = coords.length > 0;

                        return (
                            <div
                                key={zona.id}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
                            >
                                {zona.imagen ? (
                                    <div
                                        className="h-44 w-full overflow-hidden bg-gray-100 cursor-pointer relative group"
                                        onClick={() => handleImageClick(zona.imagen)}
                                    >
                                        <img
                                            src={`${BASE_URL}${zona.imagen}`}
                                            alt={zona.nombre}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[11px] px-2 py-0.5 rounded backdrop-blur-xs">
                                            Ver foto
                                        </span>
                                    </div>
                                ) : (
                                    <div className="h-32 w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center text-blue-300">
                                        <MapIcon style={{ fontSize: 48 }} />
                                    </div>
                                )}

                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span
                                                className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                                                style={{ backgroundColor: zona.color_ruta || '#1976D2' }}
                                            />
                                            <h3 className="font-bold text-gray-900 text-base">
                                                {zona.nombre}
                                            </h3>
                                        </div>
                                        <p className="text-xs text-gray-600 line-clamp-3 mb-4">
                                            {zona.descripcion || 'Sin descripción disponible.'}
                                        </p>
                                    </div>

                                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                                        {hasRoute ? (
                                            <button
                                                onClick={() => handleViewRoute(zona)}
                                                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-semibold transition-colors"
                                            >
                                                <MapIcon fontSize="small" />
                                                <span>Ver Recorrido en Mapa ({coords.length} pts)</span>
                                            </button>
                                        ) : (
                                            <span className="text-xs text-gray-400 italic">
                                                Recorrido en planificación
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            {/* Modal de Imagen */}
            {showImageModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={closeImageModal}
                >
                    <div className="relative max-w-2xl max-h-[85vh] bg-white rounded-xl overflow-hidden shadow-2xl">
                        <img
                            src={`${BASE_URL}${selectedImageUrl}`}
                            alt="Zona"
                            className="object-contain max-h-[80vh] w-auto"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            className="absolute top-3 right-3 text-white bg-black/70 hover:bg-black p-1.5 rounded-full"
                            onClick={closeImageModal}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Modal de Previsualización de Ruta */}
            <RoutePreviewModal
                show={showRouteModal}
                onClose={() => setShowRouteModal(false)}
                title={selectedRouteData.title}
                subtitle={selectedRouteData.subtitle}
                routes={selectedRouteData.routes}
            />
        </div>
    );
};

export default ZoneList;