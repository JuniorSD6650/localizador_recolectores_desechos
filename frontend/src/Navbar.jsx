import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
    const location = useLocation();
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationsRef = useRef(null);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse no-underline">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Sistema Recolector</span>
                    </a>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <div className="relative" ref={notificationsRef}>
                            <button onClick={toggleNotifications} className="text-gray-500 dark:text-white focus:outline-none">
                                <NotificationsIcon />
                            </button>
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                                    <ul className="py-1">
                                        <li className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">Notificación 1</li>
                                        <li className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">Notificación 2</li>
                                        <li className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">Notificación 3</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <Link to="/login" className="text-sm text-blue-600 dark:text-blue-500 no-underline">
                            <AccountCircleIcon />Login
                        </Link>
                    </div>
                </div>
            </nav>
            <nav className="bg-gray-50 dark:bg-gray-700">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex items-center">
                        <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <li>
                                <Link
                                    to="/"
                                    className={`text-gray-900 dark:text-white no-underline ${location.pathname === '/' ? 'font-bold' : ''}`}
                                    aria-current="page"
                                >
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/reportar"
                                    className={`text-gray-900 dark:text-white no-underline ${location.pathname === '/reportar' ? 'font-bold' : ''}`}
                                >
                                    Reportar
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/recolectores"
                                    className={`text-gray-900 dark:text-white no-underline ${location.pathname === '/recolectores' ? 'font-bold' : ''}`}
                                >
                                    Recolectores
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;