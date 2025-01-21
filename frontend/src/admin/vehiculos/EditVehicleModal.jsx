import React, { useState, useEffect } from 'react';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../../utils';

const EditVehicleModal = ({ show, onClose, onUpdate, vehicle }) => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [zona, setZona] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (vehicle) {
            setNombre(vehicle.nombre_recolector);
            setTelefono(vehicle.telefono_recolector || '');
            setZona(vehicle.zona_responsable || '');
        }
    }, [vehicle]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            nombre_recolector: nombre,
            telefono_recolector: telefono || null,
            zona_responsable: zona || null,
        };

        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}recolectores/${vehicle.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                showSuccessAlert('¡Vehículo actualizado!', 'El vehículo se ha actualizado exitosamente.');
                onUpdate(result.recolector);
                onClose();
            }
            else {
                showErrorAlert('Error', 'No se pudo actualizar el vehículo.');
            }
        } catch (error) {
            showErrorAlert('Error', 'Hubo un problema al conectar con la API.');
        } finally {
            setLoading(false);
        }
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
                <h4 className="mb-4">Editar Vehículo</h4>
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
                            onChange={(e) => setTelefono(e.target.value)}
                            placeholder="Ingrese el teléfono (opcional)"
                            pattern="\d{0,9}"
                            title="Ingrese solo números (máximo 9 dígitos)"
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
                        <button type="submit" className="btn btn-primary mb-2" disabled={loading}>
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                        <button type="button" className="btn btn-secondary " onClick={onClose} disabled={loading}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditVehicleModal;
