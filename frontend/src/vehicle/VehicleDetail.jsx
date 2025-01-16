// src/VehicleDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL, calculateTimeAgo } from '../utils';

const VehicleDetail = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const response = await fetch(API_BASE_URL + `recolectores/${id}`);
                const data = await response.json();

                if (response.ok) {
                    setVehicle(data);
                } else {
                    setMessage('No se pudo obtener los detalles del recolector');
                }
            } catch (error) {
                setMessage('Error al conectar con la API');
            }
        };

        fetchVehicle();
    }, [id]);

    if (message) {
        return <p className="text-danger">{message}</p>;
    }

    if (!vehicle) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="container my-5 d-flex flex-column align-items-center">
            <h1 className="text-center mb-4">{vehicle.nombre_recolector}</h1>
            <h3 className="text-center mb-4">{vehicle.zona_responsable}</h3>

            {/* Botón "Localizar" debajo del nombre */}
            {vehicle.ubicacion_enlace && (
                <a href={vehicle.ubicacion_enlace} target="_blank" rel="noopener noreferrer">
                    <button className="btn btn-info btn-lg mb-3">
                        Localizar
                    </button>
                </a>
            )}

            {/* Estado más grande y centrado */}
            <div className="mb-3 text-center">
                <strong>Estado:</strong>
                <p className={`display-4 ${vehicle.estado === 'activo' ? 'text-success' : 'text-danger'}`}>
                    {vehicle.estado === 'activo' ? 'Activo' : 'Inactivo'}
                </p>
            </div>

            {/* Última actualización */}
            {vehicle.fecha_ubicacion_actualizada && (
                <div className="text-center">
                    <span>Última actualización: {calculateTimeAgo(vehicle.fecha_ubicacion_actualizada)}</span>
                </div>
            )}

            {/* Mostrar teléfono solo si está disponible */}
            {vehicle.telefono_recolector && (
                <div className="mt-3 text-center">
                    <strong>Teléfono:</strong>
                    <p>{vehicle.telefono_recolector}</p>
                </div>
            )}
        </div>
    );
};

export default VehicleDetail;
