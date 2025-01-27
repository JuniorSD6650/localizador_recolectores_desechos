import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './TituloConRegreso.css';

const TituloConRegreso = ({ titulo, to }) => {
    return (
        <div className="titulo-con-regreso-container">
            {to && (
                <Link to={to} className="regreso-btn">
                    <ArrowBackIcon className="regreso-icon" />
                    Regresar
                </Link>
            )}

            <div id="titulo-box">
                <div className="subtitulo">Digital</div>
                <div className="titulo">{titulo}</div>
                <div className="extra">Ecológico y emprendedor</div>
            </div>
        </div>
    );
};

export default TituloConRegreso;
