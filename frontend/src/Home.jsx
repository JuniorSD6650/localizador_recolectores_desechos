// src/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container text-center my-5">
            <h1>Bienvenido a la Aplicación</h1>
            <p>Esta es la pantalla de inicio.</p>

            <div className="d-flex justify-content-center gap-4 my-3">
                <Link
                    className="btn btn-primary btn-lg"
                    to="/report"
                    style={{
                        width: '200px',
                        height: '200px',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: 0
                    }}
                >
                    Reportar
                </Link>

                <Link
                    className="btn btn-primary btn-lg"
                    to="/vehicles"
                    style={{
                        width: '200px',
                        height: '200px',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: 0
                    }}
                >
                    Lista de Vehículos Recolectores
                </Link>
            </div>
        </div>
    );
};

export default Home;
