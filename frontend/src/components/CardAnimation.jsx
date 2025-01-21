import React from 'react';
import { Link } from 'react-router-dom';
import RecyclingIcon from '@mui/icons-material/Recycling';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';

import './CardAnimation.css';

const icons = {
    recycling: RecyclingIcon,
    account: AccountCircleIcon,
    shipping: LocalShippingIcon,
    switch: SwitchAccountIcon,
};

const CardAnimation = ({ title, description, to, icon }) => {
    const IconComponent = icons[icon] || RecyclingIcon;

    return (
        <Link to={to} className="card-animation">
            <IconComponent sx={{ fontSize: 60, color: 'white' }} />
            <h2>{title}</h2>
            <p>{description}</p>
        </Link>
    );
};

export default CardAnimation;