exports.seed = function (knex) {
    return knex('calles').del()
        .then(function () {
            return knex('calles').insert([
                {
                    "id": 97,
                    "nombre": "JR. SANTA ROSA",
                    "descripcion": "Calle ubicada en la zona 1, JR. SANTA ROSA.",
                    "hora_inicio": "05:15:00",
                    "hora_final": "05:25:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 98,
                    "nombre": "AV TUPAC AMARU",
                    "descripcion": "Calle ubicada en la zona 1, AV TUPAC AMARU.",
                    "hora_inicio": "05:25:00",
                    "hora_final": "05:27:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 99,
                    "nombre": "JR. ABANCAY",
                    "descripcion": "Calle ubicada en la zona 1, JR. ABANCAY.",
                    "hora_inicio": "05:27:00",
                    "hora_final": "05:35:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 100,
                    "nombre": "JR. MIGUEL GRAU",
                    "descripcion": "Calle ubicada en la zona 1, JR. MIGUEL GRAU.",
                    "hora_inicio": "05:35:00",
                    "hora_final": "05:40:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 101,
                    "nombre": "JR. JOSE OLAYA",
                    "descripcion": "Calle ubicada en la zona 1, JR. JOSE OLAYA.",
                    "hora_inicio": "05:40:00",
                    "hora_final": "05:42:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 102,
                    "nombre": "JR. TAHUANTINSUYO",
                    "descripcion": "Calle ubicada en la zona 1, JR. TAHUANTINSUYO.",
                    "hora_inicio": "05:42:00",
                    "hora_final": "05:47:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 103,
                    "nombre": "JR.SANTA ROSA",
                    "descripcion": "Calle ubicada en la zona 1, JR.SANTA ROSA.",
                    "hora_inicio": "05:47:00",
                    "hora_final": "06:00:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 104,
                    "nombre": "JR MIGUEL GRAU",
                    "descripcion": "Calle ubicada en la zona 1, JR MIGUEL GRAU.",
                    "hora_inicio": "06:00:00",
                    "hora_final": "06:05:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 105,
                    "nombre": "JR.JOSE OLAYA",
                    "descripcion": "Calle ubicada en la zona 1, JR.JOSE OLAYA.",
                    "hora_inicio": "06:05:00",
                    "hora_final": "06:13:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 106,
                    "nombre": "JR. ABANCAY",
                    "descripcion": "Calle ubicada en la zona 1, JR. ABANCAY.",
                    "hora_inicio": "06:13:00",
                    "hora_final": "06:15:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 107,
                    "nombre": "JR SAN LUIS GONZAGA",
                    "descripcion": "Calle ubicada en la zona 1, JR SAN LUIS GONZAGA.",
                    "hora_inicio": "06:15:00",
                    "hora_final": "06:17:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 108,
                    "nombre": "JR COLONIAL",
                    "descripcion": "Calle ubicada en la zona 1, JR COLONIAL.",
                    "hora_inicio": "06:17:00",
                    "hora_final": "06:22:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 109,
                    "nombre": "JR ENRIQUE L. VEGA",
                    "descripcion": "Calle ubicada en la zona 1, JR ENRIQUE L. VEGA.",
                    "hora_inicio": "06:22:00",
                    "hora_final": "06:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 110,
                    "nombre": "JR. JULIO C. TELLO",
                    "descripcion": "Calle ubicada en la zona 1, JR. JULIO C. TELLO.",
                    "hora_inicio": "06:30:00",
                    "hora_final": "06:40:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 111,
                    "nombre": "JR. 9 DE OCTUBRE",
                    "descripcion": "Calle ubicada en la zona 1, JR. 9 DE OCTUBRE.",
                    "hora_inicio": "06:40:00",
                    "hora_final": "06:42:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 112,
                    "nombre": "JR. COLONIAL",
                    "descripcion": "Calle ubicada en la zona 1, JR. COLONIAL.",
                    "hora_inicio": "06:42:00",
                    "hora_final": "06:53:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 113,
                    "nombre": "JR. HUALLAGA",
                    "descripcion": "Calle ubicada en la zona 1, JR. HUALLAGA.",
                    "hora_inicio": "06:53:00",
                    "hora_final": "07:00:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 114,
                    "nombre": "AV.28 DE AGOSTO",
                    "descripcion": "Calle ubicada en la zona 1, AV.28 DE AGOSTO.",
                    "hora_inicio": "07:00:00",
                    "hora_final": "07:05:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 115,
                    "nombre": "JR. SANTA ROSA",
                    "descripcion": "Calle ubicada en la zona 1, JR. SANTA ROSA.",
                    "hora_inicio": "07:05:00",
                    "hora_final": "07:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 116,
                    "nombre": "JR.COLONIAL",
                    "descripcion": "Calle ubicada en la zona 1, JR.COLONIAL.",
                    "hora_inicio": "07:10:00",
                    "hora_final": "07:15:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 117,
                    "nombre": "JR. FAUSTINO SANCHEZ CARRION",
                    "descripcion": "Calle ubicada en la zona 1, JR. FAUSTINO SANCHEZ CARRION.",
                    "hora_inicio": "07:15:00",
                    "hora_final": "07:20:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 118,
                    "nombre": "JR.SANTA ROSA",
                    "descripcion": "Calle ubicada en la zona 1, JR.SANTA ROSA.",
                    "hora_inicio": "07:20:00",
                    "hora_final": "07:25:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 119,
                    "nombre": "JR LOS CIPRESES",
                    "descripcion": "Calle ubicada en la zona 1, JR LOS CIPRESES.",
                    "hora_inicio": "07:25:00",
                    "hora_final": "07:27:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 120,
                    "nombre": "AV. TUPAC AMARU",
                    "descripcion": "Calle ubicada en la zona 1, AV. TUPAC AMARU.",
                    "hora_inicio": "07:27:00",
                    "hora_final": "07:32:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 121,
                    "nombre": "AV. 28 DE AGOSTO",
                    "descripcion": "Calle ubicada en la zona 1, AV. 28 DE AGOSTO.",
                    "hora_inicio": "07:32:00",
                    "hora_final": "07:38:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 122,
                    "nombre": "AV. TUPAC AMARU",
                    "descripcion": "Calle ubicada en la zona 1, AV. TUPAC AMARU.",
                    "hora_inicio": "07:38:00",
                    "hora_final": "07:40:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 123,
                    "nombre": "JR. MARIANO MELGAR",
                    "descripcion": "Calle ubicada en la zona 1, JR. MARIANO MELGAR.",
                    "hora_inicio": "07:40:00",
                    "hora_final": "07:55:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 124,
                    "nombre": "JR. INCA ROCA",
                    "descripcion": "Calle ubicada en la zona 1, JR. INCA ROCA.",
                    "hora_inicio": "07:55:00",
                    "hora_final": "08:00:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 125,
                    "nombre": "JR. JORGE CHAVEZ",
                    "descripcion": "Calle ubicada en la zona 1, JR. JORGE CHAVEZ.",
                    "hora_inicio": "08:00:00",
                    "hora_final": "08:05:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 126,
                    "nombre": "JR. JOSE CARLOS MARIATEGUI",
                    "descripcion": "Calle ubicada en la zona 1, JR. JOSE CARLOS MARIATEGUI.",
                    "hora_inicio": "08:05:00",
                    "hora_final": "08:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 127,
                    "nombre": "JR. RAMON CASTILLA",
                    "descripcion": "Calle ubicada en la zona 1, JR. RAMON CASTILLA.",
                    "hora_inicio": "08:10:00",
                    "hora_final": "08:15:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 128,
                    "nombre": "JR. MICAELA VASTIDAS",
                    "descripcion": "Calle ubicada en la zona 1, JR. MICAELA VASTIDAS.",
                    "hora_inicio": "08:15:00",
                    "hora_final": "08:20:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 129,
                    "nombre": "AV. 28 DE AGOSTO",
                    "descripcion": "Calle ubicada en la zona 1, AV. 28 DE AGOSTO.",
                    "hora_inicio": "08:20:00",
                    "hora_final": "08:28:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 130,
                    "nombre": "JR. CARLOS MATIAGUEGUI",
                    "descripcion": "Calle ubicada en la zona 1, JR. CARLOS MATIAGUEGUI.",
                    "hora_inicio": "08:28:00",
                    "hora_final": "08:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 131,
                    "nombre": "JR CESAR VALLEJO",
                    "descripcion": "Calle ubicada en la zona 1, JR CESAR VALLEJO.",
                    "hora_inicio": "08:30:00",
                    "hora_final": "08:35:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 132,
                    "nombre": "JR. JOSE MARIA ARGUEDAS",
                    "descripcion": "Calle ubicada en la zona 1, JR. JOSE MARIA ARGUEDAS.",
                    "hora_inicio": "08:35:00",
                    "hora_final": "08:40:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 133,
                    "nombre": "JR. JOSE CARLOS MARIATEGUI",
                    "descripcion": "Calle ubicada en la zona 1, JR. JOSE CARLOS MARIATEGUI.",
                    "hora_inicio": "08:40:00",
                    "hora_final": "08:44:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 134,
                    "nombre": "JR. NOVERTO ARO",
                    "descripcion": "Calle ubicada en la zona 1, JR. NOVERTO ARO.",
                    "hora_inicio": "08:44:00",
                    "hora_final": "08:47:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 135,
                    "nombre": "JR. APARICIO POMARES",
                    "descripcion": "Calle ubicada en la zona 1, JR. APARICIO POMARES.",
                    "hora_inicio": "08:51:00",
                    "hora_final": "08:55:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 136,
                    "nombre": "JR. JOSE CARLOS CHOCANO",
                    "descripcion": "Calle ubicada en la zona 1, JR. JOSE CARLOS CHOCANO.",
                    "hora_inicio": "08:55:00",
                    "hora_final": "09:00:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 137,
                    "nombre": "JR. JUANA MORENO",
                    "descripcion": "Calle ubicada en la zona 1, JR. JUANA MORENO.",
                    "hora_inicio": "09:05:00",
                    "hora_final": "09:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 138,
                    "nombre": "JR. APARICIO POMARES",
                    "descripcion": "Calle ubicada en la zona 1, JR. APARICIO POMARES.",
                    "hora_inicio": "09:10:00",
                    "hora_final": "09:25:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                },
                {
                    "id": 139,
                    "nombre": "JR. ALCIDES CARRION",
                    "descripcion": "Calle ubicada en la zona 1, JR. ALCIDES CARRION.",
                    "hora_inicio": "09:25:00",
                    "hora_final": "09:28:00",
                    "numero_cuadra": 1,
                    "zona_id": 1
                }
            ]);
        });
};
