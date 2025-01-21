import React from 'react';
import CardAnimation from './components/CardAnimation';
import TituloConRegreso from './components/TituloConRegreso';

const Home = () => {
    return (
        <div className="text-center py-3">
            <TituloConRegreso titulo="Bienvenido a la Aplicación" className="mb-4" />

            <div className="container px-5">
                <div className="row row-cols-1 row-cols-sm-2 g-2  px-5">
                    <div className="col d-flex justify-content-center">
                        <CardAnimation
                            title="Reportar"
                            description="Reporta cualquier acumulación de basura y ayuda a mantener limpia tu comunidad."
                            to="/report"
                            icon="recycling"
                        />
                    </div>
                    <div className="col d-flex justify-content-center">
                        <CardAnimation
                            title="Lista de Vehículos Recolectores"
                            description="Consulta la lista de vehículos recolectores disponibles."
                            to="/vehicles"
                            icon="shipping"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
