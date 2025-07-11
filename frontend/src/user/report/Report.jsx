import React, { useState, useRef, useEffect } from 'react';
import { API_BASE_URL, showSuccessAlert, showErrorAlert } from '../../utils';
import TituloConRegreso from '../../components/TituloConRegreso/TituloConRegreso';

const Report = () => {
    const [nombreReportante, setNombreReportante] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [numeroContacto, setNumeroContacto] = useState('');
    const [direccion, setDireccion] = useState('');

    const [foto, setFoto] = useState(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [availableCameras, setAvailableCameras] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState(null);

    const [ubicacion, setUbicacion] = useState(null);
    const [obteniendoUbicacion, setObteniendoUbicacion] = useState(false);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    const obtenerUbicacion = () => {
        if (!navigator.geolocation) {
            showErrorAlert('Error', 'Tu navegador no soporta geolocalización');
            return Promise.reject('Geolocalización no soportada');
        }

        setObteniendoUbicacion(true);

        const options = {
            enableHighAccuracy: false, // Cambiado a false para iOS
            timeout: 15000, // Aumentado a 15 segundos
            maximumAge: 300000 // 5 minutos de cache
        };

        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const ubicacionData = {
                        latitud: position.coords.latitude,
                        longitud: position.coords.longitude,
                        precision: position.coords.accuracy
                    };
                    setUbicacion(ubicacionData);
                    setObteniendoUbicacion(false);
                    resolve(ubicacionData);
                },
                (error) => {
                    let mensaje = 'Error al obtener la ubicación';
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            mensaje = 'No se dio permiso para obtener la ubicación';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            mensaje = 'La ubicación no está disponible';
                            break;
                        case error.TIMEOUT:
                            mensaje = 'Se agotó el tiempo de espera';
                            break;
                    }
                    showErrorAlert('Error', mensaje);
                    setObteniendoUbicacion(false);
                    reject(mensaje);
                },
                options
            );
        });
    };

    const getAvailableCameras = async () => {
        try {
            // Primero pide acceso a la cámara con preferencia environment (trasera)
            await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });

            const devices = await navigator.mediaDevices.enumerateDevices();
            const cameras = devices.filter(device => device.kind === 'videoinput');
            setAvailableCameras(cameras);

            // Intenta encontrar la cámara trasera
            const rearCamera = cameras.find(camera =>
                camera.label.toLowerCase().includes('back') ||
                camera.label.toLowerCase().includes('trasera') ||
                camera.label.toLowerCase().includes('rear') ||
                camera.label.toLowerCase().includes('environment')
            );

            if (rearCamera) {
                setSelectedCamera(rearCamera.deviceId);
            } else {
                // Si no encuentra específicamente una trasera, usa facingMode: 'environment'
                setSelectedCamera('environment');
            }
        } catch (error) {
            console.error('Error al enumerar cámaras:', error);
            showErrorAlert('Error', 'No se pudo acceder a la cámara');
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

            const constraints = {
                video: selectedCamera === 'environment'
                    ? {
                        facingMode: 'environment',
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    }
                    : {
                        deviceId: { exact: selectedCamera },
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    }
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);

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
            streamRef.current.getTracks().forEach((track) => track.stop());
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

        try {
            // Obtener ubicación antes de enviar el reporte
            const ubicacionActual = await obtenerUbicacion();

            const formData = new FormData();
            formData.append('nombre_reportante', nombreReportante);
            formData.append('descripcion', descripcion);
            formData.append('numero_contacto', numeroContacto);
            formData.append('direccion', direccion);
            formData.append('latitud', ubicacionActual.latitud.toString());
            formData.append('longitud', ubicacionActual.longitud.toString());
            if (foto) {
                formData.append('ruta_foto', foto);
            }

            const response = await fetch(`${API_BASE_URL}reportes/`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                showSuccessAlert('¡Reporte creado!', 'Tu reporte ha sido registrado exitosamente.');

                // Limpiar el formulario
                setNombreReportante('');
                setDescripcion('');
                setNumeroContacto('');
                setDireccion('');
                setFoto(null);
                setSelectedOption('');
                setUbicacion(null);
            } else {
                showErrorAlert('Error', 'No se pudo crear el reporte.');
            }
        } catch (error) {
            showErrorAlert('Error', 'Hubo un problema al enviar el reporte.');
            console.error(error);
        }
    };

    return (
        <div className=" container mx-auto text-center">


            <div className='container ml-auto mr-auto flex items-center justify-center min-h-screen mt-16'>


                <div className='w-full md:w-1/2 shadow-lg p-6'>

                    <h2 className='pb-12 text-3xl md:text-4xl font-bold text-customBlue  border-custom'>Realiza el reporte a la basura acumulada</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="nombreReportante" className="block text-sm font-medium text-gray-700 text-left">
                                    Nombre del Reportante:
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-eco-blue focus:border-eco-blue sm:text-sm"
                                    id="nombreReportante"
                                    value={nombreReportante}
                                    onChange={(e) => setNombreReportante(e.target.value)}
                                    placeholder="Ingrese su nombre completo"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="numeroContacto" className="block text-sm font-medium text-gray-700 text-left">
                                    Número de Contacto:
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-eco-blue focus:border-eco-blue sm:text-sm"
                                    id="numeroContacto"
                                    value={numeroContacto}
                                    onChange={handlePhoneChange}
                                    placeholder="Ingrese un número de 9 dígitos"
                                    maxLength={9}
                                    pattern="[0-9]{9}"
                                    title="Debe ingresar exactamente 9 números"
                                />
                                {numeroContacto && numeroContacto.length !== 9 && (
                                    <small className="text-red-500">El número debe tener 9 dígitos</small>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 text-left">
                                Dirección:
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-eco-blue focus:border-eco-blue sm:text-sm"
                                id="direccion"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                placeholder="Ingrese la dirección del reporte"
                            />
                        </div> */}

                        <div>
                            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 text-left">
                                Descripción del Reporte:
                            </label>
                            <textarea
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-eco-blue focus:border-eco-blue sm:text-sm"
                                id="descripcion"
                                rows="5"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                placeholder="Describa el motivo de su reporte ..."
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Foto </label>
                            <div className="flex p-4 gap-y-20  gap-2 justify-center items-center">

                                <button
                                    type="button"
                                    className={`w-auto sm:w-auto px-4 py-2 rounded-md ${selectedOption === 'camera' ? 'bg-customGreen text-white' : 'bg-gray-300 text-gray-700'
                                        }`}
                                    onClick={() => handleOptionChange('camera')}
                                >
                                    Usar Cámara
                                </button>
                            </div>

                            {selectedOption === 'file' && (
                                <div className="mt-2">
                                    <input
                                        type="file"
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer border rounded-md p-2"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    {foto && (
                                        <div className="mt-2">
                                            <img
                                                src={URL.createObjectURL(foto)}
                                                alt="Vista previa"
                                                className="max-h-52 rounded-md"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {selectedOption === 'camera' && (
                                <div className="mt-2">
                                    {availableCameras.length > 1 && !(/Android|iPhone/i.test(navigator.userAgent)) && (
                                        <div className="mb-2">
                                            <select
                                                className=" mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-eco-blue focus:border-eco-blue sm:text-sm"
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
                                        className="w-full p-4 max-w-lg mx-auto rounded-md"
                                    ></video>

                                    {isCameraActive && (
                                        <button
                                            type="button"
                                            className="w-auto mt-2 px-4 py-2 bg-customGreen text-white rounded-md"
                                            onClick={takePhoto}
                                        >
                                            Tomar Foto
                                        </button>
                                    )}
                                    <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                                </div>
                            )}

                            {foto && selectedOption === '' && (
                                <div className="mt-2 text-center">
                                    <p>Foto capturada:</p>
                                    <img
                                        src={URL.createObjectURL(foto)}
                                        alt="Foto capturada"
                                        className="max-h-52 rounded-md mx-auto"
                                    />
                                    <button
                                        type="button"
                                        className=" w-auto mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
                                        onClick={() => setFoto(null)}
                                    >
                                        Eliminar Foto
                                    </button>
                                </div>
                            )}
                        </div>

                        <button type="submit" className="w-64 px-4 py-2 bg-customGreen text-white rounded-md">
                            Enviar Reporte
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Report;
