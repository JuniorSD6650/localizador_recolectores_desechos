exports.seed = function (knex) {
    return knex('calles').del()
        .then(function () {
            return knex('calles').insert([
                {
                    "id": 192,
                    "nombre": "JR HUMALIES",
                    "descripcion": "Calle ubicada en la zona 3, JR HUMALIES.",
                    "hora_inicio": "05:20:00",
                    "hora_final": "05:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 193,
                    "nombre": "AV. 28 DE AGOSTO",
                    "descripcion": "Calle ubicada en la zona 3, AV. 28 DE AGOSTO.",
                    "hora_inicio": "05:30:00",
                    "hora_final": "05:37:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 194,
                    "nombre": "JR. LAS BEGONIAS",
                    "descripcion": "Calle ubicada en la zona 3, JR. LAS BEGONIAS.",
                    "hora_inicio": "05:37:00",
                    "hora_final": "05:42:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 195,
                    "nombre": "JR. HORACIO",
                    "descripcion": "Calle ubicada en la zona 3, JR. HORACIO.",
                    "hora_inicio": "05:42:00",
                    "hora_final": "05:50:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 196,
                    "nombre": "MALECON GABRIEL AGUILAR",
                    "descripcion": "Calle ubicada en la zona 3, MALECON GABRIEL AGUILAR.",
                    "hora_inicio": "05:50:00",
                    "hora_final": "05:55:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 197,
                    "nombre": "JR. BARALLANOS",
                    "descripcion": "Calle ubicada en la zona 3, JR. BARALLANOS.",
                    "hora_inicio": "05:55:00",
                    "hora_final": "05:59:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 198,
                    "nombre": "JR. FELIPE HUAMAN POMA",
                    "descripcion": "Calle ubicada en la zona 3, JR. FELIPE HUAMAN POMA.",
                    "hora_inicio": "05:59:00",
                    "hora_final": "06:05:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 199,
                    "nombre": "MALECON GABRIEL AGUILAR",
                    "descripcion": "Calle ubicada en la zona 3, MALECON GABRIEL AGUILAR.",
                    "hora_inicio": "06:05:00",
                    "hora_final": "06:07:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 200,
                    "nombre": "JR. JUAN SANTOS ATAHUALPA",
                    "descripcion": "Calle ubicada en la zona 3, JR. JUAN SANTOS ATAHUALPA.",
                    "hora_inicio": "06:07:00",
                    "hora_final": "06:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 201,
                    "nombre": "JR. ANDRES FERNANDEZ GARRIDO",
                    "descripcion": "Calle ubicada en la zona 3, JR. ANDRES FERNANDEZ GARRIDO.",
                    "hora_inicio": "06:10:00",
                    "hora_final": "06:14:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 202,
                    "nombre": "JR. LAS ORQUIDEAS",
                    "descripcion": "Calle ubicada en la zona 3, JR. LAS ORQUIDEAS.",
                    "hora_inicio": "06:14:00",
                    "hora_final": "06:19:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 203,
                    "nombre": "JR. LOS ROSALES",
                    "descripcion": "Calle ubicada en la zona 3, JR. LOS ROSALES.",
                    "hora_inicio": "06:19:00",
                    "hora_final": "06:23:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 204,
                    "nombre": "JR. LOS JAZMINES",
                    "descripcion": "Calle ubicada en la zona 3, JR. LOS JAZMINES.",
                    "hora_inicio": "06:23:00",
                    "hora_final": "06:28:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 205,
                    "nombre": "JR. LOS NARDOS",
                    "descripcion": "Calle ubicada en la zona 3, JR. LOS NARDOS.",
                    "hora_inicio": "06:28:00",
                    "hora_final": "06:33:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 206,
                    "nombre": "JR. LOS TULIPANES",
                    "descripcion": "Calle ubicada en la zona 3, JR. LOS TULIPANES.",
                    "hora_inicio": "06:33:00",
                    "hora_final": "06:39:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 207,
                    "nombre": "JR. LAS CUCARDAS",
                    "descripcion": "Calle ubicada en la zona 3, JR. LAS CUCARDAS.",
                    "hora_inicio": "06:39:00",
                    "hora_final": "06:44:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 208,
                    "nombre": "JR. LAS VIOLETAS",
                    "descripcion": "Calle ubicada en la zona 3, JR. LAS VIOLETAS.",
                    "hora_inicio": "06:44:00",
                    "hora_final": "06:49:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 209,
                    "nombre": "AV. LOS GIRASOLES",
                    "descripcion": "Calle ubicada en la zona 3, AV. LOS GIRASOLES.",
                    "hora_inicio": "06:49:00",
                    "hora_final": "06:53:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 210,
                    "nombre": "JR. DALIAS",
                    "descripcion": "Calle ubicada en la zona 3, JR. DALIAS.",
                    "hora_inicio": "06:53:00",
                    "hora_final": "06:55:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 211,
                    "nombre": "JR. LOS LAURELES",
                    "descripcion": "Calle ubicada en la zona 3, JR. LOS LAURELES.",
                    "hora_inicio": "06:55:00",
                    "hora_final": "06:59:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 212,
                    "nombre": "JR. LOS NARDOS",
                    "descripcion": "Calle ubicada en la zona 3, JR. LOS NARDOS.",
                    "hora_inicio": "06:59:00",
                    "hora_final": "07:04:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 213,
                    "nombre": "JR. LOS ROSALES",
                    "descripcion": "Calle ubicada en la zona 3, JR. LOS ROSALES.",
                    "hora_inicio": "07:04:00",
                    "hora_final": "07:09:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 214,
                    "nombre": "JR. LOS JAZMINES",
                    "descripcion": "Calle ubicada en la zona 3, JR. LOS JAZMINES.",
                    "hora_inicio": "07:09:00",
                    "hora_final": "07:15:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 215,
                    "nombre": "JR . LOS CLAVELES",
                    "descripcion": "Calle ubicada en la zona 3, JR . LOS CLAVELES.",
                    "hora_inicio": "07:15:00",
                    "hora_final": "07:21:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 216,
                    "nombre": "JR. LOS LIRIOS",
                    "descripcion": "Calle ubicada en la zona 3, JR. LOS LIRIOS.",
                    "hora_inicio": "07:21:00",
                    "hora_final": "07:26:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 217,
                    "nombre": "JR. LOS JAZMINES",
                    "descripcion": "Calle ubicada en la zona 3, JR. LOS JAZMINES.",
                    "hora_inicio": "07:26:00",
                    "hora_final": "07:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 218,
                    "nombre": "JR. LOS GERANIOS",
                    "descripcion": "Calle ubicada en la zona 3, JR. LOS GERANIOS.",
                    "hora_inicio": "07:30:00",
                    "hora_final": "07:36:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 219,
                    "nombre": "JR. LOS JASMINEZ",
                    "descripcion": "Calle ubicada en la zona 3, JR. LOS JASMINEZ.",
                    "hora_inicio": "07:36:00",
                    "hora_final": "07:40:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 220,
                    "nombre": "JR. LOS MIRLOS",
                    "descripcion": "Calle ubicada en la zona 3, JR. LOS MIRLOS.",
                    "hora_inicio": "07:40:00",
                    "hora_final": "07:45:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 221,
                    "nombre": "JR. COMISARIA PNP",
                    "descripcion": "Calle ubicada en la zona 3, JR. COMISARIA PNP.",
                    "hora_inicio": "07:45:00",
                    "hora_final": "07:51:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 237,
                    "nombre": "MALECON HUALLAGA",
                    "descripcion": "Calle ubicada en la zona 3, MALECON HUALLAGA.",
                    "hora_inicio": "09:00:00",
                    "hora_final": "09:06:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 238,
                    "nombre": "JR. PABLO NERUDA",
                    "descripcion": "Calle ubicada en la zona 3, JR. PABLO NERUDA.",
                    "hora_inicio": "09:06:00",
                    "hora_final": "09:11:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 239,
                    "nombre": "PROL. LOS GIRASOLES",
                    "descripcion": "Calle ubicada en la zona 3, PROL. LOS GIRASOLES.",
                    "hora_inicio": "09:11:00",
                    "hora_final": "09:16:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 240,
                    "nombre": "JR. RUBEN DARIO",
                    "descripcion": "Calle ubicada en la zona 3, JR. RUBEN DARIO.",
                    "hora_inicio": "09:16:00",
                    "hora_final": "09:21:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 241,
                    "nombre": "MALECON HUALLAGA",
                    "descripcion": "Calle ubicada en la zona 3, MALECON HUALLAGA.",
                    "hora_inicio": "09:21:00",
                    "hora_final": "09:35:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                },
                {
                    "id": 242,
                    "nombre": "JR 18 DE MAYO",
                    "descripcion": "Calle ubicada en la zona 3, JR 18 DE MAYO.",
                    "hora_inicio": "09:35:00",
                    "hora_final": "09:50:00",
                    "numero_cuadra": 1,
                    "zona_id": 3
                }
            ]);
        });
};
