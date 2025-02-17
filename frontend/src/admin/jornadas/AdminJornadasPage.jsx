import React, { useState, useEffect } from 'react';
import {
  API_BASE_URL,
  showSuccessAlert,
  showErrorAlert
} from '../../utils';  // Ajusta esta importación según tu proyecto
import TituloConRegreso from '../../components/TituloConRegreso/TituloConRegreso';
import EditJornadaModal from './EditJornadaModal';
import Pagination from '../../components/Pagination/Pagination';

const AdminJornadasPage = () => {
  const [jornadas, setJornadas] = useState([]);
  const [message, setMessage] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedJornada, setSelectedJornada] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const obtenerJornadas = async (page) => {
    try {
      const response = await fetch(`${API_BASE_URL}jornadas?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (response.ok) {
        // Ajusta si tu API retorna la lista de otra forma
        setJornadas(data.jornadas);
        setTotalPages(data.pagination.totalPages);
      } else {
        setMessage('No se pudieron cargar las jornadas');
      }
    } catch (error) {
      setMessage('Error al conectar con la API');
    }
  };

  useEffect(() => {
    obtenerJornadas(currentPage);
  }, [currentPage]);

  // Función para actualizar una jornada en el state
  const handleUpdate = (updatedJornada) => {
    setJornadas((prevJornadas) =>
      prevJornadas.map((jor) =>
        jor.id === updatedJornada.id ? updatedJornada : jor
      )
    );
  };

  return (
    <div className="max-w-full px-4 my-5 text-center">
      <TituloConRegreso titulo="Gestión de Jornadas" to="/admin" />

      {message && <p className="text-red-500">{message}</p>}

      {jornadas.length === 0 ? (
        <p>No hay jornadas registradas</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 border-b">ID</th>
                <th className="px-6 py-3 border-b">Fecha Inicio</th>
                <th className="px-6 py-3 border-b">Fecha Fin</th>
                <th className="px-6 py-3 border-b">Observaciones</th>
                <th className="px-6 py-3 border-b">Usuario</th>
                <th className="px-6 py-3 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {jornadas.map((jor) => (
                <tr key={jor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b">{jor.id}</td>
                  <td className="px-6 py-4 border-b">
                    {jor.fecha_inicio
                      ? new Date(jor.fecha_inicio).toLocaleString()
                      : '---'}
                  </td>
                  <td className="px-6 py-4 border-b">
                    {jor.fecha_fin
                      ? new Date(jor.fecha_fin).toLocaleString()
                      : '---'}
                  </td>
                  <td className="px-6 py-4 border-b">
                    {jor.observaciones || '---'}
                  </td>
                  <td className="px-6 py-4 border-b">{jor.usuario_id || '---'}</td>
                  <td className="px-6 py-4 border-b">
                    <button
                      className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500"
                      onClick={() => {
                        setSelectedJornada(jor);
                        setShowEditModal(true);
                      }}
                    >
                      Editar
                    </button>
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

      {/* Modal para Editar Jornada */}
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
