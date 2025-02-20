import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CardAnimation from './components/CardAnimation/CardAnimation';
import TituloConRegreso from './components/TituloConRegreso/TituloConRegreso';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, BASE_URL } from './utils';

const Home = () => {

    const [publicaciones, setPublicaciones] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPublicaciones = async () => {
            try {
                const response = await fetch(API_BASE_URL + 'publicaciones');
                const data = await response.json();
                setPublicaciones(data.publicaciones);
            } catch (error) {
                console.error('Error fetching publicaciones:', error);
            }
        };

        fetchPublicaciones();
    }, []);

    const handleRecolectoresClick = () => {
        navigate('/recolectores');
    }

    const handleReportesClick = () => {
        navigate('/reportar');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="container mx-auto flex flex-col md:flex-row items-center px-6 md:px-20 mt-16">
                {/* Carousel Section */}
                <div className="w-full md:w-1/2 md:order-2 mb-8 md:mb-0">
                    <Carousel showThumbs={false} autoPlay infiniteLoop showArrows={false} swipeable emulateTouch>
                        {publicaciones.map((publicacion) => (
                            <div key={publicacion.id}>
                                <img
                                    src={BASE_URL + `${publicacion.imagen_url}`}
                                    alt={publicacion.titulo}
                                    className="carousel-image"
                                    draggable="false"
                                    style={{ userSelect: 'none' }}
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>

                {/* Text Content Section */}
                <div className="     md:text-left md:w-1/2 md:order-1 md:px-20">
                    <h1 className="text-4xl md:text-5xl font-bold" style={{ color: '#205287' }}>
                        Hola Vecino,
                    </h1>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: '#205287' }}>
                        Recolector Digital
                    </h2>
                    <p className="text-gray-600 mt-4 font-normal" style={{ color: '#595957' }}>
                        Sistema de reporte y geolocalización de carros recolectores - podrás ver exactamente donde se encuantra el carro recolector y podras hacer un reporte de la basura.
                    </p>
                    <br />
                    <div className="flex space-x-4  justify-start">
                        <button className="px-6 py-3 bg-green-custom text-white rounded-3xl shadow-lg hover:bg-green2-custom"
                            onClick={handleRecolectoresClick}>
                            Recolectores
                        </button>
                        <button className="px-6 py-3 bg-green-custom text-white rounded-3xl shadow-lg hover:green2-custom"
                            onClick={handleReportesClick}>
                            Reportar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;