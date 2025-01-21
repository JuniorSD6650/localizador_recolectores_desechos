import Swal from 'sweetalert2';

export const BASE_URL = "http://localhost:5000/";
export const API_BASE_URL = "http://localhost:5000/api/";

function parseDate(dateString) {
    const [day, month, yearAndTime] = dateString.split('/');
    const [year, time] = yearAndTime.split(' ');
    return new Date(`${year}-${month}-${day}T${time}`);
}


export function calculateTimeAgo(dateString) {
    const date = parseDate(dateString);
    if (isNaN(date)) {
        return 'Fecha inválida';
    }

    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return `${interval} años`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return `${interval} meses`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return `${interval} días`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return `${interval} horas`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return `${interval} minutos`;
    }
    return `${Math.floor(seconds)} segundos`;
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