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
    return (
        <div>
            <LoadScript googleMapsApiKey="AIzaSyD2nU5cvLIMyqzC7ZhwfdX1G1IplX1_Gkk">
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