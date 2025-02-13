"use client";

import React, { useState, useEffect } from "react";
import {
    API_BASE_URL,
    BASE_URL,
    showSuccessAlert,
    showErrorAlert,
    showCustomAlert
} from "../../utils";
import TituloConRegreso from "../../components/TituloConRegreso/TituloConRegreso";

// Icons
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";

const AdminReportesPage = () => {
    const [reportes, setReportes] = useState([]);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState({
        total: 0,
        totalPages: 1,
        currentPage: 1,
        limit: 10,
    });

    useEffect(() => {
        fetchReportes(pagination.currentPage);
    }, []);

    const fetchReportes = async (page) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}reportes?page=${page}&limit=${pagination.limit}`);
            const data = await response.json();

            if (response.ok && Array.isArray(data.reportes)) {
                console.log(data.reportes);
                setReportes(data.reportes);
                setPagination(data.pagination);
            } else {
                console.error("API no devolvió un array:", data);
                setMessage("No se pudieron cargar los reportes.");
                setReportes([]);
            }
        } catch (error) {
            console.error("Error fetching reportes:", error);
            setMessage("Error al conectar con la API.");
            setReportes([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEstadoChange = async (id, nuevoEstado) => {
        try {
            const confirmed = await showCustomAlert({
                title: "¿Estás seguro?",
                text: `¿Quieres marcar este reporte como ${nuevoEstado}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, continuar",
                cancelButtonText: "Cancelar",
            });

            if (confirmed?.isConfirmed) {
                const response = await fetch(`${API_BASE_URL}reportes/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ estado_reporte: nuevoEstado }),
                });

                if (response.ok) {
                    setReportes((prevReportes) =>
                        prevReportes.map((reporte) =>
                            reporte.id === id ? { ...reporte, estado_reporte: nuevoEstado } : reporte
                        )
                    );
                    showSuccessAlert("Estado actualizado", `El reporte se marcó como ${nuevoEstado}.`);
                } else {
                    const errorData = await response.json();
                    showErrorAlert("Error", errorData.message || "No se pudo actualizar el estado.");
                }
            }
        } catch (error) {
            console.error("Error al conectar con la API:", error);
            showErrorAlert("Error", "Hubo un problema con la API.");
        }
    };

    const handleEliminar = async (id) => {
        try {
            const confirmed = await showCustomAlert({
                title: "¿Estás seguro?",
                text: "Esta acción no se puede deshacer. ¿Deseas eliminar este reporte?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
            });

            if (confirmed?.isConfirmed) {
                const response = await fetch(`${API_BASE_URL}reportes/${id}`, { method: "DELETE" });

                if (response.ok) {
                    setReportes((prevReportes) => prevReportes.filter((reporte) => reporte.id !== id));
                    showSuccessAlert("Eliminado", "El reporte se eliminó con éxito.");
                } else {
                    const errorData = await response.json();
                    showErrorAlert("Error", errorData.message || "No se pudo eliminar el reporte.");
                }
            }
        } catch (error) {
            console.error("Error al conectar con la API:", error);
            showErrorAlert("Error", "Hubo un problema con la API.");
        }
    };

    const handleShowImage = (rutaFoto) => {
        setSelectedImage(`${BASE_URL}${rutaFoto}`);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedImage("");
    };

    const handlePageChange = (newPage) => {
        fetchReportes(newPage);
        setPagination((prev) => ({ ...prev, currentPage: newPage }));
    };

    return (
        <div className="container mx-auto py-3">
            <TituloConRegreso titulo="Gestión de Reportes" to="/admin" />

            {message && <p className="text-red-500">{message}</p>}

            {isLoading ? (
                <p className="text-center text-gray-600">Cargando reportes...</p>
            ) : reportes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {reportes.map((reporte) => (
                        <div key={reporte.id} className="bg-white p-4 rounded-lg shadow-md">
                            <div className="space-y-2">
                                <strong className="text-lg block">{reporte.nombre_reportante}</strong>
                                <p className="text-gray-700">{reporte.descripcion}</p>
                                <p className="text-gray-700">
                                    <strong>Número de Contacto:</strong> {reporte.numero_contacto || "No disponible"}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Dirección:</strong> {reporte.direccion}
                                </p>

                                <div className="flex flex-wrap gap-2 items-center">
                                    {reporte.ruta_foto && (
                                        <button
                                            className="px-3 py-1.5 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                                            onClick={() => handleShowImage(reporte.ruta_foto)}
                                        >
                                            <VisibilityIcon fontSize="small" /> Ver Imagen
                                        </button>
                                    )}
                                    <span className={`px-2 py-1 text-sm rounded ${reporte.estado_reporte === "pendiente"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-green-100 text-green-800"}`}>
                                        {reporte.estado_reporte}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No hay reportes disponibles.</p>
            )}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <button className="absolute top-2 right-2 text-gray-600" onClick={handleCloseModal}>✕</button>
                        {selectedImage && <img src={selectedImage} alt="Reporte" className="max-w-full h-auto" />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminReportesPage;
