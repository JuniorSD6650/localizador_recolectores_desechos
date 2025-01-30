import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CardAnimation from './components/CardAnimation/CardAnimation';
import TituloConRegreso from './components/TituloConRegreso/TituloConRegreso';

const Home = () => {
    return (
        <div className="text-center py-3">
            <TituloConRegreso titulo="Bienvenido a la Aplicación" className="mb-4" />

            <div className="container mx-auto px-5">
                <Carousel showThumbs={false} autoPlay infiniteLoop showArrows={false} swipeable emulateTouch>
                    <div>
                        <img src="/images/conciencia-ambienta.jpg" alt="Noticia 1" className="carousel-image" draggable="false" style={{ userSelect: 'none' }} />
                    </div>
                    <div>
                        <img src="/images/conciencia-ambienta2.jpg" alt="Aviso 1" className="carousel-image" draggable="false" style={{ userSelect: 'none' }} />
                    </div>
                    <div>
                        <img src="/images/conciencia-ambienta3.jpg" alt="Comunicado 1" className="carousel-image" draggable="false" style={{ userSelect: 'none' }} />
                    </div>
                </Carousel>

<<<<<<< HEAD
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="flex justify-center">
                        <CardAnimation
                            title="Reportar"
                            description="Reporta cualquier acumulación de basura y ayuda a mantener limpia tu comunidad."
                            to="/reportar"
                            icon="recycling"
                        />
                    </div>
                    <div className="flex justify-center">
                        <CardAnimation
                            title="Lista de Vehículos Recolectores"
                            description="Consulta la lista de vehículos recolectores disponibles."
                            to="/recolectores"
                            icon="shipping"
                        />
                    </div>
=======
                <div className="flex justify-center gap-10 mt-4">
                    <CardAnimation
                        title="Reportar"
                        description="Reporta cualquier acumulación de basura y ayuda a mantener limpia tu comunidad."
                        to="/reportar"
                        icon="recycling"
                    />
                    <CardAnimation
                        title="Lista de Vehículos Recolectores"
                        description="Consulta la lista de vehículos recolectores disponibles."
                        to="/recolectores"
                        icon="shipping"
                    />
>>>>>>> nueva-rama
                </div>
            </div>
        </div>
    );
};

export default Home;