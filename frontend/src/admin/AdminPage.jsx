import React from 'react';
import CardAnimation from '../components/CardAnimation/CardAnimation';
import TituloConRegreso from '../components/TituloConRegreso/TituloConRegreso';

const AdminPage = () => {
    return (
        <div className="container mx-auto text-center py-3 px-5">
            <TituloConRegreso titulo="Vista de Administrador" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-5 pt-5 mt-5">
                <div className="flex justify-center">
                    <CardAnimation
                        title="Perfil"
                        description="Accede y edita tu perfil."
                        to="perfil"
                        icon="account"
                    />
                </div>
                <div className="flex justify-center">
                    <CardAnimation
                        title="Conductores"
                        description="Gestiona los Conductores asignados."
                        to="conductores"
                        icon="switch"
                    />
                </div>
                <div className="flex justify-center">
                    <CardAnimation
                        title="Reportes"
                        description="Revisa y administra los reportes realizados."
                        to="reportes"
                        icon="recycling"
                    />
                </div>
                <div className="flex justify-center">
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