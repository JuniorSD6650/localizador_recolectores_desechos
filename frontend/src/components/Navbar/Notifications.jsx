"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../utils";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

import NotificationsIcon from '@mui/icons-material/Notifications';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [hasNewNotifications, setHasNewNotifications] = useState(false);

    useEffect(() => {
        let viewedNotifications = localStorage.getItem("viewedNotifications");

        try {
            viewedNotifications = JSON.parse(viewedNotifications) || [];
            if (!Array.isArray(viewedNotifications)) {
                viewedNotifications = [];
            }
        } catch (error) {
            console.error("Error al parsear viewedNotifications:", error);
            viewedNotifications = [];
        }

        fetchNotifications(viewedNotifications);
    }, []);

    const fetchNotifications = async (viewedNotifications) => {
        try {
            const response = await fetch(`${API_BASE_URL}notificaciones/?limit=3`);
            if (!response.ok) {
                throw new Error("Error en la respuesta de la API");
            }
            const data = await response.json();
            const fetchedNotifications = data.notificaciones || [];

            setNotifications(fetchedNotifications);

            const newNotifications = fetchedNotifications.some(
                (n) => !viewedNotifications.includes(n.id.toString())
            );
            setHasNewNotifications(newNotifications);
        } catch (error) {
            console.error("Error al obtener las notificaciones:", error);
        }
    };

    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);

        if (hasNewNotifications) {
            const notificationIds = notifications.map((n) => n.id.toString());
            localStorage.setItem("viewedNotifications", JSON.stringify(notificationIds));
            setHasNewNotifications(false);
        }
    };

    const formatNotificationDate = (createdAt) => {
        const date = new Date(createdAt);
        if (isNaN(date)) {
            return "Fecha inválida";
        }
        return formatDistanceToNow(date, { addSuffix: true, locale: es });
    };

    const getPriorityColor = (prioridad) => {
        switch (prioridad.toLowerCase()) {
            case "alta":
                return "bg-red-500";
            case "media":
                return "bg-yellow-500";
            case "baja":
                return "bg-green-500";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <div className="relative">
            <button
                onClick={handleNotificationClick}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Notificaciones"
            >
                <NotificationsIcon className="w-6 h-6" />
                {hasNewNotifications && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" />
                )}
            </button>

            {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notificaciones</h3>
                    </div>
                    <ul className="py-2 max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <li
                                    key={notification.id}
                                    className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getPriorityColor(notification.prioridad)}`}>
                                                <span className="text-white text-sm font-bold">
                                                    {notification.titulo.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                                {notification.titulo}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                                                {notification.mensaje}
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                                {formatNotificationDate(notification.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">No hay notificaciones.</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Notifications;
