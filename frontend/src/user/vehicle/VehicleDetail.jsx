// src/VehicleDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL, calculateTimeAgo } from '../../utils';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import UpdateIcon from '@mui/icons-material/Update';
import './VehicleDetail.css';
import TituloConRegreso from '../../components/TituloConRegreso/TituloConRegreso';

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
        return (
            <div className="error-container">
                <p className="text-danger">{message}</p>
            </div>
        );
    }

    if (!vehicle) {
        return (
            <div className="loading-container">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container vehicle-detail-container text-center py-3">
            <TituloConRegreso titulo="Detalles" to="/vehicles" />
            <div className="vehicle-header">
                <div className="status-indicator">
                    <LocalShippingIcon
                        className={vehicle.estado === 'activo' ? 'text-success' : 'text-danger'}
                        style={{ fontSize: '2.5rem' }}
                    />
                    <span className={`status-badge ${vehicle.estado === 'activo' ? 'active' : 'inactive'}`}>
                        {vehicle.estado === 'activo' ? 'Activo' : 'Inactivo'}
                    </span>
                </div>
                <div className="vehicle-titles">
                    <h1>{vehicle.nombre_recolector}</h1>
                    <h2>{vehicle.zona_responsable}</h2>
                </div>
            </div>

            <div className="vehicle-info-grid">
                {vehicle.ubicacion_enlace && (
                    <div className="info-card location-card">
                        <LocationOnIcon />
                        <a href={vehicle.ubicacion_enlace}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-sm">
                            Localizar Vehículo
                        </a>
                    </div>
                )}

                {vehicle.telefono_recolector && (
                    <div className="info-card">
                        <PhoneIcon />
                        <div className="info-content">
                            <span className="info-label">Teléfono</span>
                            <span className="info-value">{vehicle.telefono_recolector}</span>
                        </div>
                    </div>
                )}

                {vehicle.fecha_ubicacion_actualizada && (
                    <div className="info-card">
                        <UpdateIcon />
                        <div className="info-content">
                            <span className="info-label">Última actualización</span>
                            <span className="info-value">
                                {calculateTimeAgo(vehicle.fecha_ubicacion_actualizada)}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VehicleDetail;