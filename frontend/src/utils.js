// Configuración común de la API
export const API_BASE_URL = "http://localhost:5000/api/";

// Función para calcular el tiempo transcurrido desde una fecha
export const calculateTimeAgo = (date) => {
    const [day, month, year, hour, minute] = date.split(/[\s:\/]+/);
    const formattedDate = `${month}/${day}/${year} ${hour}:${minute}:00`;

    const now = new Date();
    const updateDate = new Date(formattedDate);
    const differenceInSeconds = Math.floor((now - updateDate) / 1000);

    if (differenceInSeconds < 60) {
        return `hace ${differenceInSeconds} segundos`;
    }

    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    if (differenceInMinutes < 60) {
        return `hace ${differenceInMinutes} minutos`;
    }

    const differenceInHours = Math.floor(differenceInMinutes / 60);
    if (differenceInHours < 24) {
        return `hace ${differenceInHours} horas`;
    }

    const differenceInDays = Math.floor(differenceInHours / 24);
    if (differenceInDays < 30) {
        return `hace ${differenceInDays} días`;
    }

    return new Date(formattedDate).toLocaleDateString();
};
