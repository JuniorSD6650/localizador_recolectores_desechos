// src/admin/Localizadores/AdminLocalizadorPage.jsx
import React from 'react';
import TituloConRegreso from '../../components/TituloConRegreso';

const AdminLocalizadorPage = () => {
    return (
        <div className="container my-5">
            <TituloConRegreso titulo="Gestión de Localizadores" to="/admin" />
            <p>Aquí podrás gestionar todos los localizadores.</p>
        </div>
    );
};

export default AdminLocalizadorPage;
