import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

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
        <nav className="bg-blue-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link className="text-white text-xl font-bold" to={getHomeRoute()}>
                    Inicio
                </Link>

                <button
                    className="text-white focus:outline-none lg:hidden"
                    type="button"
                    onClick={() => {
                        const nav = document.getElementById('navbarNav');
                        nav.classList.toggle('hidden');
                    }}
                >
                    <MenuIcon />
                </button>

                <div className="hidden lg:flex lg:items-center" id="navbarNav">
                    <ul className="flex flex-col lg:flex-row lg:space-x-6">
                        <li>
                            <Link className="text-white hover:text-gray-300" to={getHomeRoute()}>
                                Inicio
                            </Link>
                        </li>
                        {token ? (
                            <li>
                                <button
                                    className="text-white hover:text-gray-300"
                                    onClick={handleLogout}
                                >
                                    Cerrar sesión
                                </button>
                            </li>
                        ) : (
                            <li>
                                <Link className="text-white hover:text-gray-300" to="/login">
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