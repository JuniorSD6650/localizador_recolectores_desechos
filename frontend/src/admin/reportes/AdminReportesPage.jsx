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

// Icons
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';

const AdminReportesPage = () => {
  const [reportes, setReportes] = useState([]);
  const [message, setMessage] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const [filterEstado, setFilterEstado] = useState('');
  const [filterDireccion, setFilterDireccion] = useState('');
  const [filterDescripcion, setFilterDescripcion] = useState('');
  const [filterNombre, setFilterNombre] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  useEffect(() => {
    fetchReportesBackend();
  }, [currentPage]);

  const buildQueryString = () => {
    const params = new URLSearchParams();
    if (filterEstado) {
      params.append('estado_reporte', filterEstado);
    }
    if (filterDireccion) {
      params.append('direccion', filterDireccion);
    }
    if (filterDescripcion) {
      params.append('descripcion', filterDescripcion);
    }
    if (filterNombre) {
      params.append('nombre_reportante', filterNombre);
    }
    params.append('page', currentPage);
    params.append('limit', limit);

    return params.toString();
  };

  const fetchReportesBackend = async () => {
    try {
      const queryString = buildQueryString();
      const url = `${API_BASE_URL}reportes/?${queryString}`;

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setReportes(data.reportes);
        setTotalPages(data.pagination.totalPages);
        setMessage('');
      } else {
        setMessage('No se pudieron cargar los reportes filtrados');
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      setMessage('Error al conectar con la API');
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchReportesBackend();
  };

  const handleLimpiar = () => {
    setFilterEstado('');
    setFilterDireccion('');
    setFilterDescripcion('');
    setFilterNombre('');
    setMessage('');
    setCurrentPage(1);
    fetchReportesBackend();
  };

  const handleEstadoChange = async (id, nuevoEstado) => {
    try {
      const confirmed = await showCustomAlert({
        title: '¿Estás seguro?',
        text: `¿Quieres marcar este reporte como ${nuevoEstado}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'Cancelar',
      });

      if (confirmed?.isConfirmed) {
        const response = await fetch(`${API_BASE_URL}reportes/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ estado_reporte: nuevoEstado }),
        });

        if (response.ok) {
          setReportes((prevReportes) =>
            prevReportes.map((reporte) =>
              reporte.id === id
                ? { ...reporte, estado_reporte: nuevoEstado }
                : reporte
            )
          );
          showSuccessAlert('Estado actualizado', `El reporte se marcó como ${nuevoEstado}.`);
        } else {
          const errorData = await response.json();
          showErrorAlert('Error', errorData.message || 'No se pudo actualizar el estado del reporte.');
        }
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      showErrorAlert('Error', 'Hubo un problema al conectar con la API.');
    }
  };

  const handleEliminar = async (id) => {
    try {
      const confirmed = await showCustomAlert({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer. ¿Deseas eliminar este reporte?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (confirmed?.isConfirmed) {
        const response = await fetch(`${API_BASE_URL}reportes/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setReportes((prevReportes) => prevReportes.filter((r) => r.id !== id));
          showSuccessAlert('Eliminado', 'El reporte se eliminó con éxito.');
        } else {
          const errorData = await response.json();
          showErrorAlert('Error', errorData.message || 'No se pudo eliminar el reporte.');
        }
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      showErrorAlert('Error', 'Hubo un problema al conectar con la API.');
    }
  };

  const handleShowImage = (rutaFoto) => {
    setSelectedImage(`${BASE_URL}${rutaFoto}`);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen mt-16">
      <TituloConRegreso titulo="Gestión de Reportes" to="/admin" />

      {message && <p className="text-red-500">{message}</p>}

      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            className="border p-2 rounded"
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="revisado">Revisado</option>
          </select>

          <input
            className="border p-2 rounded"
            placeholder="Dirección"
            value={filterDireccion}
            onChange={(e) => setFilterDireccion(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            placeholder="Descripción"
            value={filterDescripcion}
            onChange={(e) => setFilterDescripcion(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            placeholder="Reportante"
            value={filterNombre}
            onChange={(e) => setFilterNombre(e.target.value)}
          />
        </div>

        <div className="flex justify-end items-center mt-4 space-x-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSearch}
          >
            <SearchIcon /> Buscar
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={handleLimpiar}
          >
            <CleaningServicesIcon /> Limpiar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {reportes.length === 0 ? (
          <p>No hay reportes disponibles</p>
        ) : (
          reportes.map((reporte) => (
            <div key={reporte.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="space-y-2">
                <strong className="text-lg block">{reporte.nombre_reportante}</strong>
                <p className="text-gray-700">{reporte.descripcion}</p>
                <p className="text-gray-700">
                  <strong>Número de Contacto:</strong>{' '}
                  {reporte.numero_contacto ? reporte.numero_contacto : 'Sin número disponible'}
                </p>
                <p className="text-gray-700">
                  <strong>Dirección:</strong>{' '}
                  {reporte.direccion || 'Sin dirección disponible'}
                </p>

                <div className="flex flex-wrap gap-2 items-center">
                  <button
                    className={`flex items-center gap-1 px-3 py-1.5 text-sm ${reporte.ruta_foto ? 'text-blue-600 border border-blue-600 hover:bg-blue-50' : 'text-gray-400 border border-gray-400 cursor-not-allowed'}`}
                    onClick={() => handleShowImage(reporte.ruta_foto)}
                    disabled={!reporte.ruta_foto}
                  >
                    <VisibilityIcon fontSize="small" /> Ver Imagen
                  </button>
                  <span
                    className={`px-2 py-1 text-sm rounded ${reporte.estado_reporte === 'pendiente'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                      }`}
                  >
                    {reporte.estado_reporte}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  className={`px-3 py-1.5 text-sm rounded ${reporte.estado_reporte === 'revisado'
                    ? 'bg-blue-300 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  onClick={() => handleEstadoChange(reporte.id, 'revisado')}
                  disabled={reporte.estado_reporte === 'revisado'}
                >
                  Marcar como Revisado
                </button>
                <button
                  className="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => handleEliminar(reporte.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={handleCloseModal}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              width: '90%',
              maxWidth: '600px',
              maxHeight: '80vh',
              overflow: 'auto',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                color: '#4a5568',
              }}
              onClick={handleCloseModal}
            >
              ✕
            </button>
            {selectedImage && (
              <div
                style={{
                  width: '100%',
                  height: '600px',
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={selectedImage}
                  alt="Reporte"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReportesPage;