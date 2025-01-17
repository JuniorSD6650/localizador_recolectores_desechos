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
        <div className="container text-center py-3">
            <TituloConRegreso titulo="Lista de Vehículos Recolectores" to="/" />

            {message && <p className="text-danger">{message}</p>}

            {vehicles.length === 0 ? (
                <p>No hay vehículos registrados</p>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 g-4 mt-4">
                    {vehicles.map((vehicle) => (
                        <div className="col" key={vehicle.id}>
                            <Link to={`/vehicle/${vehicle.id}`} className="text-decoration-none">
                                <VehicleCard
                                    vehicleName={vehicle.nombre_recolector}
                                    zone={vehicle.zona_responsable}
                                    status={vehicle.estado}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VehicleList;
