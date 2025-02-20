import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../../utils';

const EditPersonalModal = ({ show, onClose, onEdit, personal, onUpdate }) => {
    const [formData, setFormData] = useState({
        role: personal?.role || 'conductor',
        nombres: personal?.nombres || '',
        primer_apellido: personal?.primer_apellido || '',
        segundo_apellido: personal?.segundo_apellido || '',
        dni: personal?.dni || '',
        email: personal?.email || '',
        telefono: personal?.telefono || '',
    });

    const [assignedVehicles, setAssignedVehicles] = useState([]);

    useEffect(() => {
        if (personal) {
            setFormData({
                role: personal.role,
                nombres: personal.nombres,
                primer_apellido: personal.primer_apellido,
                segundo_apellido: personal.segundo_apellido,
                dni: personal.dni,
                email: personal.email,
                telefono: personal.telefono,
            });
            fetchAssignedVehicles(personal.id);
        }
    }, [personal]);

    const fetchAssignedVehicles = async (userId) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}usuario-recolector/?usuario_id=${userId}`
            );
            if (response.ok) {
                const data = await response.json();
                setAssignedVehicles(data.asignaciones || []);
            } else {
                showErrorAlert(
                    'Error',
                    'No se pudieron cargar los vehículos asignados'
                );
            }
        } catch (error) {
            showErrorAlert('Error', 'Error al conectar con la API');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            };

            const response = await fetch(`${API_BASE_URL}usuarios/${personal.id}`, requestOptions);

            if (response.ok) {
                const updatedPersonal = await response.json();
                onEdit(updatedPersonal);
                showSuccessAlert('Éxito', 'Personal editado correctamente');
                if (onUpdate) onUpdate();

                onClose();
            } else {
                showErrorAlert('Error', 'No se pudo editar el personal');
            }
        } catch (error) {
            showErrorAlert('Error', 'Error al conectar con la API');
        }
    };

    const handleDeleteAssignment = async (assignmentId) => {
        try {
            const response = await fetch(`${API_BASE_URL}usuario-recolector/${assignmentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedVehicles = vehicles.filter(v => v.id !== assignmentId);
                setVehicles(updatedVehicles);

                onUpdate();

                showSuccessAlert('Éxito', 'Asignación eliminada correctamente');
            } else {
                showErrorAlert('Error', 'No se pudo eliminar la asignación');
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
                className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold mb-4">Editar Personal</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Rol</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="conductor">Conductor</option>
                            <option value="recolector">Recolector</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nombres</label>
                        <input
                            type="text"
                            name="nombres"
                            value={formData.nombres}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Primer Apellido</label>
                        <input
                            type="text"
                            name="primer_apellido"
                            value={formData.primer_apellido}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Segundo Apellido</label>
                        <input
                            type="text"
                            name="segundo_apellido"
                            value={formData.segundo_apellido}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">DNI</label>
                        <input
                            type="text"
                            name="dni"
                            value={formData.dni}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Teléfono</label>
                        <input
                            type="text"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

EditPersonalModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    personal: PropTypes.shape({
        id: PropTypes.number,
        role: PropTypes.string,
        nombres: PropTypes.string,
        primer_apellido: PropTypes.string,
        segundo_apellido: PropTypes.string,
        dni: PropTypes.string,
        email: PropTypes.string,
        telefono: PropTypes.string,
    }),
    onUpdate: PropTypes.func,
};

export default EditPersonalModal;
