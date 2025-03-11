import React, { useState, useEffect } from 'react';
import {
  API_BASE_URL,
  showSuccessAlert,
  showErrorAlert,
  showCustomAlert
} from '../../utils';
import TituloConRegreso from '../../components/TituloConRegreso/TituloConRegreso';
import EditJornadaModal from './EditJornadaModal';
import Pagination from '../../components/Pagination/Pagination';

// Icons
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';

const AdminJornadasPage = () => {
  const [jornadas, setJornadas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [message, setMessage] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedJornada, setSelectedJornada] = useState(null);

  const [filterObservaciones, setFilterObservaciones] = useState('');
  const [filterFechaInicio, setFilterFechaInicio] = useState('');
  const [filterFechaFin, setFilterFechaFin] = useState('');
  const [filterUsuarioId, setFilterUsuarioId] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchUsuarios();
    obtenerJornadas(currentPage);
  }, [currentPage]);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}usuarios/list`);
      const data = await response.json();
      if (response.ok) {
        setUsuarios(data);
      } else {
        setMessage('No se pudieron cargar los usuarios');
      }
    } catch (error) {
      setMessage('Error al conectar con la API');
    }
  };

  const buildQueryString = () => {
    const params = new URLSearchParams();
    if (filterObservaciones) params.append('observaciones', filterObservaciones);
    if (filterFechaInicio) params.append('fecha_inicio', filterFechaInicio);
    if (filterFechaFin) params.append('fecha_fin', filterFechaFin);
    if (filterUsuarioId) params.append('usuario_id', filterUsuarioId);
    params.append('page', currentPage);
    params.append('limit', limit);
    return params.toString();
  };

  const obtenerJornadas = async (page) => {
    try {
      const queryString = buildQueryString();
      const response = await fetch(`${API_BASE_URL}jornadas?${queryString}`);
      const data = await response.json();

      if (response.ok) {
        setJornadas(data.jornadas);
        setTotalPages(data.pagination.totalPages);
      } else {
        setMessage('No se pudieron cargar las jornadas');
      }
    } catch (error) {
      setMessage('Error al conectar con la API');
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    obtenerJornadas(1);
  };

  const handleLimpiar = () => {
    setFilterObservaciones('');
    setFilterFechaInicio('');
    setFilterFechaFin('');
    setFilterUsuarioId('');
    setMessage('');
    setCurrentPage(1);
    obtenerJornadas(1);
  };

  const handleRegister = () => {
    obtenerJornadas();
  };

  const handleUpdate = () => {
    obtenerJornadas();
  };

  const handleDelete = async (id) => {
    const confirmed = await showCustomAlert({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer. ¿Deseas eliminar esta jornada?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirmed.isConfirmed) {
      try {
        const response = await fetch(`${API_BASE_URL}jornadas/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setJornadas((prev) => prev.filter((jornada) => jornada.id !== id));
          showSuccessAlert('Eliminado', 'La jornada se eliminó con éxito.');
          obtenerJornadas(currentPage);
        } else {
          showErrorAlert('Error', 'No se pudo eliminar la jornada.');
        }
      } catch (error) {
        showErrorAlert('Error', 'No se pudo eliminar la jornada.');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen mt-16">
      <TituloConRegreso titulo="Gestión de Jornadas" to="/admin" />

      {message && <p className="text-red-500">{message}</p>}

      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Observaciones"
            value={filterObservaciones}
            onChange={(e) => setFilterObservaciones(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded"
            value={filterFechaInicio}
            onChange={(e) => setFilterFechaInicio(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded"
            value={filterFechaFin}
            onChange={(e) => setFilterFechaFin(e.target.value)}
          />
          <select
            className="border p-2 rounded"
            value={filterUsuarioId}
            onChange={(e) => setFilterUsuarioId(e.target.value)}
          >
            <option value="">Seleccionar Usuario</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nombres}
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

      {/* <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white text-sm p-2 rounded-md hover:bg-blue-600 mb-1 w-auto"
          onClick={() => setShowRegisterModal(true)}
        >
          Nueva Jornada
        </button>
      </div> */}

      {jornadas.length === 0 ? (
        <p>No hay jornadas registradas</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 border-b">Observaciones</th>
                <th className="px-6 py-3 border-b">Fecha Inicio</th>
                <th className="px-6 py-3 border-b">Fecha Fin</th>
                <th className="px-6 py-3 border-b">Usuario</th>
                <th className="px-6 py-3 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {jornadas.map((jornada) => (
                <tr key={jornada.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b">{jornada.observaciones}</td>
                  <td className="px-6 py-4 border-b">{jornada.fecha_inicio}</td>
                  <td className="px-6 py-4 border-b">{jornada.fecha_fin}</td>
                  <td className="px-6 py-4 border-b">{jornada.usuario_nombres}</td>
                  <td className="px-6 py-4 border-b">
                    <div className="flex space-x-2">
                      <button
                        className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500"
                        onClick={() => {
                          setSelectedJornada(jornada);
                          setShowEditModal(true);
                        }}
                      >
                        Editar
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={() => handleDelete(jornada.id)}
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

      <EditJornadaModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onUpdate={handleUpdate}
        jornada={selectedJornada}
      />
    </div>
  );
};

export default AdminJornadasPage;
