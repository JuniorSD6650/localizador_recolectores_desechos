import Swal from 'sweetalert2';

export const BASE_URL = "http://localhost:5000/";
export const API_BASE_URL = "http://localhost:5000/api/";

function parseDate(dateString) {
    if (!dateString) return null;
    const [day, month, yearAndTime] = dateString.split('/');
    const [year, time] = yearAndTime.split(' ');
    return new Date(`${year}-${month}-${day}T${time}`);
}

export function calculateTimeAgo(dateString) {
    const date = parseDate(dateString);
    if (!date || isNaN(date)) {
        return 'Sin fecha de actualización';
    }

    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        return `${interval} año${interval === 1 ? '' : 's'}`;
    }

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return `${interval} mes${interval === 1 ? '' : 'es'}`;
    }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return `${interval} día${interval === 1 ? '' : 's'}`;
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return `${interval} hora${interval === 1 ? '' : 's'}`;
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return `${interval} minuto${interval === 1 ? '' : 's'}`;
    }

    return `${Math.floor(seconds)} segundo${seconds === 1 ? '' : 's'}`;
}

export const showSuccessAlert = (title, text) => {
    Swal.fire({
        icon: 'success',
        title: title || '¡Éxito!',
        text: text || 'Operación completada con éxito.',
        confirmButtonText: 'Aceptar',
    });
};

export const showErrorAlert = (title, text) => {
    Swal.fire({
        icon: 'error',
        title: title || '¡Error!',
        text: text || 'Ocurrió un problema, por favor inténtelo de nuevo.',
        confirmButtonText: 'Aceptar',
    });
};

export const showCustomAlert = async (config) => {
    return Swal.fire({
        ...config,
    });
};