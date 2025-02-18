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

    // Fetch de zonas
    useEffect(() => {
        const fetchZonas = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/zonas/list');
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

    const filteredVehicles = Array.isArray(vehicles)
        ? vehicles.filter((vehicle) => {
            const matchesSearch = vehicle.nombre_recolector.toLowerCase().includes(searchText.toLowerCase());
            const matchesCategory = selectedCategory === 'Zonas' || vehicle.zonas_asignadas.some(zona => zona.nombre === selectedCategory);
            return matchesSearch && matchesCategory;
        })
        : [];

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
            <div className='min-h-screen pt-11'>
                <form className="max-w-lg mx-auto mb-4" onSubmit={handleSearchSubmit}>
                    <div className="flex relative">
                        <button
                            id="dropdown-button"
                            type="button"
                            className="items-center px-3 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                            onClick={handleDropdownToggle}
                            aria-expanded={dropdownOpen}
                            aria-haspopup="true"
                        >
                            {selectedCategory}
                            <ArrowDropDownIcon />
                        </button>
                        {dropdownOpen && (
                            <div
                                id="dropdown"
                                className="absolute z-50 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 top-full mt-1"
                            >
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                                    <li>
                                        <button type="button" className="w-full px-4 py-2" onClick={() => handleCategorySelect('Zonas')}>
                                            Zonas
                                        </button>
                                    </li>
                                    {zonas.map((zona) => (
                                        <li key={zona.id}>
                                            <button type="button" className="w-full px-4 py-2" onClick={() => handleCategorySelect(zona.nombre)}>
                                                {zona.nombre}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <input
                            type="search"
                            id="search-dropdown"
                            className="block p-2.5 w-full"
                            placeholder="Buscar recolector"
                            value={searchText}
                            onChange={handleSearchChange}
                            required
                        />
                        <button type="submit" className="items-center p-2 text-white bg-blue-700">
                            <SearchIcon className="w-5 h-5" />
                        </button>
                    </div>
                </form>

                {message && <p className="text-red-500">{message}</p>}

                {filteredVehicles.length === 0 ? (
                    <p>No se encontraron vehículos</p>
                ) : (
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
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
