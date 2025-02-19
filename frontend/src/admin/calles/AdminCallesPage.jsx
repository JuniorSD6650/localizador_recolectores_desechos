// AdminCallesPage.js

import React, { useState, useEffect } from 'react';
import {
    API_BASE_URL,
    showSuccessAlert,
    showErrorAlert,
    showCustomAlert
} from '../../utils';
import TituloConRegreso from '../../components/TituloConRegreso/TituloConRegreso';
import RegisterCalleModal from './RegisterCalleModal';
import EditCalleModal from './EditCalleModal';
import Pagination from '../../components/Pagination/Pagination';

// Icons
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';

const AdminCallesPage = () => {
    const [calles, setCalles] = useState([]);
    const [zonas, setZonas] = useState([]);
    const [message, setMessage] = useState('');
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCalle, setSelectedCalle] = useState(null);

    const [filterNombre, setFilterNombre] = useState('');
    const [filterNumeroCuadra, setFilterNumeroCuadra] = useState('');
    const [filterZonaId, setFilterZonaId] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    useEffect(() => {
        fetchZonas();
        obtenerCalles(currentPage);
    }, [currentPage]);

    const fetchZonas = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}zonas/list`);
            const data = await response.json();
            if (response.ok) {
                setZonas(data);
            } else {
                setMessage('No se pudieron cargar las zonas');
            }
        } catch (error) {
            setMessage('Error al conectar con la API');
        }
    };

    const buildQueryString = () => {
        const params = new URLSearchParams();
        if (filterNombre) params.append('nombre', filterNombre);
        if (filterNumeroCuadra) params.append('numero_cuadra', filterNumeroCuadra);
        if (filterZonaId) params.append('zona_id', filterZonaId);
        params.append('page', currentPage);
        params.append('limit', limit);
        return params.toString();
    };

    const obtenerCalles = async (page) => {
        try {
            const queryString = buildQueryString();
            const response = await fetch(`${API_BASE_URL}calles?${queryString}`);
            const data = await response.json();

            if (response.ok) {
                setCalles(data.calles);
                setTotalPages(data.pagination.totalPages);
            } else {
                setMessage('No se pudieron cargar las calles');
            }
        } catch (error) {
            setMessage('Error al conectar con la API');
        }
    };

    const handleSearch = () => {
        setCurrentPage(1);
        obtenerCalles(1);
    };

    const handleLimpiar = () => {
        setFilterNombre('');
        setFilterNumeroCuadra('');
        setFilterZonaId('');
        setMessage('');
        setCurrentPage(1);
        obtenerCalles(1);
    };

    const handleRegister = () => {
        obtenerCalles();
    };

    const handleUpdate = () => {
        obtenerCalles();
    };

    const handleDelete = async (id) => {
        const confirmed = await showCustomAlert({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer. ¿Deseas eliminar esta calle?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (confirmed.isConfirmed) {
            try {
                const response = await fetch(`${API_BASE_URL}calles/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setCalles((prev) => prev.filter((calle) => calle.id !== id));
                    showSuccessAlert('Eliminado', 'La calle se eliminó con éxito.');
                    obtenerCalles(currentPage);
                } else {
                    showErrorAlert('Error', 'No se pudo eliminar la calle.');
                }
            } catch (error) {
                showErrorAlert('Error', 'No se pudo eliminar la calle.');
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen mt-16">
            <TituloConRegreso titulo="Gestión de Calles" to="/admin" />

            {message && <p className="text-red-500">{message}</p>}

            <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={filterNombre}
                        onChange={(e) => setFilterNombre(e.target.value)}
                        className="border p-2 rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="Número Cuadra"
                        value={filterNumeroCuadra}
                        onChange={(e) => setFilterNumeroCuadra(e.target.value)}
                        className="border p-2 rounded-md"
                    />
                    <select
                        value={filterZonaId}
                        onChange={(e) => setFilterZonaId(e.target.value)}
                        className="border p-2 rounded-md"
                    >
                        <option value="">Seleccionar Zona</option>
                        {zonas.map((zona) => (
                            <option key={zona.id} value={zona.id}>
                                {zona.nombre}
                            </option>
                        ))}
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
                    className="bg-blue-500 text-white text-sm p-2 rounded-md hover:bg-blue-600 mb-1 w-auto"
                    onClick={() => setShowRegisterModal(true)}
                >
                    Nueva Calle
                </button>
            </div>

            {calles.length === 0 ? (
                <p>No hay calles registradas</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 border-b">Nombre</th>
                                <th className="px-6 py-3 border-b">Descripción</th>
                                <th className="px-6 py-3 border-b">Hora Inicio</th>
                                <th className="px-6 py-3 border-b">Hora Final</th>
                                <th className="px-6 py-3 border-b">Número Cuadra</th>
                                <th className="px-6 py-3 border-b">Zona</th>
                                <th className="px-6 py-3 border-b">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {calles.map((calle) => (
                                <tr key={calle.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 border-b">{calle.nombre}</td>
                                    <td className="px-6 py-4 border-b">
                                        {calle.descripcion || '---'}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {calle.hora_inicio || '---'}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {calle.hora_final || '---'}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {calle.numero_cuadra || '---'}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {calle.zona_nombre || '---'}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        <div className="flex space-x-2">
                                            <button
                                                className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500"
                                                onClick={() => {
                                                    setSelectedCalle(calle);
                                                    setShowEditModal(true);
                                                }}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                                onClick={() => handleDelete(calle.id)}
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

            {/* Modal para registrar */}
            <RegisterCalleModal
                show={showRegisterModal}
                onClose={() => setShowRegisterModal(false)}
                onRegister={handleRegister}
            />

            {/* Modal para editar */}
            <EditCalleModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onUpdate={handleUpdate}
                calle={selectedCalle}
            />
        </div>
    );
};

export default AdminCallesPage;
