import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const token = localStorage.getItem('token');

    const getHomeRoute = () => {
        if (!token) return '/';

        if (location.pathname.startsWith('/admin')) {
            return '/admin';
        }
        if (location.pathname.startsWith('/localizador')) {
            return '/localizador';
        }
        return '/';
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-deep-blue">
            <div className="container-fluid">
                <Link className="navbar-brand" to={getHomeRoute()}>Inicio</Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <MenuIcon />
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={getHomeRoute()}>Inicio</Link>
                        </li>
                        {token ? (
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={handleLogout}>
                                    Cerrar sesión
                                </a>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;