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
    const [message, setMessage] = useState('');
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch(API_BASE_URL + 'recolectores/');
                const data = await response.json();

                if (response.ok) {
                    setVehicles(data);
                } else {
                    setMessage('No se pudieron cargar los vehículos');
                }
            } catch (error) {
                setMessage('Error al conectar con la API');
            }
        };

        fetchVehicles();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const dropdownButton = document.getElementById('dropdown-button');
            const dropdown = document.getElementById('dropdown');
            if (dropdownButton && !dropdownButton.contains(event.target) && dropdown && !dropdown.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filteredVehicles = vehicles.filter((vehicle) => {
        const matchesSearch = vehicle.nombre_recolector.toLowerCase().includes(searchText.toLowerCase());
        const matchesCategory = selectedCategory === 'Todos' || vehicle.zona_responsable === selectedCategory;
        return matchesSearch && matchesCategory;
    });

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
        <div className="container mx-auto text-center py-3 px-4">
            <TituloConRegreso titulo="Lista de Vehículos Recolectores" to="/" />

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
                                    <button
                                        type="button"
                                        className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => handleCategorySelect('Todos')}
                                    >
                                        Todos
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => handleCategorySelect('Colectora')}
                                    >
                                        Colectora
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => handleCategorySelect('Zona Cero')}
                                    >
                                        Zona Cero
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => handleCategorySelect('Esperanza')}
                                    >
                                        Esperanza
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                    <input
                        type="search"
                        id="search-dropdown"
                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        placeholder="Busca tu zona"
                        value={searchText}
                        onChange={handleSearchChange}
                        required
                    />
                    <button
                        type="submit"
                        className="items-center p-2 text-sm font-medium text-center text-white bg-blue-700 border border-blue-700 rounded-r-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <SearchIcon className="w-5 h-5" />
                        <span className="sr-only">Search</span>
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
                                    zone={vehicle.zona_responsable}
                                    status={vehicle.estado}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VehicleList;