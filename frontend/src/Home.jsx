import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CardAnimation from './components/CardAnimation/CardAnimation';
import TituloConRegreso from './components/TituloConRegreso/TituloConRegreso';

const Home = () => {
    return (
        <div className="text-center py-3">
            <TituloConRegreso titulo="Bienvenido a la Aplicación" className="mb-4" />

            <div className="container px-5">
                <Carousel showThumbs={false} autoPlay infiniteLoop>
                    <div>
                        <img src="/images/conciencia-ambienta.jpg" alt="Noticia 1" className="carousel-image" />
                        <p className="legend">Noticia 1: Detalles de la noticia 1.</p>
                    </div>
                    <div>
                        <img src="/images/conciencia-ambienta2.jpg" alt="Aviso 1" className="carousel-image" />
                        <p className="legend">Aviso 1: Detalles del aviso 1.</p>
                    </div>
                    <div>
                        <img src="/images/conciencia-ambienta3.jpg" alt="Comunicado 1" className="carousel-image" />
                        <p className="legend">Comunicado 1: Detalles del comunicado 1.</p>
                    </div>
                </Carousel>

                <div className="row row-cols-1 row-cols-sm-2 g-2 mt-4">
                    <div className="col d-flex justify-content-center">
                        <CardAnimation
                            title="Reportar"
                            description="Reporta cualquier acumulación de basura y ayuda a mantener limpia tu comunidad."
                            to="/reportar"
                            icon="recycling"
                        />
                    </div>
                    <div className="col d-flex justify-content-center">
                        <CardAnimation
                            title="Lista de Vehículos Recolectores"
                            description="Consulta la lista de vehículos recolectores disponibles."
                            to="/recolectores"
                            icon="shipping"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;