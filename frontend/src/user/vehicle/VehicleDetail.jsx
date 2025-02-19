import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL, calculateTimeAgo } from '../../utils';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import UpdateIcon from '@mui/icons-material/Update';
import TituloConRegreso from '../../components/TituloConRegreso/TituloConRegreso';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

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
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">{message}</p>
            </div>
        );
    }

    if (!vehicle) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    const containerStyle = {
        width: '100%',
        height: '420px'
    };

    const center = {
        lat: -9.93062,
        lng: -76.24223
    };

    const zoomLevel = 14;

    return (
        <div className="container  mx-auto px-4 py-8 min-h-screen mt-16">

            <TituloConRegreso titulo="Detalles" to="/recolectores" />

            <div className='w-full shadow-lg p-6'>

                <div className="flex flex-col items-center mb-4">
                    <div className="flex items-center mb-2">
                        <LocalShippingIcon
                            className={vehicle.estado_operativo === 'operativo' ? 'text-green-500' : 'text-red-500'}
                            style={{ fontSize: '2.5rem' }}
                        />
                        <span className={`ml-2 px-2 py-1 rounded ${vehicle.estado_operativo === 'operativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {vehicle.estado_operativo === 'operativo' ? 'Operativo' : 'Inoperativo'}
                        </span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{vehicle.nombre_recolector}</h1>
                        <h2 className="text-xl text-gray-600">{vehicle.zona_responsable}</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {vehicle.ubicacion_enlace && (
                        <div className="flex flex-col items-center p-4 bg-white rounded shadow">
                            <LocationOnIcon className="text-blue-500 mb-2" />
                            <a href={vehicle.ubicacion_enlace}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline">
                                Localizar Vehículo
                            </a>
                        </div>
                    )}


                    {vehicle.fecha_ubicacion_actualizada && (
                        <div className="flex flex-col items-center p-4 bg-white rounded shadow">
                            <UpdateIcon className="text-blue-500 mb-2" />
                            <div className="text-center">
                                <span className="block text-gray-600">Última actualización</span>
                                <span className="block text-gray-800">
                                    {calculateTimeAgo(vehicle.fecha_ubicacion_actualizada)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <LoadScript googleMapsApiKey="AIzaSyD2nU5cvLIMyqzC7ZhwfdX1G1IplX1_Gkk">
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={zoomLevel}
                        >
                            <></>
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>

        </div>
    );
};

export default VehicleDetail;