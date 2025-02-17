import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../../utils';

const EditCalleModal = ({ show, onClose, onUpdate, calle }) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFinal, setHoraFinal] = useState('');
    const [numeroCuadra, setNumeroCuadra] = useState('');
    const [zonaId, setZonaId] = useState('');

    // Estado para almacenar la lista de zonas
    const [zonas, setZonas] = useState([]);

    // Carga inicial de zonas
    useEffect(() => {
        const fetchZonas = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}zonas/list`);
                if (!response.ok) {
                    throw new Error('Error al obtener zonas');
                }
                const data = await response.json();
                setZonas(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchZonas();
    }, []);

    // Al recibir la calle seleccionada, llenamos los estados
    useEffect(() => {
        if (calle) {
            setNombre(calle.nombre || '');
            setDescripcion(calle.descripcion || '');
            setHoraInicio(calle.hora_inicio || '');
            setHoraFinal(calle.hora_final || '');
            setNumeroCuadra(calle.numero_cuadra?.toString() || '');
            setZonaId(calle.zona_id?.toString() || '');
        }
    }, [calle]);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}calles/${calle.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre,
                    descripcion,
                    hora_inicio: horaInicio,
                    hora_final: horaFinal,
                    numero_cuadra: parseInt(numeroCuadra, 10),
                    zona_id: parseInt(zonaId, 10),
                }),
            });

            if (response.ok) {
                const updatedCalle = await response.json();
                showSuccessAlert('Éxito', 'Calle actualizada correctamente');
                onUpdate(updatedCalle);
                onClose();
            } else {
                showErrorAlert('Error', 'No se pudo actualizar la calle');
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
                        Editar Calle
                    </h2>
                </div>

                <div className="p-6 space-y-6">
                    {/* Nombre */}
                    <div>
                        <label className="block text-gray-700">Nombre</label>
                        <input
                            type="text"
                            className="border p-2 rounded w-full"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-gray-700">Descripción</label>
                        <textarea
                            className="border p-2 rounded w-full"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>

                    {/* Hora Inicio */}
                    <div>
                        <label className="block text-gray-700">Hora Inicio</label>
                        <input
                            type="time"
                            className="border p-2 rounded w-full"
                            value={horaInicio}
                            onChange={(e) => setHoraInicio(e.target.value)}
                        />
                    </div>

                    {/* Hora Final */}
                    <div>
                        <label className="block text-gray-700">Hora Final</label>
                        <input
                            type="time"
                            className="border p-2 rounded w-full"
                            value={horaFinal}
                            onChange={(e) => setHoraFinal(e.target.value)}
                        />
                    </div>

                    {/* Número Cuadra */}
                    <div>
                        <label className="block text-gray-700">Número Cuadra</label>
                        <input
                            type="number"
                            className="border p-2 rounded w-full"
                            value={numeroCuadra}
                            onChange={(e) => setNumeroCuadra(e.target.value)}
                        />
                    </div>

                    {/* Zona (select) */}
                    <div>
                        <label className="block text-gray-700">Zona</label>
                        <select
                            className="border p-2 rounded w-full"
                            value={zonaId}
                            onChange={(e) => setZonaId(e.target.value)}
                        >
                            <option value="">Selecciona una zona</option>
                            {zonas.map((z) => (
                                <option key={z.id} value={z.id}>
                                    {z.nombre}
                                </option>
                            ))}
                        </select>
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
                        onClick={handleUpdate}
                    >
                        Actualizar
                    </button>
                </div>
            </div>
        </div>
    );
};

EditCalleModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    calle: PropTypes.shape({
        id: PropTypes.number,
        nombre: PropTypes.string,
        descripcion: PropTypes.string,
        hora_inicio: PropTypes.string,
        hora_final: PropTypes.string,
        numero_cuadra: PropTypes.number,
        zona_id: PropTypes.number,
    }),
};

export default EditCalleModal;
