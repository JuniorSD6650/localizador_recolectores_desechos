import React from 'react';
import './carga.css';

const Cargando = () => {
    return (
        <div className="fullscreen-loader">
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Cargando;