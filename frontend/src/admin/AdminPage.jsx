import React from 'react';
import CardAnimation from '../components/CardAnimation/CardAnimation';
import TituloConRegreso from '../components/TituloConRegreso/TituloConRegreso';

const AdminPage = () => {
    return (
        <div className="container mx-auto px-4 py-8 min-h-screen mt-16">
            <TituloConRegreso titulo="Vista de Administrador" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center mt-6">
                <div className="flex justify-center">
                    <CardAnimation
                        title="Perfil"
                        description="Accede y edita la información de tu perfil."
                        to="perfil"
                        icon="account"
                    />
                </div>
                <div className="flex justify-center">
                    <CardAnimation
                        title="Personal"
                        description="Gestiona la información del personal."
                        to="personal"
                        icon="switch"
                    />
                </div>
                <div className="flex justify-center">
                    <CardAnimation
                        title="Reportes"
                        description="Revisa y administra los reportes de incidentes."
                        to="reportes"
                        icon="report"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center mt-6">
                <div className="flex justify-center">
                    <CardAnimation
                        title="Zonas"
                        description="Gestiona las zonas de recolección."
                        to="zonas"
                        icon="layers"
                    />
                </div>
                <div className="flex justify-center">
                    <CardAnimation
                        title="Calles"
                        description="Administra las calles asignadas a las zonas."
                        to="calles"
                        icon="road"
                    />
                </div>
                <div className="flex justify-center">
                    <CardAnimation
                        title="Publicaciones"
                        description="Gestiona las publicaciones y anuncios."
                        to="publicaciones"
                        icon="campaing"
                    />
                </div>
                <div className="flex justify-center">
                    <CardAnimation
                        title="Jornadas"
                        description="Administra las jornadas de trabajo."
                        to="jornadas"
                        icon="work"
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminPage;