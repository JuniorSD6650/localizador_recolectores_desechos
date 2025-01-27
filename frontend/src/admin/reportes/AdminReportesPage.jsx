import React, { useState, useEffect } from 'react';
import { API_BASE_URL, BASE_URL, showSuccessAlert, showErrorAlert, showCustomAlert } from '../../utils';
import TituloConRegreso from '../../components/TituloConRegreso/TituloConRegreso';
import VisibilityIcon from '@mui/icons-material/Visibility';

const AdminReportesPage = () => {
    const [reportes, setReportes] = useState([]);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        const fetchReportes = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}reportes`);
                const data = await response.json();

                if (response.ok) {
                    setReportes(data);
                } else {
                    setMessage('No se pudieron cargar los reportes');
                }
            } catch (error) {
                setMessage('Error al conectar con la API');
            }
        };

        fetchReportes();
    }, []);

    const handleEstadoChange = async (id, nuevoEstado) => {
        try {
            const confirmed = await showCustomAlert({
                title: '¿Estás seguro?',
                text: `¿Quieres marcar este reporte como ${nuevoEstado}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, continuar',
                cancelButtonText: 'Cancelar',
            });

            if (confirmed?.isConfirmed) { 
                const response = await fetch(`${API_BASE_URL}reportes/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ estado: nuevoEstado }),
                });

                if (response.ok) {
                    setReportes((prevReportes) =>
                        prevReportes.map((reporte) =>
                            reporte.id === id ? { ...reporte, estado: nuevoEstado } : reporte
                        )
                    );
                    showSuccessAlert('Estado actualizado', `El reporte se marcó como ${nuevoEstado}.`);
                } else {
                    const errorData = await response.json();
                    showErrorAlert('Error', errorData.message || 'No se pudo actualizar el estado del reporte.');
                }
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
            showErrorAlert('Error', 'Hubo un problema al conectar con la API.');
        }
    };

    const handleEliminar = async (id) => {
        try {
            const confirmed = await showCustomAlert({
                title: '¿Estás seguro?',
                text: 'Esta acción no se puede deshacer. ¿Deseas eliminar este reporte?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            });

            if (confirmed?.isConfirmed) { 
                const response = await fetch(`${API_BASE_URL}reportes/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setReportes((prevReportes) => prevReportes.filter((reporte) => reporte.id !== id));
                    showSuccessAlert('Eliminado', 'El reporte se eliminó con éxito.');
                } else {
                    const errorData = await response.json();
                    showErrorAlert('Error', errorData.message || 'No se pudo eliminar el reporte.');
                }
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
            showErrorAlert('Error', 'Hubo un problema al conectar con la API.');
        }
    };

    const handleShowImage = (rutaFoto) => {
        setSelectedImage(`${BASE_URL}${rutaFoto}`);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedImage('');
    };

    return (
        <div className="container py-3">
            <TituloConRegreso titulo="Gestión de Reportes" to="/admin" />

            {message && <p className="text-danger">{message}</p>}

            <div className="list-group mt-4">
                {reportes.length === 0 ? (
                    <p>No hay reportes disponibles</p>
                ) : (
                    reportes.map((reporte) => (
                        <div key={reporte.id} className="list-group-item">
                            <div className="row g-3">
                                <div className="col-12">
                                    <strong className="fs-5 d-block">{reporte.nombre_reportante}</strong>
                                    <p className="mb-2">{reporte.descripcion}</p>
                                    <p className="mb-2">
                                        <strong>Número de Contacto:</strong>{' '}
                                        {reporte.numero_contacto ? reporte.numero_contacto : 'Sin número disponible'}
                                    </p>

                                    <div className="d-flex flex-wrap gap-2 align-items-center">
                                        {reporte.ruta_foto && (
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => handleShowImage(reporte.ruta_foto)}
                                            >
                                                <VisibilityIcon /> Ver Imagen
                                            </button>
                                        )}
                                        <span className={`badge ${reporte.estado === 'pendiente' ? 'bg-warning' : 'bg-success'}`}>
                                            {reporte.estado}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="d-flex flex-wrap gap-2">
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => handleEstadoChange(reporte.id, 'revisado')}
                                            disabled={reporte.estado === 'revisado'}
                                        >
                                            Marcar como Revisado
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleEliminar(reporte.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showModal && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                    }}
                    onClick={handleCloseModal}
                >
                    <div
                        style={{
                            position: 'relative',
                            backgroundColor: '#fff',
                            padding: '20px',
                            borderRadius: '8px',
                            maxWidth: '90%',
                            maxHeight: '90%',
                            overflow: 'auto',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={handleCloseModal}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: 'none',
                                border: 'none',
                                fontSize: '18px',
                                cursor: 'pointer',
                            }}
                        >
                            ✕
                        </button>
                        {selectedImage && (
                            <img
                                src={selectedImage}
                                alt="Reporte"
                                style={{
                                    maxWidth: '90%',
                                    maxHeight: 'calc(90vh - 90px)',
                                    display: 'block',
                                    margin: '0 auto',
                                }}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminReportesPage;
