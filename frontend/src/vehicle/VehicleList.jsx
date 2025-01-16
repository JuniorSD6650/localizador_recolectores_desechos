// src/VehicleList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../utils';
import VehicleCard from '../components/VehicleCard';
import TituloConRegreso from '../components/TituloConRegreso';

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

    return (
        <div className="container text-center my-5">
            <TituloConRegreso titulo="Lista de Vehículos Recolectores" to="/" />
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
                        >
                            <VehicleCard
                                vehicleName={vehicle.nombre_recolector}
                                zone={vehicle.zona_responsable}
                                status={vehicle.estado}
                            />
                            <br />
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default VehicleList;
