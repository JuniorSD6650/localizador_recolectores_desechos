exports.seed = function (knex) {
    return knex('calles').del()
        .then(function () {
            return knex('calles').insert([
                {
                    "id": 62,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL.",
                    "hora_inicio": "05:15:00",
                    "hora_final": "05:20:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 63,
                    "nombre": "VIA REGIONAL JANCAO",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL JANCAO.",
                    "hora_inicio": "05:20:00",
                    "hora_final": "05:25:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 64,
                    "nombre": "VIA REGIONAL SAN ANDRES",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL SAN ANDRES.",
                    "hora_inicio": "05:25:00",
                    "hora_final": "05:45:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 65,
                    "nombre": "LIMON PAMPA",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, LIMON PAMPA.",
                    "hora_inicio": "05:45:00",
                    "hora_final": "05:50:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 66,
                    "nombre": "SAN ANDRES",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, SAN ANDRES.",
                    "hora_inicio": "05:50:00",
                    "hora_final": "06:00:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 67,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL.",
                    "hora_inicio": "06:00:00",
                    "hora_final": "06:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 68,
                    "nombre": "CALLE 10",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, CALLE 10.",
                    "hora_inicio": "06:10:00",
                    "hora_final": "06:20:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 69,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL.",
                    "hora_inicio": "06:20:00",
                    "hora_final": "06:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 70,
                    "nombre": "CALLE 8",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, CALLE 8.",
                    "hora_inicio": "06:45:00",
                    "hora_final": "06:50:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 71,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL.",
                    "hora_inicio": "06:50:00",
                    "hora_final": "07:05:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 72,
                    "nombre": "CALLE 7",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, CALLE 7.",
                    "hora_inicio": "06:50:00",
                    "hora_final": "07:15:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 73,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL.",
                    "hora_inicio": "07:05:00",
                    "hora_final": "07:23:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 74,
                    "nombre": "JR DIVINO MAESTRO",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR DIVINO MAESTRO.",
                    "hora_inicio": "07:15:00",
                    "hora_final": "07:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 75,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL.",
                    "hora_inicio": "07:23:00",
                    "hora_final": "07:38:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 76,
                    "nombre": "JR SEÑOR DE BURGOS",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR SEÑOR DE BURGOS.",
                    "hora_inicio": "07:30:00",
                    "hora_final": "07:45:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 77,
                    "nombre": "JR SAN LORENZO",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR SAN LORENZO.",
                    "hora_inicio": "07:38:00",
                    "hora_final": "07:45:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 78,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL.",
                    "hora_inicio": "07:45:00",
                    "hora_final": "07:45:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 79,
                    "nombre": "JR SAN SEBASTIAN",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR SAN SEBASTIAN.",
                    "hora_inicio": "07:50:00",
                    "hora_final": "07:58:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 80,
                    "nombre": "JR SAN MIGUEL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR SAN MIGUEL.",
                    "hora_inicio": "07:58:00",
                    "hora_final": "08:04:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 81,
                    "nombre": "JR SAN BENITO",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR SAN BENITO.",
                    "hora_inicio": "08:04:00",
                    "hora_final": "08:12:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 82,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL.",
                    "hora_inicio": "08:12:00",
                    "hora_final": "08:17:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 83,
                    "nombre": "CALLE SAN JUAN BOSCO",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, CALLE SAN JUAN BOSCO.",
                    "hora_inicio": "08:17:00",
                    "hora_final": "08:22:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 84,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL.",
                    "hora_inicio": "08:22:00",
                    "hora_final": "08:25:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 85,
                    "nombre": "JR SAN ROQUE",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR SAN ROQUE.",
                    "hora_inicio": "08:25:00",
                    "hora_final": "08:33:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 86,
                    "nombre": "JR LIBRA",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR LIBRA.",
                    "hora_inicio": "08:33:00",
                    "hora_final": "08:41:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 87,
                    "nombre": "JR LIBRA",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR LIBRA.",
                    "hora_inicio": "08:41:00",
                    "hora_final": "08:46:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 88,
                    "nombre": "MALECON JANCAO",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, MALECON JANCAO.",
                    "hora_inicio": "08:46:00",
                    "hora_final": "08:52:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 89,
                    "nombre": "JR ESCORPIO",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR ESCORPIO.",
                    "hora_inicio": "08:52:00",
                    "hora_final": "09:02:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 90,
                    "nombre": "JR SAN FELIPE",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR SAN FELIPE.",
                    "hora_inicio": "09:02:00",
                    "hora_final": "09:22:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 91,
                    "nombre": "JR SAGITARIO",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR SAGITARIO.",
                    "hora_inicio": "09:22:00",
                    "hora_final": "09:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 92,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL.",
                    "hora_inicio": "09:30:00",
                    "hora_final": "09:36:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 93,
                    "nombre": "JR FRANCIA",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR FRANCIA.",
                    "hora_inicio": "09:36:00",
                    "hora_final": "09:46:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 94,
                    "nombre": "MALECON JANCAO",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, MALECON JANCAO.",
                    "hora_inicio": "09:46:00",
                    "hora_final": "09:48:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 95,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL.",
                    "hora_inicio": "09:52:00",
                    "hora_final": "09:56:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 96,
                    "nombre": "VIA REGIONAL JANCAO",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL JANCAO.",
                    "hora_inicio": "09:56:00",
                    "hora_final": "10:06:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                }
            ]);
        });
};
