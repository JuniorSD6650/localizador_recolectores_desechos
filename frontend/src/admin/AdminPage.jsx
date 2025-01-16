import React from 'react';
import CardAnimation from '../components/CardAnimation';
import TituloConRegreso from '../components/TituloConRegreso';

const AdminPage = () => {
    return (
        <div className="container text-center my-5">
            <TituloConRegreso titulo="Vista de Administrador" />
            <p>Selecciona una opción para gestionar los recursos.</p>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4 my-3 justify-content-center">
                <div className="col d-flex justify-content-center">
                    <CardAnimation
                        title="Localizadores"
                        description="Gestiona los localizadores asignados."
                        to="localizadores"
                    />
                </div>
                <div className="col d-flex justify-content-center">
                    <CardAnimation
                        title="Reportes"
                        description="Revisa y administra los reportes realizados."
                        to="reportes"
                    />
                </div>
                <div className="col d-flex justify-content-center">
                    <CardAnimation
                        title="Vehículos Recolectores"
                        description="Consulta y administra los vehículos recolectores."
                        to="vehiculos"
                    />
                </div>
                <div className="col d-flex justify-content-center">
                    <CardAnimation
                        title="Perfil"
                        description="Accede y edita tu perfil."
                        to="perfil"
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
