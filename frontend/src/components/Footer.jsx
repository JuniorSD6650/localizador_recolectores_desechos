// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Sistema Recolector. Todos los derechos reservados.
                </p>
                <p className="text-sm mt-2">
                    Desarrollado por{' '}
                    <a
                        href="https://www.instagram.com/transformaciondigitaludh/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                    >
                        Laboratorio de Transformación Digital
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;