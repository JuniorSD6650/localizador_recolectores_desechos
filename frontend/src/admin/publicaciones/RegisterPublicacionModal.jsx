import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../../utils';

const RegisterPublicacionModal = ({ show, onClose, onRegister }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [activo, setActivo] = useState(true);
  const [imagen, setImagen] = useState(null);

  const handleRegister = async () => {
    try {
      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('descripcion', descripcion);
      formData.append('activo', activo ? 1 : 0);

      if (imagen) {
        formData.append('imagen_url', imagen);
      }

      const response = await fetch(`${API_BASE_URL}publicaciones`, {
        method: 'POST',
        body: formData 
      });

      if (response.ok) {
        const newPublicacion = await response.json();
        showSuccessAlert('Éxito', 'Publicación registrada correctamente');
        onRegister(newPublicacion);
        onClose();
      } else {
        showErrorAlert('Error', 'No se pudo registrar la publicación');
      }
    } catch (error) {
      showErrorAlert('Error', 'Error al conectar con la API');
    }
  };

  if (!show) return null;

  const handleClose = () => {
    setTitulo('');
    setDescripcion('');
    setActivo(true);
    setImagen(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-700">
            Registrar Nueva Publicación
          </h2>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-gray-700">Título</label>
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700">Descripción</label>
            <textarea
              className="border p-2 rounded w-full"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <label className="block text-gray-700">¿Activo?</label>
            <input
              type="checkbox"
              checked={activo}
              onChange={() => setActivo(!activo)}
            />
          </div>

          <div>
            <label className="block text-gray-700">Imagen</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImagen(e.target.files[0] || null)}
            />
          </div>
        </div>

        <div className="p-4 border-t flex justify-end space-x-3">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={handleClose}
          >
            Cerrar
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleRegister}
          >
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
};

RegisterPublicacionModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default RegisterPublicacionModal;
