import React, { useState, useRef } from 'react';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../utils';
import TituloConRegreso from '../components/TituloConRegreso';

const Report = () => {
    const [nombreReportante, setNombreReportante] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [numeroContacto, setNumeroContacto] = useState('');
    const [foto, setFoto] = useState(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [cameraPhoto, setCameraPhoto] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        const onlyNums = value.replace(/[^0-9]/g, '').slice(0, 9);
        setNumeroContacto(onlyNums);
    };

    const startCamera = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        setIsCameraActive(true);
                    }
                })
                .catch((err) => {
                    console.error('Error al acceder a la cámara', err);
                });
        }
    };

    const takePhoto = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');
        setCameraPhoto(imageData);
        setIsCameraActive(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (numeroContacto && numeroContacto.length !== 9) {
            showErrorAlert('Error', 'El número de teléfono debe tener 9 dígitos');
            return;
        }

        const formData = new FormData();
        formData.append('nombre_reportante', nombreReportante);
        formData.append('descripcion', descripcion);
        formData.append('numero_contacto', numeroContacto);
        if (cameraPhoto) {
            formData.append('foto', cameraPhoto);
        } else if (foto) {
            formData.append('foto', foto);
        }

        try {
            const response = await fetch(API_BASE_URL + '/reportes', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                showSuccessAlert('¡Reporte creado!', 'Tu reporte ha sido registrado exitosamente.');
                console.log(result);

                // Limpiar campos del formulario
                setNombreReportante('');
                setDescripcion('');
                setNumeroContacto('');
                setFoto(null);
                setCameraPhoto(null);
            } else {
                showErrorAlert('Error', 'No se pudo crear el reporte.');
            }
        } catch (error) {
            showErrorAlert('Error', 'Hubo un problema al conectar con la API.');
            console.error(error);
        }
    };

    return (
        <div className="container text-center py-3">
            <TituloConRegreso titulo="Formulario de Reporte" to="/" />
            <form onSubmit={handleSubmit}>
                {/* Formulario */}
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="nombreReportante" className="form-label">Nombre del Reportante</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombreReportante"
                            value={nombreReportante}
                            onChange={(e) => setNombreReportante(e.target.value)}
                            placeholder="Ingrese su nombre completo"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="numeroContacto" className="form-label">Número de Contacto</label>
                        <input
                            type="text"
                            className="form-control"
                            id="numeroContacto"
                            value={numeroContacto}
                            onChange={handlePhoneChange}
                            placeholder="Ingrese un número de 9 dígitos"
                            maxLength={9}
                            pattern="[0-9]{9}"
                            title="Debe ingresar exactamente 9 números"
                        />
                        {numeroContacto && numeroContacto.length !== 9 && (
                            <small className="text-danger">El número debe tener 9 dígitos</small>
                        )}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción del Reporte</label>
                    <textarea
                        className="form-control"
                        id="descripcion"
                        rows="5"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        placeholder="Describa la distorsión encontrada"
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Cargar Foto (opcional)</label><br />
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setFoto(e.target.files[0])}
                    />
                </div>
                <div className="mb-3">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={startCamera}
                        disabled={isCameraActive}
                    >
                        {isCameraActive ? 'Cámara Activada' : 'Usar Cámara'}
                    </button>
                    {isCameraActive && (
                        <div>
                            <video ref={videoRef} autoPlay width="100%" height="auto"></video>
                            <button type="button" className="btn btn-info mt-2" onClick={takePhoto}>
                                Tomar Foto
                            </button>
                            <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
                        </div>
                    )}
                    {cameraPhoto && (
                        <div>
                            <h3>Foto tomada:</h3>
                            <img src={cameraPhoto} alt="Foto tomada" width="200" />
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">
                    Enviar Reporte
                </button>
            </form>
        </div>
    );
};

export default Report;
