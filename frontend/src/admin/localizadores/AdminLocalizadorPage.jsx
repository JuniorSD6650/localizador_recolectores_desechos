import React, { useState, useEffect } from 'react';
import { API_BASE_URL, showSuccessAlert, showErrorAlert, showCustomAlert } from '../../utils';
import TituloConRegreso from '../../components/TituloConRegreso/TituloConRegreso';
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
        const { user } = newLocalizador;
        setLocalizadores((prev) => [user, ...prev]);
    };

    return (
        <div className="max-w-full px-4 my-5 text-center">
            <TituloConRegreso titulo="Gestión de Localizadores" to="/admin" />

            {message && <p className="text-red-500">{message}</p>}

            <div className="flex justify-end">
                <button
                    className="bg-blue-500 text-white text-sm p-2 rounded-md hover:bg-blue-600 mb-1"
                    style={{ width: 'auto' }}
                    onClick={() => setShowModal(true)}
                >
                    Nuevo Localizador
                </button>
            </div>

            {localizadores.length === 0 ? (
                <p className="text-center">No hay localizadores registrados</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 border-b">ID</th>
                                <th className="px-6 py-3 border-b">Username</th>
                                <th className="px-6 py-3 border-b">Recolector Asignado</th>
                                <th className="px-6 py-3 border-b">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {localizadores.map((localizador) => (
                                <tr key={localizador.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 border-b">{localizador.id}</td>
                                    <td className="px-6 py-4 border-b">{localizador.username}</td>
                                    <td className="px-6 py-4 border-b">{localizador.nombre_recolector || 'No asignado'}</td>
                                    <td className="px-6 py-4 border-b">
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
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