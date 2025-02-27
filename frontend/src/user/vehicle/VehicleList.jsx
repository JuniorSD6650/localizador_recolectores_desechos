import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../utils';
import VehicleCard from '../../components/VehicleCard/VehicleCard';
import TituloConRegreso from '../../components/TituloConRegreso/TituloConRegreso';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [zonas, setZonas] = useState([]);
    const [message, setMessage] = useState('');
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Zonas');
    const [dropdownOpen, setDropdownOpen] = useState(false);


    const [selectedZones, setSelectedZones] = useState(() => {
        const saved = localStorage.getItem('selectedZones');
        return saved ? JSON.parse(saved) : [];
    });

    const handleZoneToggle = (zonaId, zonaNombre) => {
        setSelectedZones(prev => {
            const isSelected = prev.includes(zonaId);
            const newSelected = isSelected
                ? prev.filter(id => id !== zonaId)
                : [...prev, zonaId];

            localStorage.setItem('selectedZones', JSON.stringify(newSelected));
            return newSelected;
        });
    };

    const clearSelectedZones = () => {
        setSelectedZones([]);
        localStorage.removeItem('selectedZones');
    };

    // Fetch de vehículos
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch(API_BASE_URL + 'recolectores/');
                const data = await response.json();

                if (response.ok && Array.isArray(data.recolectores)) {
                    setVehicles(data.recolectores);
                } else {
                    setVehicles([]);
                    setMessage('No se pudieron cargar los vehículos');
                }
            } catch (error) {
                setVehicles([]);
                setMessage('Error al conectar con la API');
            }
        };

        fetchVehicles();
    }, []);

    const filteredVehicles = Array.isArray(vehicles)
        ? vehicles.filter((vehicle) => {
            const matchesSearch = vehicle.nombre_recolector
                .toLowerCase()
                .includes(searchText.toLowerCase());
            const matchesZones = selectedZones.length === 0 ||
                vehicle.zonas_asignadas.some(zona =>
                    selectedZones.includes(zona.id)
                );
            return matchesSearch && matchesZones;
        })
        : [];

    // Fetch de zonas
    useEffect(() => {
        const fetchZonas = async () => {
            try {
                const response = await fetch(API_BASE_URL + 'zonas/list');
                const data = await response.json();

                if (Array.isArray(data)) {
                    setZonas(data);
                } else {
                    setMessage('No se pudieron cargar las zonas.');
                }
            } catch (error) {
                setMessage('Error al conectar con el servidor de zonas.');
            }
        };

        fetchZonas();
    }, []);



    const handleSearchChange = (e) => {

        setSearchText(e.target.value);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setDropdownOpen(false);
    };

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log('Buscando:', searchText);
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen mt-16">
            <TituloConRegreso titulo="Vehículos recolectores" to="/" />

            <div className='min-h-screen pt-11'>
                {/* Zonas Cards Section */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text- font-normal pr-4">Selecciona la zona en la que vives, para encontrar tu recolector:</h4>
                        {selectedZones.length > 0 && (
                            <button
                                onClick={clearSelectedZones}
                                className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50"
                            >
                                Limpiar selección
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {zonas.map((zona) => (
                            <div
                                key={zona.id}
                                onClick={() => handleZoneToggle(zona.id, zona.nombre)}
                                className={`
                                    cursor-pointer p-4 rounded-lg border-2 transition-all
                                    ${selectedZones.includes(zona.id)
                                        ? 'border-customGreen bg-green-50'
                                        : 'border-gray-200 hover:border-green-200'}
                                `}
                            >

                                <p className="text-sm text-customGray">
                                    {zona.nombre || 'Sin descripción'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Search Section */}
                <div className="max-w-lg mx-auto mb-8">
                    <div className="relative">
                        <input
                            type="search"
                            className="w-full p-4 pr-12 border rounded-lg"
                            placeholder="Buscar recolector por nombre..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Vehicles List */}
                {message && <p className="text-red-500">{message}</p>}

                {filteredVehicles.length === 0 ? (
                    <p className="text-center text-gray-500">No se encontraron vehículos</p>
                ) : (
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                        {filteredVehicles.map((vehicle) => (
                            <div key={vehicle.id} className="w-full">
                                <Link to={`/recolectores/${vehicle.id}`} className="no-underline">
                                    <VehicleCard
                                        vehicleName={vehicle.nombre_recolector}
                                        zone={vehicle.zonas_asignadas.map(z => z.nombre).join(', ')}
                                        status={vehicle.estado_operativo}
                                        iconColor={vehicle.estado_operativo}
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VehicleList;
