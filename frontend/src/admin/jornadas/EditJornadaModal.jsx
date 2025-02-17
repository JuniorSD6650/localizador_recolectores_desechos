import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../../utils';

const EditJornadaModal = ({ show, onClose, onUpdate, jornada }) => {
  const [fechaFin, setFechaFin] = useState('');
  const [observaciones, setObservaciones] = useState('');

  // Al abrir el modal con la jornada seleccionada
  useEffect(() => {
    if (jornada) {
      // Si jornada.fecha_fin existe, convertimos a "YYYY-MM-DDTHH:MM" para el <input type="datetime-local">
      if (jornada.fecha_fin) {
        const date = new Date(jornada.fecha_fin);
        // "YYYY-MM-DDTHH:MM" 
        // Ojo: parsear correctamente la fecha de la BD, 
        // asumiendo que es UTC o local, etc.
        setFechaFin(date.toISOString().slice(0,16));
      } else {
        setFechaFin('');
      }
      setObservaciones(jornada.observaciones || '');
    }
  }, [jornada]);

  // Una función para convertir "2025-02-19T00:42" => "2025-02-19 00:42:00"
  function toMySQLDateTime(datetimeLocal) {
    return datetimeLocal.replace('T', ' ') + ':00';
  }

  const handleUpdateClick = async () => {
    try {
      let finalFechaFin = null;
      if (fechaFin) {
        finalFechaFin = toMySQLDateTime(fechaFin);
      }

      const response = await fetch(`${API_BASE_URL}jornadas/${jornada.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fecha_fin: finalFechaFin,
          observaciones,
        }),
      });

      if (response.ok) {
        const updatedJornada = await response.json();
        showSuccessAlert('Éxito', 'Jornada actualizada correctamente');
        onUpdate(updatedJornada);
        onClose();
      } else {
        showErrorAlert('Error', 'No se pudo actualizar la jornada');
      }
    } catch (error) {
      showErrorAlert('Error', 'Error al conectar con la API');
    }
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-700">
            Editar Jornada
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Fecha Fin */}
          <div>
            <label className="block text-gray-700">Fecha Fin</label>
            {/* input type="datetime-local" */}
            <input
              type="datetime-local"
              className="border p-2 rounded w-full"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>

          {/* Observaciones */}
          <div>
            <label className="block text-gray-700">Observaciones</label>
            <textarea
              className="border p-2 rounded w-full"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            />
          </div>
        </div>

        <div className="p-4 border-t flex justify-end space-x-3">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={onClose}
          >
            Cerrar
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleUpdateClick}
          >
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
};

EditJornadaModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  jornada: PropTypes.shape({
    id: PropTypes.number,
    fecha_inicio: PropTypes.string,
    fecha_fin: PropTypes.string,
    observaciones: PropTypes.string,
    usuario_id: PropTypes.number,
  }),
};

export default EditJornadaModal;
