import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CardAnimation from './components/CardAnimation/CardAnimation';
import TituloConRegreso from './components/TituloConRegreso/TituloConRegreso';
import { useNavigate} from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const handleRecolectoresClick = () => {
        navigate('/recolectores');
    }

    const handleReportesClick = () => {
        navigate('/reportar');
    };

    return (


        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-6 md:px-12">
                
                <div className="text-center md:text-left md:max-w-lg">
                    <h1 className="text-4xl md:text-5xl font-bold" style={{ color: '#205287' }}>
                        Hola,
                    </h1>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: '#205287' }}>
                        Recolector Digital de Amarilis
                    </h2>
                    <p className="text-gray-600 mt-4 font-normal" style={{ color: '#595957' }}  >
                        Sistema de reporte y geolocalización de carros recolectores - podras ver exactamente donde se encuantra el carro lector y podras hacer un reporte de la basura.
                    </p>
                    <br />
                    <div className="flex space-x-4">
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
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <Carousel className="w-full md:w-3/4">
                        <div>
                            <img src="image1.jpg" alt="Image 1" />
                            <p className="legend">Legend 1</p>
                        </div>
                        <div>
                            <img src="image2.jpg" alt="Image 2" />
                            <p className="legend">Legend 2</p>
                        </div>
                        <div>
                            <img src="image3.jpg" alt="Image 3" />
                            <p className="legend">Legend 3</p>
                        </div>
                    </Carousel>
                </div>
        </div>
    );
};

export default Home;