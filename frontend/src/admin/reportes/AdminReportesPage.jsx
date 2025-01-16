// src/admin/Reportes/AdminReportesPage.jsx
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../utils';
import TituloConRegreso from '../../components/TituloConRegreso';

const AdminReportesPage = () => {
    const [reportes, setReportes] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchReportes = async () => {
            try {
                const response = await fetch(API_BASE_URL + 'reportes');
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

    return (
        <div className="container my-5">
            <TituloConRegreso titulo="Gestión de Reportes" to="/admin" />

            <p className="text-center">Aquí podrás ver y gestionar todos los reportes.</p>

            {message && <p className="text-danger">{message}</p>}

            <div className="list-group mt-4">
                {reportes.length === 0 ? (
                    <p>No hay reportes disponibles</p>
                ) : (
                    reportes.map((reporte) => (
                        <div key={reporte.id} className="list-group-item">
                            <strong>{reporte.nombre_reportante}</strong>
                            <p>{reporte.descripcion}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminReportesPage;
