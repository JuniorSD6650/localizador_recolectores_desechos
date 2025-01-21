import React, { useState } from 'react';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../../utils';

const RegisterVehicleModal = ({ show, onClose, onRegister }) => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [zona, setZona] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (telefono && (!/^[0-9]{9}$/.test(telefono))) {
            showErrorAlert('Error', 'El número de teléfono debe ser numérico y tener exactamente 9 dígitos.');
            return;
        }

        const data = {
            nombre_recolector: nombre,
            telefono_recolector: telefono || null,
            zona_responsable: zona || null,
            estado: 'activo',
            organizacion_id: 1,
        };

        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}recolectores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                showSuccessAlert('¡Vehículo registrado!', 'El nuevo vehículo se ha registrado exitosamente.');
                onRegister({
                    ...result,
                    estado: result.estado || 'activo',
                    telefono_recolector: result.telefono_recolector || 'No disponible',
                    zona_responsable: result.zona_responsable || 'No asignada',
                });
                setNombre('');
                setTelefono('');
                setZona('');
                onClose();
            } else {
                showErrorAlert('Error', 'No se pudo registrar el vehículo.');
            }
        } catch (error) {
            showErrorAlert('Error', 'Hubo un problema al conectar con la API.');
        } finally {
            setLoading(false);
        }
    };

    const handleTelefonoChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setTelefono(value.slice(0, 9));
    };

    if (!show) return null;

    return (
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
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '8px',
                    maxWidth: '500px',
                    width: '100%',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h4 className="mb-4">Registrar Nuevo Vehículo</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre del Vehículo</label>
                        <input
                            type="text"
                            id="nombre"
                            className="form-control"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Ingrese el nombre del vehículo"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <input
                            type="text"
                            id="telefono"
                            className="form-control"
                            value={telefono}
                            onChange={handleTelefonoChange}
                            placeholder="Ingrese el teléfono (opcional)"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="zona" className="form-label">Zona Responsable</label>
                        <input
                            type="text"
                            id="zona"
                            className="form-control"
                            value={zona}
                            onChange={(e) => setZona(e.target.value)}
                            placeholder="Ingrese la zona responsable (opcional)"
                        />
                    </div>
                    <div className="text-end">
                        <button type="button" className="btn btn-secondary me-2" onClick={onClose} disabled={loading}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Registrando...' : 'Registrar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterVehicleModal;
