import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL, calculateTimeAgo } from '../../utils';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import UpdateIcon from '@mui/icons-material/Update';
import TituloConRegreso from '../../components/TituloConRegreso/TituloConRegreso';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix íconos Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [message, setMessage] = useState('');
  const [ubicacion, setUbicacion] = useState(null);
  const [userZoom, setUserZoom] = useState(15);

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // 🔹 Inicializar mapa solo una vez
  useEffect(() => {
    if (!ubicacion?.latitud || !ubicacion?.longitud || mapInstanceRef.current) return;

    const lat = parseFloat(ubicacion.latitud);
    const lng = parseFloat(ubicacion.longitud);

    // Crear mapa una sola vez
    const map = L.map(mapRef.current).setView([lat, lng], userZoom);

    // Definición de las capas del mapa
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });

    // Capa satélite/relieve de Esri (Similar a la usada en MapModal)
    const esriSat = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      }
    );
    
    // **MODIFICACIÓN AÑADIDA:**
    // Añadir la capa base OpenStreetMap por defecto
    osm.addTo(map);

    // Añadir el control de capas para poder cambiar entre OSM y Satélite
    L.control.layers(
      {
        'Mapa Estándar': osm,
        'Satélite / Relieve': esriSat, // Opción de relieve
      }
    ).addTo(map);

    const marker = L.marker([lat, lng])
      .addTo(map)
      .bindPopup(`Ubicación actual del vehículo<br/>Lat: ${lat}<br/>Long: ${lng}`)
      .openPopup();

    map.on('zoomend', () => {
      setUserZoom(map.getZoom());
    });

    mapInstanceRef.current = map;
    markerRef.current = marker;

    // Ajustar tamaño al renderizar
    setTimeout(() => map.invalidateSize(), 200);
  }, [ubicacion]);

  // 🔹 Actualizar marcador y vista cuando cambie la ubicación
  useEffect(() => {
    if (!mapInstanceRef.current || !markerRef.current || !ubicacion) return;

    const { latitud, longitud } = ubicacion;
    markerRef.current
      .setLatLng([latitud, longitud])
      .setPopupContent(
        `Ubicación actual del vehículo<br/>Lat: ${latitud}<br/>Long: ${longitud}`
      );

    // No reinicia el zoom, solo mueve el centro suavemente
    mapInstanceRef.current.panTo([latitud, longitud], { animate: true, duration: 0.5 });
  }, [ubicacion]);

  // 🚚 Obtener detalles del vehículo
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(API_BASE_URL + `recolectores/${id}`);
        const data = await response.json();
        if (response.ok) setVehicle(data);
        else setMessage('No se pudo obtener los detalles del recolector');
      } catch {
        setMessage('Error al conectar con la API');
      }
    };
    fetchVehicle();
  }, [id]);

  // 📍 Obtener ubicación periódicamente
  useEffect(() => {
    const fetchUbicacion = async () => {
      try {
        const response = await fetch(API_BASE_URL + `recolectores/${id}/ubicacion`);
        const data = await response.json();
        if (response.ok && data.latitud && data.longitud) {
          setUbicacion({
            latitud: parseFloat(data.latitud),
            longitud: parseFloat(data.longitud),
            fecha_ubicacion_actualizada: data.fecha_ubicacion_actualizada,
          });
        }
      } catch {}
    };

    fetchUbicacion();
    const interval = setInterval(fetchUbicacion, 2000);
    return () => clearInterval(interval);
  }, [id]);

  // ⚠️ Estados de carga / error
  if (message) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{message}</p>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  // 🧭 Render principal
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen mt-16">
      <TituloConRegreso titulo="Detalles" to="/recolectores" />

      <div className="w-full shadow-lg p-6">
        {/* Datos del vehículo */}
        <div className="flex flex-col items-center mb-4">
          <div className="flex items-center mb-2">
            <LocalShippingIcon
              className={vehicle.estado_operativo === 'operativo' ? 'text-green-500' : 'text-red-500'}
              style={{ fontSize: '2.5rem' }}
            />
            <span
              className={`ml-2 px-2 py-1 rounded ${
                vehicle.estado_operativo === 'operativo'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {vehicle.estado_operativo === 'operativo' ? 'Operativo' : 'Inoperativo'}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{vehicle.nombre_recolector}</h1>
            <h2 className="text-xl text-gray-600">{vehicle.zonas_asignadas}</h2>
          </div>
        </div>

        {/* Datos adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {vehicle.ubicacion_enlace && (
            <div className="flex flex-col items-center p-4 bg-white rounded shadow">
              <LocationOnIcon className="text-blue-500 mb-2" />
              <a
                href={vehicle.ubicacion_enlace}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Localizar Vehículo
              </a>
            </div>
          )}

          {ubicacion?.fecha_ubicacion_actualizada ? (
            <div className="flex flex-col items-center p-4 bg-white rounded shadow">
              <UpdateIcon className="text-blue-500 mb-2" />
              <div className="text-center">
                <span className="block text-gray-600">Última actualización</span>
                <span className="block text-gray-800">
                  {calculateTimeAgo(ubicacion.fecha_ubicacion_actualizada)}
                </span>
              </div>
            </div>
          ) : null}
        </div>

        {/* 🗺️ Mapa */}
        <div className="w-full" style={{ height: '420px', position: 'relative' }}>
          <div
            ref={mapRef}
            className="w-full h-full rounded"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;