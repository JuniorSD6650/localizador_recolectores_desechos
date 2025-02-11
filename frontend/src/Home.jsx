import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CardAnimation from './components/CardAnimation/CardAnimation';
import TituloConRegreso from './components/TituloConRegreso/TituloConRegreso';

const Home = () => {
    return (


        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-6 md:px-12">
                {/* Left Section */}
                <div className="text-center md:text-left md:max-w-lg">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                        Hola,
                    </h1>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
                        Recolector Digital de Amarilis
                    </h2>
                    <p className="text-gray-600 mt-4">
                        Sistema de reporte y geolocalización de carros recolectores - podras ver exactamente donde se encuantra el carro lector y podras hacer un reporte de la basura.
                    </p>
                    <br />
                    <div className="flex space-x-4">
                        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600">
                            Get Started →
                        </button>
                        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600">
                            Get Started →
                        </button>
                    </div>
                </div>
                {/* Right Section */}
                <div className="md:w-1/2">
                    <img
                        src="/images/img-prueba.jpg"
                        alt="Business Illustration"
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;