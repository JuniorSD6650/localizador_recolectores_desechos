// src/components/TituloConRegreso.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Importa el icono

const TituloConRegreso = ({ titulo, to }) => {
    return (
        <div className="d-flex justify-content-between align-items-center mb-4">
            {/* Botón de regresar alineado a la izquierda (solo si hay 'to') */}
            {to && (
                <Link to={to} className="btn btn-secondary">
                    <ArrowBackIcon sx={{ fontSize: 24, marginRight: '8px' }} />
                    Regresar
                </Link>
            )}

            {/* Título centrado verticalmente */}
            <h1 className="flex-grow-1 text-center d-flex align-items-center justify-content-center mb-0">
                {titulo}
            </h1>
        </div>
    );
};

export default TituloConRegreso;
