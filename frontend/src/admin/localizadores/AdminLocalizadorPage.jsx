import React, { useState, useEffect } from 'react';
import { API_BASE_URL, showSuccessAlert, showErrorAlert, showCustomAlert } from '../../utils';
import TituloConRegreso from '../../components/TituloConRegreso';
import RegisterLocalizadorModal from './RegisterLocalizadorModal';

const AdminLocalizadorPage = () => {
    const [localizadores, setLocalizadores] = useState([]);
    const [recolectores, setRecolectores] = useState([]);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchLocalizadores = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}usuarios`);
                if (response.ok) {
                    const data = await response.json();
                    setLocalizadores(data);
                } else {
                    setMessage('No se pudieron cargar los localizadores');
                }
            } catch (error) {
                setMessage('Error al conectar con la API');
            }
        };

        const fetchRecolectores = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}recolectores/list`);
                if (response.ok) {
                    const data = await response.json();
                    setRecolectores(data);
                }
            } catch (error) {
                console.error('Error al cargar recolectores:', error);
            }
        };

        fetchLocalizadores();
        fetchRecolectores();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = await showCustomAlert({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer. ¿Deseas eliminar este localizador?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (confirmed.isConfirmed) {
            try {
                const response = await fetch(`${API_BASE_URL}usuarios/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setLocalizadores((prev) => prev.filter((localizador) => localizador.id !== id));
                    showSuccessAlert('Eliminado', 'El localizador se eliminó con éxito.');
                } else {
                    showErrorAlert('Error', 'No se pudo eliminar el localizador.');
                }
            } catch (error) {
                showErrorAlert('Error', 'Hubo un problema al conectar con la API.');
            }
        }
    };

    const handleRegister = (newLocalizador) => {
        const { user } = newLocalizador; // Extrae solo el objeto del usuario
        setLocalizadores((prev) => [user, ...prev]); // Añade el nuevo usuario al inicio
    };

    return (
        <div className="container my-5 text-center">
            <TituloConRegreso titulo="Gestión de Localizadores" to="/admin" />

            {message && <p className="text-danger">{message}</p>}

            <div className="mb-3 text-end">
                <button
                    className="btn-register"
                    onClick={() => setShowModal(true)}
                >
                    Nuevo Localizador
                </button>
            </div>

            {localizadores.length === 0 ? (
                <p className="text-center">No hay localizadores registrados</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-hover text-center">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Recolector Asignado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {localizadores.map((localizador) => (
                                <tr key={localizador.id}>
                                    <td>{localizador.id}</td>
                                    <td>{localizador.username}</td>
                                    <td>{localizador.nombre_recolector || 'No asignado'}</td>
                                    <td>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(localizador.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <RegisterLocalizadorModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onRegister={handleRegister}
                recolectores={recolectores}
            />
        </div>
    );
};

export default AdminLocalizadorPage;
