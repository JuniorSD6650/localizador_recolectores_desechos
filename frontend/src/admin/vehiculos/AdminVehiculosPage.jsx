// src/admin/Vehiculos/AdminVehiculosPage.jsx
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../utils';
import TituloConRegreso from '../../components/TituloConRegreso';

const AdminVehiculosPage = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchVehiculos = async () => {
            try {
                const response = await fetch(API_BASE_URL + 'vehiculos');
                const data = await response.json();

                if (response.ok) {
                    setVehiculos(data);
                } else {
                    setMessage('No se pudieron cargar los vehículos');
                }
            } catch (error) {
                setMessage('Error al conectar con la API');
            }
        };

        fetchVehiculos();
    }, []);

    return (
        <div className="container text-center my-5">
            <TituloConRegreso titulo="Gestión de Vehículoss" to="/admin" />
            <p>Aquí podrás ver y gestionar los vehículos recolectores.</p>

            {message && <p className="text-danger">{message}</p>}

            <div className="list-group mt-4">
                {vehiculos.length === 0 ? (
                    <p>No hay vehículos registrados</p>
                ) : (
                    vehiculos.map((vehiculo) => (
                        <div key={vehiculo.id} className="list-group-item">
                            <strong>{vehiculo.nombre}</strong>
                            <p>{vehiculo.estado}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminVehiculosPage;
