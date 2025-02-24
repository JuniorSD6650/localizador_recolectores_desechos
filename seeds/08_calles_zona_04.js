exports.seed = function (knex) {
    return knex('calles').del()
        .then(function () {
            return knex('calles').insert([
                {
                    "id": 39,
                    "nombre": "PARADERO 15",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, PARADERO 15.",
                    "hora_inicio": "05:15:00",
                    "hora_final": "05:25:00",
                    "numero_cuadra": 1,
                    "zona_id": 4
                },
                {
                    "id": 40,
                    "nombre": "URUBAMBA",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, URUBAMBA.",
                    "hora_inicio": "05:25:00",
                    "hora_final": "05:35:00",
                    "numero_cuadra": 4,
                    "zona_id": 4
                },
                {
                    "id": 41,
                    "nombre": "YARUPAJA",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, YARUPAJA.",
                    "hora_inicio": "05:35:00",
                    "hora_final": "05:37:00",
                    "numero_cuadra": 1,
                    "zona_id": 4
                },
                {
                    "id": 42,
                    "nombre": "SALCANTAY (PUNTO DE ESPERA)",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, SALCANTAY (PUNTO DE ESPERA).",
                    "hora_inicio": "05:37:00",
                    "hora_final": "05:46:00",
                    "numero_cuadra": 2,
                    "zona_id": 4
                },
                {
                    "id": 43,
                    "nombre": "HUASCARAN",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, HUASCARAN.",
                    "hora_inicio": "05:46:00",
                    "hora_final": "05:50:00",
                    "numero_cuadra": 1,
                    "zona_id": 4
                },
                {
                    "id": 44,
                    "nombre": "HUANDOY ESQUINA PUNTO DE RECOJO",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, HUANDOY ESQUINA PUNTO DE RECOJO.",
                    "hora_inicio": "05:50:00",
                    "hora_final": "06:03:00",
                    "numero_cuadra": 3,
                    "zona_id": 4
                },
                {
                    "id": 45,
                    "nombre": "UBINAS",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, UBINAS.",
                    "hora_inicio": "06:03:00",
                    "hora_final": "06:11:00",
                    "numero_cuadra": 2,
                    "zona_id": 4
                },
                {
                    "id": 46,
                    "nombre": "CALLE SIN NOMBRE",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, CALLE SIN NOMBRE.",
                    "hora_inicio": "06:11:00",
                    "hora_final": "06:15:00",
                    "numero_cuadra": 1,
                    "zona_id": 4
                },
                {
                    "id": 47,
                    "nombre": "PACHITEA",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, PACHITEA.",
                    "hora_inicio": "06:15:00",
                    "hora_final": "06:21:00",
                    "numero_cuadra": 1,
                    "zona_id": 4
                },
                {
                    "id": 48,
                    "nombre": "QUIUALOCOCHA",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, QUIUALOCOCHA.",
                    "hora_inicio": "06:21:00",
                    "hora_final": "06:26:00",
                    "numero_cuadra": 1,
                    "zona_id": 4
                },
                {
                    "id": 49,
                    "nombre": "MARAÑON",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, MARAÑON.",
                    "hora_inicio": "06:26:00",
                    "hora_final": "06:31:00",
                    "numero_cuadra": 3,
                    "zona_id": 4
                },
                {
                    "id": 50,
                    "nombre": "CALLE SIN NOMBRE",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, CALLE SIN NOMBRE.",
                    "hora_inicio": "06:31:00",
                    "hora_final": "06:35:00",
                    "numero_cuadra": 5,
                    "zona_id": 4
                },
                {
                    "id": 51,
                    "nombre": "HUASCARAN",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, HUASCARAN.",
                    "hora_inicio": "06:35:00",
                    "hora_final": "06:45:00",
                    "numero_cuadra": 3,
                    "zona_id": 4
                },
                {
                    "id": 52,
                    "nombre": "PERENE",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, PERENE.",
                    "hora_inicio": "06:45:00",
                    "hora_final": "06:54:00",
                    "numero_cuadra": 1,
                    "zona_id": 4
                },
                {
                    "id": 53,
                    "nombre": "UBINAS",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, UBINAS.",
                    "hora_inicio": "06:54:00",
                    "hora_final": "06:59:00",
                    "numero_cuadra": 1,
                    "zona_id": 4
                },
                {
                    "id": 54,
                    "nombre": "YARUPAJA",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, YARUPAJA.",
                    "hora_inicio": "06:59:00",
                    "hora_final": "07:09:00",
                    "numero_cuadra": 2,
                    "zona_id": 4
                },
                {
                    "id": 55,
                    "nombre": "CALLE SIN NOMBRE",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, CALLE SIN NOMBRE.",
                    "hora_inicio": "07:09:00",
                    "hora_final": "07:11:00",
                    "numero_cuadra": 1,
                    "zona_id": 4
                },
                {
                    "id": 56,
                    "nombre": "ANDES (CALLES)",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, ANDES (CALLES).",
                    "hora_inicio": "07:11:00",
                    "hora_final": "07:26:00",
                    "numero_cuadra": 3,
                    "zona_id": 4
                },
                {
                    "id": 57,
                    "nombre": "URUBAMBA",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, URUBAMBA.",
                    "hora_inicio": "07:26:00",
                    "hora_final": "07:34:00",
                    "numero_cuadra": 2,
                    "zona_id": 4
                },
                {
                    "id": 58,
                    "nombre": "JIRISHANCA",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, JIRISHANCA.",
                    "hora_inicio": "07:34:00",
                    "hora_final": "07:46:00",
                    "numero_cuadra": 3,
                    "zona_id": 4
                },
                {
                    "id": 59,
                    "nombre": "ESTEBAN PAVLETICH",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, ESTEBAN PAVLETICH.",
                    "hora_inicio": "07:46:00",
                    "hora_final": "08:06:00",
                    "numero_cuadra": 7,
                    "zona_id": 4
                },
                {
                    "id": 60,
                    "nombre": "RENE GUARDIAN",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, RENE GUARDIAN.",
                    "hora_inicio": "08:11:00",
                    "hora_final": "08:29:00",
                    "numero_cuadra": 1,
                    "zona_id": 4
                },
                {
                    "id": 61,
                    "nombre": "PERENE",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, PERENE.",
                    "hora_inicio": "08:36:00",
                    "hora_final": "08:59:00",
                    "numero_cuadra": 3,
                    "zona_id": 4
                },
                {
                    "id": 62,
                    "nombre": "PARTE TRASERA (MARISCAL CACERES)",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, MARISCAL CACERES.",
                    "hora_inicio": "09:05:00",
                    "hora_final": "09:29:00",
                    "numero_cuadra": 3,
                    "zona_id": 4
                },
                {
                    "id": 63,
                    "nombre": "CHIRA",
                    "descripcion": "SAN LUIS - Calle ubicada en la zona 4, CHIRA.",
                    "hora_inicio": "09:29:00",
                    "hora_final": "09:42:00",
                    "numero_cuadra": 3,
                    "zona_id": 4
                }
            ]);
        });
};
