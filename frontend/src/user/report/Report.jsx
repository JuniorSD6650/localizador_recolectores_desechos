import React, { useState, useRef, useEffect } from 'react';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../../utils';
import TituloConRegreso from '../../components/TituloConRegreso/TituloConRegreso';

const Report = () => {
    const [nombreReportante, setNombreReportante] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [numeroContacto, setNumeroContacto] = useState('');
    const [foto, setFoto] = useState(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [availableCameras, setAvailableCameras] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState(null);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    const getAvailableCameras = async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const cameras = devices.filter(device => device.kind === 'videoinput');
            setAvailableCameras(cameras);

            const rearCamera = cameras.find(camera =>
                camera.label.toLowerCase().includes('back') ||
                camera.label.toLowerCase().includes('trasera') ||
                camera.label.toLowerCase().includes('rear')
            );

            if (rearCamera) {
                setSelectedCamera(rearCamera.deviceId);
            } else if (cameras.length > 0) {
                setSelectedCamera(cameras[0].deviceId);
            }
        } catch (error) {
            console.error('Error al enumerar cámaras:', error);
        }
    };

    const startCamera = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            showErrorAlert('Error', 'Tu navegador no soporta la API de la cámara');
            return;
        }

        try {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }

            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    deviceId: selectedCamera ? { exact: selectedCamera } : undefined,
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
                setIsCameraActive(true);
            }
        } catch (err) {
            console.error('Error al acceder a la cámara', err);
            showErrorAlert('Error', 'No se pudo acceder a la cámara');
            setSelectedOption('');
        }
    };

    useEffect(() => {
        getAvailableCameras();
        return () => {
            stopCamera();
        };
    }, []);

    useEffect(() => {
        if (selectedCamera && selectedOption === 'camera') {
            startCamera();
        }
    }, [selectedCamera]);

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        const onlyNums = value.replace(/[^0-9]/g, '').slice(0, 9);
        setNumeroContacto(onlyNums);
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setIsCameraActive(false);
    };

    const takePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
            setFoto(new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' }));
        }, 'image/jpeg', 0.8);

        stopCamera();
        setSelectedOption('');
    };

    const handleOptionChange = (option) => {
        if (option === selectedOption) return;

        if (selectedOption === 'camera') {
            stopCamera();
        }
        if (selectedOption === 'file') {
            setFoto(null);
        }

        setSelectedOption(option);

        if (option === 'camera') {
            startCamera();
        }
    };

    const handleCameraChange = (deviceId) => {
        setSelectedCamera(deviceId);
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFoto(file);
        }
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

        if (foto) {
            formData.append('foto', foto);
        }

        try {
            const response = await fetch(`${API_BASE_URL}/reportes`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                showSuccessAlert('¡Reporte creado!', 'Tu reporte ha sido registrado exitosamente.');
                console.log(result);

                setNombreReportante('');
                setDescripcion('');
                setNumeroContacto('');
                setFoto(null);
                setSelectedOption('');
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
                    <label className="form-label d-block">Foto (opcional)</label>
                    <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center align-items-center">
                        <button
                            type="button"
                            className={`btn ${selectedOption === 'file' ? 'btn-primary' : 'btn-secondary'} w-100 w-sm-auto`}
                            onClick={() => handleOptionChange('file')}
                        >
                            Subir Archivo
                        </button>
                        <button
                            type="button"
                            className={`btn ${selectedOption === 'camera' ? 'btn-primary' : 'btn-secondary'} w-100 w-sm-auto`}
                            onClick={() => handleOptionChange('camera')}
                        >
                            Usar Cámara
                        </button>
                    </div>

                    {selectedOption === 'file' && (
                        <div className="mt-2">
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {foto && (
                                <div className="mt-2">
                                    <img
                                        src={URL.createObjectURL(foto)}
                                        alt="Vista previa"
                                        className="img-thumbnail"
                                        style={{ maxHeight: '200px' }}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {selectedOption === 'camera' && (
                        <div className="mt-2">
                            {availableCameras.length > 1 && (
                                <div className="mb-2">
                                    <select
                                        className="form-select w-auto mx-auto"
                                        value={selectedCamera}
                                        onChange={(e) => handleCameraChange(e.target.value)}
                                    >
                                        {availableCameras.map((camera, index) => (
                                            <option key={camera.deviceId} value={camera.deviceId}>
                                                {camera.label || `Cámara ${index + 1}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="w-100"
                                style={{ maxWidth: '640px' }}
                            ></video>
                            {isCameraActive && (
                                <button
                                    type="button"
                                    className="btn btn-info mt-2"
                                    onClick={takePhoto}
                                >
                                    Tomar Foto
                                </button>
                            )}
                            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                        </div>
                    )}

                    {foto && selectedOption === '' && (
                        <div className="mt-2">
                            <p>Foto capturada:</p>
                            <img
                                src={URL.createObjectURL(foto)}
                                alt="Foto capturada"
                                className="img-thumbnail"
                                style={{ maxHeight: '200px' }}
                            />
                            <button
                                type="button"
                                className="btn btn-danger d-block mt-2 mx-auto"
                                onClick={() => setFoto(null)}
                            >
                                Eliminar Foto
                            </button>
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
