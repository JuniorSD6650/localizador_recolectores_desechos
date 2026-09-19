import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '94vh'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const Mapa = () => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyD2nU5cvLIMyqzC7ZhwfdX1G1IplX1_Gkk";

    return (
        <div>
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                    { /* Child components, such as markers, info windows, etc. */ }
                    <></>
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default Mapa;