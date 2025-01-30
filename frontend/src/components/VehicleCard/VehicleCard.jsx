import React from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const VehicleCard = ({ vehicleName, zone, status }) => {
    const iconColorClass = status === 'activo' ? 'text-green-500' : 'text-red-500';

    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
            <LocalShippingIcon
                className={`${iconColorClass}`}
                style={{ fontSize: '3rem' }}
            />
            <div className="flex flex-col">
                <span className="text-gray-600">{zone}</span>
                <span className="text-lg font-semibold">{vehicleName}</span>
            </div>
        </div>
    );
};

export default VehicleCard;