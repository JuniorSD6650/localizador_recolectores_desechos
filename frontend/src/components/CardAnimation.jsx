// src/components/CardAnimation.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import RecyclingIcon from '@mui/icons-material/Recycling';

import './CardAnimation.css';

const CardAnimation = ({ title, description, to }) => {
    return (
        <Link to={to} className="card">
            <RecyclingIcon sx={{ fontSize: 60, color: 'white' }} />
            <h2>{title}</h2>
            <p>{description}</p>
        </Link>
    );
};

export default CardAnimation;
