import React from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import LayersIcon from '@mui/icons-material/Layers';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import CampaignIcon from '@mui/icons-material/Campaign';
import ReportIcon from '@mui/icons-material/Report';

import './CardAnimation.css';

const icons = {
    report: ReportIcon,
    account: AccountCircleIcon,
    shipping: LocalShippingIcon,
    switch: SwitchAccountIcon,
    road: EditRoadIcon,
    layers: LayersIcon,
    work: WorkHistoryIcon,
    campaing: CampaignIcon,
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