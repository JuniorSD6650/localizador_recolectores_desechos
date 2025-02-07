import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Notifications from './Notifications';

const Navbar = () => {
    const location = useLocation();
    const [showNotifications, setShowNotifications] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const notificationsRef = useRef(null);
    const navbarRef = useRef(null);

    useEffect(() => {
        const updateNavbarSpace = () => {
            const navbarHeight = navbarRef.current?.offsetHeight || 0;
            document.body.style.paddingTop = `${navbarHeight}px`;
        };

        updateNavbarSpace();

        window.addEventListener('resize', updateNavbarSpace);

        return () => {
            window.removeEventListener('resize', updateNavbarSpace);
            document.body.style.paddingTop = '0px';
        };
    }, []);

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

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setShowNotifications(false); // También cerramos las notificaciones al cambiar de ruta
    }, [location]);

    const NavLinks = () => (
        <>
            <Link
                to="/"
                className={`text-gray-900 dark:text-white no-underline block py-2 ${location.pathname === '/' ? 'font-bold border-b-2 border-green-custom' : ''}`}
                aria-current="page"
            >
                Inicio
            </Link>
            <Link
                to="/reportar"
                className={`text-gray-900 dark:text-white no-underline block py-2 ${location.pathname === '/reportar' ? 'font-bold border-b-2 border-green-custom' : ''}`}
            >
                Reportar
            </Link>
            <Link
                to="/recolectores"
                className={`text-gray-900 dark:text-white no-underline block py-2 ${location.pathname === '/recolectores' ? 'font-bold border-b-2 border-green-custom' : ''}`}
            >
                Recolectores
            </Link>
            <Link
                to="/login"
                className={`text-gray-900 dark:text-white no-underline block py-2 ${location.pathname === '/login' ? 'font-bold border-b-2 border-green-custom' : ''}`}
            >
                Login
            </Link>
        </>
    );

    return (
        <div className='fixed top-0 w-full z-50' ref={navbarRef}>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4 border-b-2">
                    <a href="/" className="flex items-center justify-center space-x-3 rtl:space-x-reverse no-underline">
                        <img
                            src="/images/logo_amarilis.png"
                            alt="Logo Amarilis"
                            className="mx-auto w-auto h-auto max-h-12 sm:max-h-14 md:max-h-16 lg:max-h-17"
                        />
                    </a>

                    <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
                        <NavLinks />
                        <div ref={notificationsRef}>
                            <Notifications
                                showNotifications={showNotifications}
                                setShowNotifications={setShowNotifications}
                            />
                        </div>
                    </div>

                    <div className="flex items-center md:hidden">
                        <div ref={notificationsRef}>
                            <Notifications
                                showNotifications={showNotifications}
                                setShowNotifications={setShowNotifications}
                            />
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-500 focus:outline-none"
                        >
                            {isMobileMenuOpen ? (
                                <CloseIcon style={{ color: '#595957' }} />
                            ) : (
                                <MenuIcon style={{ color: '#595957' }} />
                            )}
                        </button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg">
                        <div className="flex flex-col p-4 space-y-2">
                            <NavLinks />
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;