// src/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import CardAnimation from './components/CardAnimation'; // Importa el componente CardAnimation

const Home = () => {
    return (
        <div className="text-center my-5">
            <h1>Bienvenido a la Aplicación</h1>
            <p>Esta es la pantalla de inicio.</p>

            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 g-4 my-3">
                    <div className="col d-flex justify-content-center">
                        <CardAnimation
                            title="Reportar"
                            description="Haz un reporte relacionado con alguna distorsión encontrada."
                            to="/report"
                        />
                    </div>
                    <div className="col d-flex justify-content-center">
                        <CardAnimation
                            title="Lista de Vehículos Recolectores"
                            description="Consulta la lista de vehículos recolectores disponibles."
                            to="/vehicles"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
