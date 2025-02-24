exports.seed = function (knex) {
    return knex('calles').del()
        .then(function () {
            return knex('calles').insert([
                {
                    "id": 1,
                    "nombre": "PARADERO 3 INICIO P",
                    "descripcion": "PARTE BAJA - Calle ubicada en la zona 5, PARADERO 3 INICIO P.",
                    "hora_inicio": "05:15:00",
                    "hora_final": "05:25:00",
                    "numero_cuadra": 1,
                    "zona_id": 5
                },
                {
                    "id": 2,
                    "nombre": "AVENIDA ESTEVAN PABLETICH",
                    "descripcion": "PARTE BAJA - Calle ubicada en la zona 5, AVENIDA ESTEVAN PABLETICH.",
                    "hora_inicio": "05:25:00",
                    "hora_final": "06:10:00",
                    "numero_cuadra": 10,
                    "zona_id": 5
                },
                {
                    "id": 3,
                    "nombre": "AV. JAVIER HERAUD",
                    "descripcion": "PARTE BAJA - Calle ubicada en la zona 5, AV. JAVIER HERAUD.",
                    "hora_inicio": "06:10:00",
                    "hora_final": "06:15:00",
                    "numero_cuadra": 2,
                    "zona_id": 5
                },
                {
                    "id": 4,
                    "nombre": "AV. MARIANO MELGAR",
                    "descripcion": "PARTE BAJA - Calle ubicada en la zona 5, AV. MARIANO MELGAR.",
                    "hora_inicio": "06:15:00",
                    "hora_final": "06:50:00",
                    "numero_cuadra": 10,
                    "zona_id": 5
                },
                {
                    "id": 5,
                    "nombre": "AVENIDA AMAZONAS",
                    "descripcion": "PARTE BAJA - Calle ubicada en la zona 5, AVENIDA AMAZONAS.",
                    "hora_inicio": "06:50:00",
                    "hora_final": "07:05:00",
                    "numero_cuadra": 2,
                    "zona_id": 5
                },
                {
                    "id": 6,
                    "nombre": "AV. PERU - RICALDO PALMA (PUNTO CRITICO MERCADO SECTOR 4)",
                    "descripcion": "PARTE BAJA - Calle ubicada en la zona 5, AV. PERU - RICALDO PALMA (PUNTO CRITICO MERCADO SECTOR 4).",
                    "hora_inicio": "07:05:00",
                    "hora_final": "07:35:00",
                    "numero_cuadra": 4,
                    "zona_id": 5
                },
                {
                    "id": 7,
                    "nombre": "AV. PERU (CESAR VALLEJO) PUNTO CRITICO",
                    "descripcion": "PARTE BAJA - Calle ubicada en la zona 5, AV. PERU (CESAR VALLEJO) PUNTO CRITICO.",
                    "hora_inicio": "07:35:00",
                    "hora_final": "07:59:00",
                    "numero_cuadra": 2,
                    "zona_id": 5
                },
                {
                    "id": 8,
                    "nombre": "AVENIDA PERU - FONAVI 4 PUNTO CRITICO",
                    "descripcion": "PARTE BAJA - Calle ubicada en la zona 5, AVENIDA PERU - FONAVI 4 PUNTO CRITICO.",
                    "hora_inicio": "07:59:00",
                    "hora_final": "08:30:00",
                    "numero_cuadra": 4,
                    "zona_id": 5
                },
                {
                    "id": 9,
                    "nombre": "AVENIDA PERU - LORETO",
                    "descripcion": "PARTE BAJA - Calle ubicada en la zona 5, AVENIDA PERU - LORETO.",
                    "hora_inicio": "08:30:00",
                    "hora_final": "08:40:00",
                    "numero_cuadra": 2,
                    "zona_id": 5
                },
                {
                    "id": 10,
                    "nombre": "AVENIDA ESTEVAN PABLETICH",
                    "descripcion": "PARTE BAJA - Calle ubicada en la zona 5, AVENIDA ESTEVAN PABLETICH.",
                    "hora_inicio": "08:40:00",
                    "hora_final": "08:46:00",
                    "numero_cuadra": 4,
                    "zona_id": 5
                },
                {
                    "id": 11,
                    "nombre": "TACNA PARADA",
                    "descripcion": "PARTE BAJA - Calle ubicada en la zona 5, TACNA PARADA.",
                    "hora_inicio": "08:46:00",
                    "hora_final": "08:52:00",
                    "numero_cuadra": 1,
                    "zona_id": 5
                },
                {
                    "id": 12,
                    "nombre": "11 DE ENERO",
                    "descripcion": "PARTE BAJA - Calle ubicada en la zona 5, 11 DE ENERO.",
                    "hora_inicio": "08:52:00",
                    "hora_final": "08:59:00",
                    "numero_cuadra": 1,
                    "zona_id": 5
                },
                {
                    "id": 13,
                    "nombre": "AV. JAVIER HERAUD",
                    "descripcion": "PARTE BAJA - Calle ubicada en la zona 5, AV. JAVIER HERAUD.",
                    "hora_inicio": "08:59:00",
                    "hora_final": "09:02:00",
                    "numero_cuadra": 1,
                    "zona_id": 5
                },
                {
                    "id": 14,
                    "nombre": "PROLONGACION 2 DE ENERO PARADA",
                    "descripcion": "PARTE BAJA - Calle ubicada en la zona 5, PROLONGACION 2 DE ENERO PARADA.",
                    "hora_inicio": "09:02:00",
                    "hora_final": "09:17:00",
                    "numero_cuadra": 3,
                    "zona_id": 5
                },
                {
                    "id": 15,
                    "nombre": "AV. JAVIER HERAUD",
                    "descripcion": "PARTE BAJA - Calle ubicada en la zona 5, AV. JAVIER HERAUD.",
                    "hora_inicio": "09:17:00",
                    "hora_final": "09:19:00",
                    "numero_cuadra": 1,
                    "zona_id": 5
                },
                {
                    "id": 16,
                    "nombre": "LAMBAYEQUE",
                    "descripcion": "PARTE BAJA - Calle ubicada en la zona 5, LAMBAYEQUE.",
                    "hora_inicio": "09:19:00",
                    "hora_final": "09:30:00",
                    "numero_cuadra": 3,
                    "zona_id": 5
                },
                {
                    "id": 17,
                    "nombre": "PIURA",
                    "descripcion": "PARTE BAJA - Calle ubicada en la zona 5, PIURA.",
                    "hora_inicio": "09:30:00",
                    "hora_final": "09:40:00",
                    "numero_cuadra": 1,
                    "zona_id": 5
                },
                {
                    "id": 18,
                    "nombre": "CALLE SIN NOMBRE",
                    "descripcion": "PARTE BAJA - Calle ubicada en la zona 5, CALLE SIN NOMBRE.",
                    "hora_inicio": "09:40:00",
                    "hora_final": "09:45:00",
                    "numero_cuadra": 1,
                    "zona_id": 5
                },
                {
                    "id": 19,
                    "nombre": "PARADERO 3 INICIO",
                    "descripcion": "PARTE ALTA - Calle ubicada en la zona 5, PARADERO 3 INICIO.",
                    "hora_inicio": "05:15:00",
                    "hora_final": "05:25:00",
                    "numero_cuadra": 1,
                    "zona_id": 5
                },
                {
                    "id": 20,
                    "nombre": "AV. ESTEVAN PABLETICH",
                    "descripcion": "PARTE ALTA - Calle ubicada en la zona 5, AV. ESTEVAN PABLETICH.",
                    "hora_inicio": "05:25:00",
                    "hora_final": "06:10:00",
                    "numero_cuadra": 10,
                    "zona_id": 5
                },
                {
                    "id": 21,
                    "nombre": "AV. JAVIER HERAUD",
                    "descripcion": "PARTE ALTA - Calle ubicada en la zona 5, AV. JAVIER HERAUD.",
                    "hora_inicio": "06:10:00",
                    "hora_final": "06:15:00",
                    "numero_cuadra": 2,
                    "zona_id": 5
                },
                {
                    "id": 22,
                    "nombre": "AV. MARIANO MELGAR",
                    "descripcion": "PARTE ALTA - Calle ubicada en la zona 5, AV. MARIANO MELGAR.",
                    "hora_inicio": "06:15:00",
                    "hora_final": "06:50:00",
                    "numero_cuadra": 10,
                    "zona_id": 5
                },
                {
                    "id": 23,
                    "nombre": "AV. AMAZONAS",
                    "descripcion": "PARTE ALTA - Calle ubicada en la zona 5, AV. AMAZONAS.",
                    "hora_inicio": "06:50:00",
                    "hora_final": "07:05:00",
                    "numero_cuadra": 1,
                    "zona_id": 5
                },
                {
                    "id": 24,
                    "nombre": "JIRON MAJES (LOSA DEPORTIVA) PARADA",
                    "descripcion": "PARTE ALTA - Calle ubicada en la zona 5, JIRON MAJES (LOSA DEPORTIVA) PARADA.",
                    "hora_inicio": "07:05:00",
                    "hora_final": "07:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 5
                },
                {
                    "id": 25,
                    "nombre": "JIRON MAJES",
                    "descripcion": "PARTE ALTA - Calle ubicada en la zona 5, JIRON MAJES.",
                    "hora_inicio": "07:30:00",
                    "hora_final": "07:33:00",
                    "numero_cuadra": 1,
                    "zona_id": 5
                },
                {
                    "id": 26,
                    "nombre": "JIRON MAJES - TAMBOPATA",
                    "descripcion": "PARTE ALTA - Calle ubicada en la zona 5, JIRON MAJES - TAMBOPATA.",
                    "hora_inicio": "07:33:00",
                    "hora_final": "07:37:00",
                    "numero_cuadra": 3,
                    "zona_id": 5
                },
                {
                    "id": 27,
                    "nombre": "TAMBOPATA",
                    "descripcion": "PARTE ALTA - Calle ubicada en la zona 5, TAMBOPATA.",
                    "hora_inicio": "07:37:00",
                    "hora_final": "07:45:00",
                    "numero_cuadra": 4,
                    "zona_id": 5
                },
                {
                    "id": 28,
                    "nombre": "TAMBOPATA - FELIPE DE LOS RIOS (PARADA)",
                    "descripcion": "PARTE ALTA - Calle ubicada en la zona 5, TAMBOPATA - FELIPE DE LOS RIOS (PARADA).",
                    "hora_inicio": "07:45:00",
                    "hora_final": "08:05:00",
                    "numero_cuadra": 1,
                    "zona_id": 5
                },
                {
                    "id": 29,
                    "nombre": "TAMBOPATA BAJADA",
                    "descripcion": "PARTE ALTA - Calle ubicada en la zona 5, TAMBOPATA BAJADA.",
                    "hora_inicio": "08:05:00",
                    "hora_final": "08:18:00",
                    "numero_cuadra": 3,
                    "zona_id": 5
                },
                {
                    "id": 30,
                    "nombre": "CALLE SIN NOMBRE (JIRONES QUE PASA: RICARDO PALMA, CESAR VALLEJO, JOSE SANTOS CHOCANO)",
                    "descripcion": "PARTE ALTA - Calle ubicada en la zona 5, CALLE SIN NOMBRE (JIRONES QUE PASA: RICARDO PALMA, CESAR VALLEJO, JOSE SANTOS CHOCANO).",
                    "hora_inicio": "08:18:00",
                    "hora_final": "08:36:00",
                    "numero_cuadra": 5,
                    "zona_id": 5
                },
                {
                    "id": 31,
                    "nombre": "JOSE MARIA ARGUEDAS SUBIDA",
                    "descripcion": "PARTE ALTA - Calle ubicada en la zona 5, JOSE MARIA ARGUEDAS SUBIDA.",
                    "hora_inicio": "08:36:00",
                    "hora_final": "08:58:00",
                    "numero_cuadra": 3,
                    "zona_id": 5
                },
                {
                    "id": 32,
                    "nombre": "JOSE MARIA ARGUEDAS BAJADA",
                    "descripcion": "PARTE ALTA - Calle ubicada en la zona 5, JOSE MARIA ARGUEDAS BAJADA.",
                    "hora_inicio": "08:58:00",
                    "hora_final": "09:25:00",
                    "numero_cuadra": 6,
                    "zona_id": 5
                },
                {
                    "id": 33,
                    "nombre": "JOSE MARIA ARGUEDAS (AVENIDA PERU)",
                    "descripcion": "PARTE ALTA - Calle ubicada en la zona 5, JOSE MARIA ARGUEDAS (AVENIDA PERU).",
                    "hora_inicio": "09:25:00",
                    "hora_final": "09:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 5
                },
                {
                    "id": 34,
                    "nombre": "AVENIDA PERU (CESAR VALLEJO)",
                    "descripcion": "PARTE ALTA - Calle ubicada en la zona 5, AVENIDA PERU (CESAR VALLEJO).",
                    "hora_inicio": "09:30:00",
                    "hora_final": "09:53:00",
                    "numero_cuadra": 2,
                    "zona_id": 5
                },
                {
                    "id": 35,
                    "nombre": "AVENIDA PERU - RICARDO PALMA",
                    "descripcion": "PARTE ALTA - Calle ubicada en la zona 5, AVENIDA PERU - RICARDO PALMA.",
                    "hora_inicio": "09:53:00",
                    "hora_final": "10:20:00",
                    "numero_cuadra": 2,
                    "zona_id": 5
                },
                {
                    "id": 36,
                    "nombre": "AVENIDA PERU DE VUELTA - CIRO ALEGRIA",
                    "descripcion": "PARTE ALTA - Calle ubicada en la zona 5, AVENIDA PERU DE VUELTA - CIRO ALEGRIA.",
                    "hora_inicio": "10:20:00",
                    "hora_final": "10:25:00",
                    "numero_cuadra": 1,
                    "zona_id": 5
                },
                {
                    "id": 37,
                    "nombre": "ENRRIQUE LOPEZ ALBUJAR",
                    "descripcion": "PARTE ALTA - Calle ubicada en la zona 5, ENRRIQUE LOPEZ ALBUJAR.",
                    "hora_inicio": "10:25:00",
                    "hora_final": "10:39:00",
                    "numero_cuadra": 7,
                    "zona_id": 5
                },
                {
                    "id": 38,
                    "nombre": "AVENIDA PERU FONAVI 4",
                    "descripcion": "PARTE ALTA - Calle ubicada en la zona 5, AVENIDA PERU FONAVI 4.",
                    "hora_inicio": "10:39:00",
                    "hora_final": "10:44:00",
                    "numero_cuadra": 1,
                    "zona_id": 5
                }
            ]);
        });
};
