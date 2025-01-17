import Swal from 'sweetalert2';

export const BASE_URL = "http://localhost:5000/";
export const API_BASE_URL = "http://localhost:5000/api/";


export const calculateTimeAgo = (date) => {
    if (!date) return 'Fecha no disponible';

    const updateDate = new Date(date);
    if (isNaN(updateDate)) return 'Fecha inválida';

    const now = new Date();
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

    return updateDate.toLocaleDateString();
};

// Alerta de éxito
export const showSuccessAlert = (title, text) => {
    Swal.fire({
        icon: 'success',
        title: title || '¡Éxito!',
        text: text || 'Operación completada con éxito.',
        confirmButtonText: 'Aceptar',
    });
};

// Alerta de error
export const showErrorAlert = (title, text) => {
    Swal.fire({
        icon: 'error',
        title: title || '¡Error!',
        text: text || 'Ocurrió un problema, por favor inténtelo de nuevo.',
        confirmButtonText: 'Aceptar',
    });
};

// Alerta personalizada
export const showCustomAlert = async (config) => {
    return Swal.fire({
        ...config,
    });
};