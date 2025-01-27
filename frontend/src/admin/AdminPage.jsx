import React from 'react';
import CardAnimation from '../components/CardAnimation/CardAnimation';
import TituloConRegreso from '../components/TituloConRegreso/TituloConRegreso';

const AdminPage = () => {
    return (
        <div className="container text-center py-3 px-5">
            <TituloConRegreso titulo="Vista de Administrador" />

            <div className="row g-4 px-5 pt-5">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                    <CardAnimation
                        title="Perfil"
                        description="Accede y edita tu perfil."
                        to="perfil"
                        icon="account"
                    />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                    <CardAnimation
                        title="Conductores"
                        description="Gestiona los Conductores asignados."
                        to="conductores"
                        icon="switch"
                    />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                    <CardAnimation
                        title="Reportes"
                        description="Revisa y administra los reportes realizados."
                        to="reportes"
                        icon="recycling"
                    />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                    <CardAnimation
                        title="Vehículos Recolectores"
                        description="Consulta y administra los vehículos recolectores."
                        to="vehiculos"
                        icon="shipping"
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminPage;