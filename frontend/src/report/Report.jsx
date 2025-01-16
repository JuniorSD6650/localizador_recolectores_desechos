import React, { useState, useRef } from 'react';
import { API_BASE_URL } from '../utils';

const Report = () => {
    const [nombreReportante, setNombreReportante] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [numeroContacto, setNumeroContacto] = useState('');
    const [foto, setFoto] = useState(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [cameraPhoto, setCameraPhoto] = useState(null);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

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
                alert('Reporte creado con éxito!');
                console.log(result);
            } else {
                alert('Error al crear el reporte');
            }
        } catch (error) {
            alert('Error al conectar con la API');
            console.error(error);
        }
    };

    return (
        <div className="container text-center my-5">
            <h1>Formulario de Reporte</h1>
            <p>Aquí podrás reportar información relacionada con la aplicación.</p>

            <form onSubmit={handleSubmit}>
                {/* Fila con Nombre y Número de Contacto */}
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="nombreReportante" className="form-label">Nombre del Reportante</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombreReportante"
                            value={nombreReportante}
                            onChange={(e) => setNombreReportante(e.target.value)}
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
                            onChange={(e) => setNumeroContacto(e.target.value)}
                        />
                    </div>
                </div>

                {/* Descripción con mayor espacio */}
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea
                        className="form-control"
                        id="descripcion"
                        rows="5"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    ></textarea>
                </div>

                {/* Opción para cargar o tomar foto */}
                <div className="mb-3">
                    <label className="form-label">Cargar Foto</label><br />
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setFoto(e.target.files[0])}
                    />
                </div>

                {/* Opción para tomar una foto */}
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
