import React, { useState } from 'react';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../../utils';

const RegisterLocalizadorModal = ({ show, onClose, onRegister, recolectores }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        recolector_id: null,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const newLocalizador = await response.json();
                onRegister(newLocalizador);
                showSuccessAlert('Éxito', 'Localizador registrado correctamente');
                onClose();
                setFormData({
                    username: '',
                    password: '',
                    recolector_id: null,
                });
            } else {
                showErrorAlert('Error', 'No se pudo registrar el localizador');
            }
        } catch (error) {
            showErrorAlert('Error', 'Error al conectar con la API');
        }
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Registrar Nuevo Localizador</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            username: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Recolector Asignado</label>
                                <select
                                    className="form-select"
                                    value={formData.recolector_id || ''}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            recolector_id: e.target.value || null,
                                        })
                                    }
                                    required
                                >
                                    <option value="" disabled>
                                        Seleccionar un recolector
                                    </option>
                                    {recolectores.map((recolector) => (
                                        <option key={recolector.id} value={recolector.id}>
                                            {recolector.nombre_recolector}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Registrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterLocalizadorModal;
