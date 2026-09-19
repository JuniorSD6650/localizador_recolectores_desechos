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
import AssignedZonesModal from './AssignedZonesModal';
import Pagination from '../../components/Pagination/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import MapIcon from '@mui/icons-material/Map';
import RoutePreviewModal from '../../components/Map/RoutePreviewModal';

const AdminVehiculosPage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [message, setMessage] = useState('');
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const [showRouteModal, setShowRouteModal] = useState(false);
    const [routeModalData, setRouteModalData] = useState({ routes: [], vehicleLocation: null, title: '', subtitle: '' });

    const [showZonesModal, setShowZonesModal] = useState(false);
    const [zonesToShow, setZonesToShow] = useState([]);
    const [currentVehicleId, setCurrentVehicleId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    const [filterNombre, setFilterNombre] = useState('');
    const [filterPlaca, setFilterPlaca] = useState('');
    const [filterTipoVehiculo, setFilterTipoVehiculo] = useState('');
    const [filterEstadoOperativo, setFilterEstadoOperativo] = useState('');

    const buildQueryString = () => {
        const params = new URLSearchParams();
        if (filterNombre) params.append('nombre_recolector', filterNombre);
        if (filterPlaca) params.append('placa', filterPlaca);
        if (filterTipoVehiculo) params.append('tipo_vehiculo', filterTipoVehiculo);
        if (filterEstadoOperativo) params.append('estado_operativo', filterEstadoOperativo);
        params.append('page', currentPage);
        params.append('limit', limit);
        return params.toString();
    };

    const obtenerVehiculos = async (page) => {
        try {
            const queryString = buildQueryString();
            const response = await fetch(`${API_BASE_URL}recolectores?${queryString}`);
            const data = await response.json();

            if (response.ok) {
                const vehiclesWithZones = await Promise.all(
                    data.recolectores.map(async (vehicle) => {
                        const zonesResponse = await fetch(`${API_BASE_URL}zona-recolector/?recolector_id=${vehicle.id}`);
                        const zonesData = await zonesResponse.json();
                        return {
                            ...vehicle,
                            zonas: zonesData.asignaciones || [],
                        };
                    })
                );
                setVehicles(vehiclesWithZones);
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

    const handleSearch = () => {
        setCurrentPage(1);
        obtenerVehiculos(1);
    };

    const handleLimpiar = () => {
        setFilterNombre('');
        setFilterPlaca('');
        setFilterTipoVehiculo('');
        setFilterEstadoOperativo('');
        setMessage('');
        setCurrentPage(1);
        obtenerVehiculos(1);
    };

    const handleRegister = (newVehicle) => {
        obtenerVehiculos(currentPage);
    };

    const handleUpdate = (updatedVehicle) => {
        obtenerVehiculos(currentPage);
    };

    const handleViewVehicleRoute = (vehicle) => {
        const routes = vehicle.zonas_asignadas || [];
        setRouteModalData({
            routes,
            vehicleLocation: vehicle.latitud && vehicle.longitud ? {
                latitud: vehicle.latitud,
                longitud: vehicle.longitud,
                nombre_recolector: vehicle.nombre_recolector,
                placa: vehicle.placa,
            } : null,
            title: `Recorrido Asignado - ${vehicle.nombre_recolector} (${vehicle.placa})`,
            subtitle: routes.length > 0
                ? `${routes.length} zona(s) asignadas con recorrido planificado`
                : 'Este vehículo aún no tiene zonas con recorrido planificado'
        });
        setShowRouteModal(true);
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

    const fetchAssignedZones = async (recolectorId) => {
        try {
            const response = await fetch(`${API_BASE_URL}zona-recolector/?recolector_id=${recolectorId}`);
            if (response.ok) {
                const data = await response.json();
                const zones = data.asignaciones.map((zone) => ({
                    ...zone,
                    id: zone.zona_id.toString(),
                    zona_nombre: zone.zona_nombre || 'Desconocido',
                    asignacion_id: zone.id.toString(),
                }));
                setZonesToShow(zones);
            } else {
                showErrorAlert('Error', 'No se pudieron cargar las zonas asignadas');
            }
        } catch (error) {
            showErrorAlert('Error', 'No se pudieron cargar las zonas asignadas');
        }
    };

    const handleShowZones = async (vehicle) => {
        setCurrentVehicleId(vehicle.id.toString());
        await fetchAssignedZones(vehicle.id.toString());
        setShowZonesModal(true);
    };

    const handleUpdateAssignments = async () => {
        await obtenerVehiculos(currentPage);
        if (currentVehicleId) {
            await fetchAssignedZones(currentVehicleId);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen mt-16">
            <TituloConRegreso titulo="Gestión de Vehículos" to="/admin" />

            {message && <p className="text-red-500">{message}</p>}

            <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        className="border p-2 rounded"
                        placeholder="Nombre del Recolector"
                        value={filterNombre}
                        onChange={(e) => setFilterNombre(e.target.value)}
                    />
                    <input
                        className="border p-2 rounded"
                        placeholder="Placa"
                        value={filterPlaca}
                        onChange={(e) => setFilterPlaca(e.target.value)}
                    />
                    <input
                        className="border p-2 rounded"
                        placeholder="Tipo de Vehículo"
                        value={filterTipoVehiculo}
                        onChange={(e) => setFilterTipoVehiculo(e.target.value)}
                    />
                    <select
                        className="border p-2 rounded"
                        value={filterEstadoOperativo}
                        onChange={(e) => setFilterEstadoOperativo(e.target.value)}
                    >
                        <option value="">Estado Operativo</option>
                        <option value="operativo">Operativo</option>
                        <option value="inoperativo">Inoperativo</option>
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
                                <th className="px-6 py-3 border-b">Zonas Asignadas</th>
                                <th className="px-6 py-3 border-b">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.map((vehicle) => (
                                <tr key={vehicle.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 border-b">{vehicle.nombre_recolector}</td>
                                    <td className="px-6 py-4 border-b">{vehicle.placa}</td>
                                    <td className="px-6 py-4 border-b">{vehicle.tipo_vehiculo}</td>
                                    <td className="px-6 py-4 border-b">
                                        <span
                                            className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${vehicle.estado_operativo === 'operativo' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
                                        >
                                            {vehicle.estado_operativo}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 border-b">
                                        <div className="flex flex-col gap-1.5 items-start">
                                            <button
                                                className="bg-green-600 text-white text-xs px-3 py-1.5 rounded-md hover:bg-green-700 font-medium"
                                                onClick={() => handleShowZones(vehicle)}
                                            >
                                                Gestionar Zonas ({vehicle.zonas ? vehicle.zonas.length : 0})
                                            </button>
                                            <button
                                                className="bg-blue-50 text-blue-700 border border-blue-200 text-xs px-3 py-1.5 rounded-md hover:bg-blue-100 font-medium inline-flex items-center gap-1"
                                                onClick={() => handleViewVehicleRoute(vehicle)}
                                                title="Ver mapa de recorrido del vehículo"
                                            >
                                                <MapIcon style={{ fontSize: 16 }} />
                                                <span>Ver Recorrido</span>
                                            </button>
                                        </div>
                                    </td>
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

            <RoutePreviewModal
                show={showRouteModal}
                onClose={() => setShowRouteModal(false)}
                title={routeModalData.title}
                subtitle={routeModalData.subtitle}
                routes={routeModalData.routes}
                vehicleLocation={routeModalData.vehicleLocation}
            />

            {currentVehicleId && (
                <AssignedZonesModal
                    show={showZonesModal}
                    onClose={() => setShowZonesModal(false)}
                    assignments={zonesToShow}
                    recolectorId={currentVehicleId}
                    onUpdate={handleUpdateAssignments}
                />
            )}
        </div>
    );
};

export default AdminVehiculosPage;