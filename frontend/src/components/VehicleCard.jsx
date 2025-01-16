// src/components/VehicleCard.jsx
import React from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import './VehicleCard.css';

const VehicleCard = ({ vehicleName, zone, status }) => {
    const iconColorClass = status === 'activo' ? 'text-success' : 'text-danger';

    return (
        <div className="vehicle-card">
            <div className="d-flex align-items-center w-100">
                <LocalShippingIcon
                    className={`me-3 ${iconColorClass}`}
                    style={{ fontSize: '3rem' }}
                />
                <div className="info-line">
                    <span className="zone-text">{zone}</span>
                    <span className="collector-name">{vehicleName}</span>
                </div>
            </div>
        </div>
    );
};

export default VehicleCard;