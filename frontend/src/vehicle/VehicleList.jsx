// src/VehicleList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../utils';

const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch(API_BASE_URL + 'recolectores/');
                const data = await response.json();

                if (response.ok) {
                    setVehicles(data);
                } else {
                    setMessage('No se pudieron cargar los vehículos');
                }
            } catch (error) {
                setMessage('Error al conectar con la API');
            }
        };

        fetchVehicles();
    }, []);

    const getStatusColor = (status) => {
        return status === 'activo' ? 'bg-success' : 'bg-danger';
    };

    return (
        <div className="container text-center my-5">
            <h1>Lista de Vehículos Recolectores</h1>
            <p>Aquí podrás ver la lista de los vehículos recolectores registrados.</p>

            {message && <p className="text-danger">{message}</p>}

            <div className="list-group mt-4">
                {vehicles.length === 0 ? (
                    <p>No hay vehículos registrados</p>
                ) : (
                    vehicles.map((vehicle) => (
                        <Link
                            key={vehicle.id}
                            to={`/vehicle/${vehicle.id}`}
                            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center p-4 ${getStatusColor(vehicle.estado)}`}
                        >
                            <span>{vehicle.zona_responsable} - {vehicle.nombre_recolector}</span>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default VehicleList;
