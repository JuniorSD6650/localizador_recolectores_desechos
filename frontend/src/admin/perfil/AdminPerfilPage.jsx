"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../utils";
import TituloConRegreso from "../../components/TituloConRegreso/TituloConRegreso";

const AdminPerfilPage = () => {
    const [perfil, setPerfil] = useState(null);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setMessage("Token no encontrado. Por favor, inicia sesión.");
                    setIsLoading(false);
                    return;
                }

                const decoded = JSON.parse(atob(token.split(".")[1]));
                const role = decoded.role;

                if (role !== "admin") {
                    setMessage("No tienes permisos para acceder a esta sección.");
                    setIsLoading(false);
                    return;
                }

                const response = await fetch(`${API_BASE_URL}usuarios/admin`);
                const data = await response.json();

                if (response.ok) {
                    setPerfil(data);
                } else {
                    setMessage("No se pudo cargar el perfil");
                }
            } catch (error) {
                console.error("Error al decodificar el token o al conectar con la API:", error);
                setMessage("Error al conectar con la API");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPerfil();
    }, []);

    const ProfileItem = ({ label, value }) => (
        <div className="text-center mb-4">
            <p className="text-sm text-gray-600">{label}</p>
            <p className="font-medium text-gray-800">{value}</p>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen mt-16">
            <TituloConRegreso titulo="Perfil del Administrador" to="/admin" />

            {message && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                    <p>{message}</p>
                </div>
            )}

            {isLoading ? (
                <div className="animate-pulse bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-4">
                    <div className="h-20 w-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
                </div>
            ) : perfil ? (
                <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-4">
                    {/* Imagen y nombre del usuario centrados */}
                    <div className="text-center mb-6">
                        <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                            {perfil.admin.nombres[0]}
                            {perfil.admin.primer_apellido[0]}
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">
                            {`${perfil.admin.nombres} ${perfil.admin.primer_apellido} ${perfil.admin.segundo_apellido || ""}`}
                        </h2>
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                            {perfil.admin.role}
                        </span>
                    </div>

                    <div className="flex flex-col items-center mb-4">
                        <ProfileItem label="Usuario" value={perfil.credenciales.username} />
                    </div>

                    <div className="flex flex-col items-center mb-4">
                        <ProfileItem label="Email" value={perfil.admin.email} />

                    </div>
                    <div className="flex flex-col items-center mb-4">
                        <ProfileItem label="Teléfono" value={perfil.admin.telefono} />

                    </div>

                </div>
            ) : (
                <p className="text-center text-gray-600">No se ha encontrado información de perfil.</p>
            )}
        </div>
    );
};

export default AdminPerfilPage;
