// src/localizador/LocalizadorPage.jsx
import React from 'react';
import TituloConRegreso from '../components/TituloConRegreso';
const LocalizadorPage = () => {
    return (
        <div className="container text-center my-5">
            <TituloConRegreso titulo="Vista de Localizador" />
            <p>Aquí podrás gestionar tu actividad como localizador.</p>
            {/* Aquí puedes agregar más contenido o componentes específicos para los localizadores */}
        </div>
    );
};

export default LocalizadorPage;
