exports.seed = function (knex) {
    return knex('calles').del()
        .then(function () {
            return knex('calles').insert([
                /* Paucarbamba S1 y S2 - Zona 1 */
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
                },

                /* Paucarbamba S3 y S4 - Zona 2 */
                {
                    "id": 140,
                    "nombre": "JR. MANCO CAPAC",
                    "descripcion": "Calle ubicada en la zona 2, JR. MANCO CAPAC.",
                    "hora_inicio": "05:20:00",
                    "hora_final": "05:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 141,
                    "nombre": "AV. MALECON LOS INCAS",
                    "descripcion": "Calle ubicada en la zona 2, AV. MALECON LOS INCAS.",
                    "hora_inicio": "05:30:00",
                    "hora_final": "05:37:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 142,
                    "nombre": "JR WIRACOCHA",
                    "descripcion": "Calle ubicada en la zona 2, JR WIRACOCHA.",
                    "hora_inicio": "05:37:00",
                    "hora_final": "05:42:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 143,
                    "nombre": "JR. BUSTAMANTE QUIJANO",
                    "descripcion": "Calle ubicada en la zona 2, JR. BUSTAMANTE QUIJANO.",
                    "hora_inicio": "05:42:00",
                    "hora_final": "05:50:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 144,
                    "nombre": "JR. CHAVIN",
                    "descripcion": "Calle ubicada en la zona 2, JR. CHAVIN.",
                    "hora_inicio": "05:50:00",
                    "hora_final": "05:55:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 145,
                    "nombre": "AV. MALECON LOS INCAS",
                    "descripcion": "Calle ubicada en la zona 2, AV. MALECON LOS INCAS.",
                    "hora_inicio": "05:55:00",
                    "hora_final": "05:59:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 146,
                    "nombre": "JR. OLLANTAY",
                    "descripcion": "Calle ubicada en la zona 2, JR. OLLANTAY.",
                    "hora_inicio": "05:59:00",
                    "hora_final": "06:05:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 147,
                    "nombre": "JR. CAHUIDE",
                    "descripcion": "Calle ubicada en la zona 2, JR. CAHUIDE.",
                    "hora_inicio": "06:05:00",
                    "hora_final": "06:07:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 148,
                    "nombre": "JR PACHACUTEC",
                    "descripcion": "Calle ubicada en la zona 2, JR PACHACUTEC.",
                    "hora_inicio": "06:07:00",
                    "hora_final": "06:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 149,
                    "nombre": "JR. MACHU PICCHU",
                    "descripcion": "Calle ubicada en la zona 2, JR. MACHU PICCHU.",
                    "hora_inicio": "06:10:00",
                    "hora_final": "06:14:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 150,
                    "nombre": "JR. ATAHUALPA",
                    "descripcion": "Calle ubicada en la zona 2, JR. ATAHUALPA.",
                    "hora_inicio": "06:14:00",
                    "hora_final": "06:19:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 151,
                    "nombre": "JR CAHUIDE",
                    "descripcion": "Calle ubicada en la zona 2, JR CAHUIDE.",
                    "hora_inicio": "06:19:00",
                    "hora_final": "06:23:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 152,
                    "nombre": "JR. PACHACUTEC",
                    "descripcion": "Calle ubicada en la zona 2, JR. PACHACUTEC.",
                    "hora_inicio": "06:23:00",
                    "hora_final": "06:28:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 153,
                    "nombre": "JR. WIRACOCHA",
                    "descripcion": "Calle ubicada en la zona 2, JR. WIRACOCHA.",
                    "hora_inicio": "06:28:00",
                    "hora_final": "06:33:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 154,
                    "nombre": "JR. ATAHUALPA",
                    "descripcion": "Calle ubicada en la zona 2, JR. ATAHUALPA.",
                    "hora_inicio": "06:33:00",
                    "hora_final": "06:39:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 155,
                    "nombre": "JR. CAHUIDE",
                    "descripcion": "Calle ubicada en la zona 2, JR. CAHUIDE.",
                    "hora_inicio": "06:39:00",
                    "hora_final": "06:44:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 156,
                    "nombre": "JR.CORICANCHA",
                    "descripcion": "Calle ubicada en la zona 2, JR.CORICANCHA.",
                    "hora_inicio": "06:44:00",
                    "hora_final": "06:49:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 157,
                    "nombre": "JR. MACHU PICCHU",
                    "descripcion": "Calle ubicada en la zona 2, JR. MACHU PICCHU.",
                    "hora_inicio": "06:49:00",
                    "hora_final": "06:53:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 158,
                    "nombre": "JR. HUASCAR",
                    "descripcion": "Calle ubicada en la zona 2, JR. HUASCAR.",
                    "hora_inicio": "06:53:00",
                    "hora_final": "06:55:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 159,
                    "nombre": "AV. MALECON LOS INCAS",
                    "descripcion": "Calle ubicada en la zona 2, AV. MALECON LOS INCAS.",
                    "hora_inicio": "06:55:00",
                    "hora_final": "06:59:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 160,
                    "nombre": "AV. MICAELA BASTIDAS",
                    "descripcion": "Calle ubicada en la zona 2, AV. MICAELA BASTIDAS.",
                    "hora_inicio": "06:59:00",
                    "hora_final": "07:04:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 161,
                    "nombre": "JR. TAMBO",
                    "descripcion": "Calle ubicada en la zona 2, JR. TAMBO.",
                    "hora_inicio": "07:04:00",
                    "hora_final": "07:09:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 162,
                    "nombre": "JR. SINCHI ROCA",
                    "descripcion": "Calle ubicada en la zona 2, JR. SINCHI ROCA.",
                    "hora_inicio": "07:09:00",
                    "hora_final": "07:15:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 163,
                    "nombre": "JR. MACHU PICCHU",
                    "descripcion": "Calle ubicada en la zona 2, JR. MACHU PICCHU.",
                    "hora_inicio": "07:15:00",
                    "hora_final": "07:21:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 164,
                    "nombre": "JR HUASCAR",
                    "descripcion": "Calle ubicada en la zona 2, JR HUASCAR.",
                    "hora_inicio": "07:21:00",
                    "hora_final": "07:26:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 165,
                    "nombre": "JR.CAHUIDE",
                    "descripcion": "Calle ubicada en la zona 2, JR.CAHUIDE.",
                    "hora_inicio": "07:26:00",
                    "hora_final": "07:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 166,
                    "nombre": "JR. SINCHI ROCA",
                    "descripcion": "Calle ubicada en la zona 2, JR. SINCHI ROCA.",
                    "hora_inicio": "07:30:00",
                    "hora_final": "07:36:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 167,
                    "nombre": "JR. MANCO INCA",
                    "descripcion": "Calle ubicada en la zona 2, JR. MANCO INCA.",
                    "hora_inicio": "07:36:00",
                    "hora_final": "07:40:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 168,
                    "nombre": "AV. MICAELA BASTIDAS",
                    "descripcion": "Calle ubicada en la zona 2, AV. MICAELA BASTIDAS.",
                    "hora_inicio": "07:40:00",
                    "hora_final": "07:45:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 169,
                    "nombre": "JR. JORGE CHAVEZ PLAZA DE ARMAS",
                    "descripcion": "Calle ubicada en la zona 2, JR. JORGE CHAVEZ PLAZA DE ARMAS.",
                    "hora_inicio": "07:45:00",
                    "hora_final": "07:51:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 170,
                    "nombre": "JR TUPAC YUPANQUI",
                    "descripcion": "Calle ubicada en la zona 2, JR TUPAC YUPANQUI.",
                    "hora_inicio": "07:51:00",
                    "hora_final": "07:54:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 171,
                    "nombre": "JR MANCO INCA",
                    "descripcion": "Calle ubicada en la zona 2, JR MANCO INCA.",
                    "hora_inicio": "07:54:00",
                    "hora_final": "07:59:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 172,
                    "nombre": "AV. MICAELA BASTIDAS",
                    "descripcion": "Calle ubicada en la zona 2, AV. MICAELA BASTIDAS.",
                    "hora_inicio": "07:59:00",
                    "hora_final": "08:04:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 173,
                    "nombre": "MALECON LOS INCAS",
                    "descripcion": "Calle ubicada en la zona 2, MALECON LOS INCAS.",
                    "hora_inicio": "08:04:00",
                    "hora_final": "08:09:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 174,
                    "nombre": "JR. YAWARWUACA",
                    "descripcion": "Calle ubicada en la zona 2, JR. YAWARWUACA.",
                    "hora_inicio": "08:09:00",
                    "hora_final": "08:14:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 175,
                    "nombre": "JR. KOTHOS",
                    "descripcion": "Calle ubicada en la zona 2, JR. KOTHOS.",
                    "hora_inicio": "08:14:00",
                    "hora_final": "08:19:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 176,
                    "nombre": "JR. TUPAC YUPNQUI",
                    "descripcion": "Calle ubicada en la zona 2, JR. TUPAC YUPNQUI.",
                    "hora_inicio": "08:19:00",
                    "hora_final": "08:23:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 177,
                    "nombre": "JR. COLLAS",
                    "descripcion": "Calle ubicada en la zona 2, JR. COLLAS.",
                    "hora_inicio": "08:23:00",
                    "hora_final": "08:28:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 178,
                    "nombre": "CALLE S/N",
                    "descripcion": "Calle ubicada en la zona 2, CALLE S/N.",
                    "hora_inicio": "08:28:00",
                    "hora_final": "08:33:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 179,
                    "nombre": "JR. LLOQUE YUPANQUI",
                    "descripcion": "Calle ubicada en la zona 2, JR. LLOQUE YUPANQUI.",
                    "hora_inicio": "08:33:00",
                    "hora_final": "08:37:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 180,
                    "nombre": "JR LOS CHASQUIS",
                    "descripcion": "Calle ubicada en la zona 2, JR LOS CHASQUIS.",
                    "hora_inicio": "08:37:00",
                    "hora_final": "08:41:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 181,
                    "nombre": "MALECON LOS INCAS",
                    "descripcion": "Calle ubicada en la zona 2, MALECON LOS INCAS.",
                    "hora_inicio": "08:41:00",
                    "hora_final": "08:46:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 182,
                    "nombre": "JR TUPAC AMARU",
                    "descripcion": "Calle ubicada en la zona 2, JR TUPAC AMARU.",
                    "hora_inicio": "08:46:00",
                    "hora_final": "08:51:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 183,
                    "nombre": "JR SACSAYHUAMAN",
                    "descripcion": "Calle ubicada en la zona 2, JR SACSAYHUAMAN.",
                    "hora_inicio": "08:51:00",
                    "hora_final": "08:54:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 184,
                    "nombre": "JR. TUPAC YUPNQUI",
                    "descripcion": "Calle ubicada en la zona 2, JR. TUPAC YUPNQUI.",
                    "hora_inicio": "08:54:00",
                    "hora_final": "09:00:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 185,
                    "nombre": "JR MANCO INCA",
                    "descripcion": "Calle ubicada en la zona 2, JR MANCO INCA.",
                    "hora_inicio": "09:00:00",
                    "hora_final": "09:06:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 186,
                    "nombre": "AV. TUPAC AMARU",
                    "descripcion": "Calle ubicada en la zona 2, AV. TUPAC AMARU.",
                    "hora_inicio": "09:06:00",
                    "hora_final": "09:11:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 187,
                    "nombre": "JR MAYTA CAPAC",
                    "descripcion": "Calle ubicada en la zona 2, JR MAYTA CAPAC.",
                    "hora_inicio": "09:11:00",
                    "hora_final": "09:16:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 188,
                    "nombre": "JR INCA ROCA",
                    "descripcion": "Calle ubicada en la zona 2, JR INCA ROCA.",
                    "hora_inicio": "09:16:00",
                    "hora_final": "09:21:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 189,
                    "nombre": "JR YAROHUILCA",
                    "descripcion": "Calle ubicada en la zona 2, JR YAROHUILCA.",
                    "hora_inicio": "09:21:00",
                    "hora_final": "09:26:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 190,
                    "nombre": "AV TUPAC AMARU",
                    "descripcion": "Calle ubicada en la zona 2, AV TUPAC AMARU.",
                    "hora_inicio": "09:26:00",
                    "hora_final": "09:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },
                {
                    "id": 191,
                    "nombre": "JR. LOS QUISPES",
                    "descripcion": "Calle ubicada en la zona 2, JR. LOS QUISPES.",
                    "hora_inicio": "09:30:00",
                    "hora_final": "09:35:00",
                    "numero_cuadra": 1,
                    "zona_id": 2
                },

                /* Paucarbambilla, Fonavi I, Zona 0 - Zona 3 */
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
                },

                /* San Luis S1, S2 y S3 - Zona 4 */
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
                },

                /* San Luis S4 y S5 - Zona 5 */
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
                },

                /* Llicua - Zona 6 */
                {
                    "id": 392,
                    "nombre": "PSJE SEÑOR DE BURGOS",
                    "descripcion": "Calle ubicada en la zona 6, PSJE SEÑOR DE BURGOS.",
                    "hora_inicio": "05:10:00",
                    "hora_final": "05:20:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 393,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "Calle ubicada en la zona 6, VIA REGIONAL.",
                    "hora_inicio": "05:20:00",
                    "hora_final": "05:25:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 394,
                    "nombre": "CALLE BRANCACHO",
                    "descripcion": "Calle ubicada en la zona 6, CALLE BRANCACHO.",
                    "hora_inicio": "05:25:00",
                    "hora_final": "05:27:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 395,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "Calle ubicada en la zona 6, VIA REGIONAL.",
                    "hora_inicio": "05:27:00",
                    "hora_final": "05:35:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 396,
                    "nombre": "VIA COLECTORA",
                    "descripcion": "Calle ubicada en la zona 6, VIA COLECTORA.",
                    "hora_inicio": "05:35:00",
                    "hora_final": "05:40:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 397,
                    "nombre": "CALLE 4",
                    "descripcion": "Calle ubicada en la zona 6, CALLE 4.",
                    "hora_inicio": "05:40:00",
                    "hora_final": "05:42:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 398,
                    "nombre": "CALLE 8 JR MAYRO",
                    "descripcion": "Calle ubicada en la zona 6, CALLE 8 JR MAYRO.",
                    "hora_inicio": "05:42:00",
                    "hora_final": "05:47:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 399,
                    "nombre": "JR MAYRO",
                    "descripcion": "Calle ubicada en la zona 6, JR MAYRO.",
                    "hora_inicio": "05:47:00",
                    "hora_final": "05:55:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 400,
                    "nombre": "URB SANTA ELENA PROGRESIVA",
                    "descripcion": "Calle ubicada en la zona 6, URB SANTA ELENA PROGRESIVA.",
                    "hora_inicio": "05:55:00",
                    "hora_final": "06:00:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 401,
                    "nombre": "JR MAYRO",
                    "descripcion": "Calle ubicada en la zona 6, JR MAYRO.",
                    "hora_inicio": "06:00:00",
                    "hora_final": "06:05:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 402,
                    "nombre": "CALLE 8",
                    "descripcion": "Calle ubicada en la zona 6, CALLE 8.",
                    "hora_inicio": "06:05:00",
                    "hora_final": "06:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 403,
                    "nombre": "CALE 6",
                    "descripcion": "Calle ubicada en la zona 6, CALE 6.",
                    "hora_inicio": "06:10:00",
                    "hora_final": "06:15:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 404,
                    "nombre": "CALLE 3",
                    "descripcion": "Calle ubicada en la zona 6, CALLE 3.",
                    "hora_inicio": "06:15:00",
                    "hora_final": "06:17:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 405,
                    "nombre": "CALLE 10",
                    "descripcion": "Calle ubicada en la zona 6, CALLE 10.",
                    "hora_inicio": "06:17:00",
                    "hora_final": "06:22:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 406,
                    "nombre": "CALLE 8",
                    "descripcion": "Calle ubicada en la zona 6, CALLE 8.",
                    "hora_inicio": "06:22:00",
                    "hora_final": "06:24:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 407,
                    "nombre": "PARQUE LEONCIO PRADO",
                    "descripcion": "Calle ubicada en la zona 6, PARQUE LEONCIO PRADO.",
                    "hora_inicio": "06:24:00",
                    "hora_final": "06:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 408,
                    "nombre": "CALLE 3",
                    "descripcion": "Calle ubicada en la zona 6, CALLE 3.",
                    "hora_inicio": "06:30:00",
                    "hora_final": "06:35:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 409,
                    "nombre": "VIA COLECTORA",
                    "descripcion": "Calle ubicada en la zona 6, VIA COLECTORA.",
                    "hora_inicio": "06:35:00",
                    "hora_final": "06:40:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 410,
                    "nombre": "JR LOS EUCALIPTOS",
                    "descripcion": "Calle ubicada en la zona 6, JR LOS EUCALIPTOS.",
                    "hora_inicio": "06:40:00",
                    "hora_final": "07:43:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 411,
                    "nombre": "CALLE LOS FICUS",
                    "descripcion": "Calle ubicada en la zona 6, CALLE LOS FICUS.",
                    "hora_inicio": "06:43:00",
                    "hora_final": "06:49:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 412,
                    "nombre": "CALLE LOS FRESNOS",
                    "descripcion": "Calle ubicada en la zona 6, CALLE LOS FRESNOS.",
                    "hora_inicio": "07:49:00",
                    "hora_final": "06:51:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 413,
                    "nombre": "CALLE LOS ALGARROBOS",
                    "descripcion": "Calle ubicada en la zona 6, CALLE LOS ALGARROBOS.",
                    "hora_inicio": "07:51:00",
                    "hora_final": "06:56:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 414,
                    "nombre": "JR LOS EUCALIPTOS",
                    "descripcion": "Calle ubicada en la zona 6, JR LOS EUCALIPTOS.",
                    "hora_inicio": "06:56:00",
                    "hora_final": "06:58:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 415,
                    "nombre": "CALLE LAS PALMERAS",
                    "descripcion": "Calle ubicada en la zona 6, CALLE LAS PALMERAS.",
                    "hora_inicio": "06:58:00",
                    "hora_final": "07:03:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 416,
                    "nombre": "CALLE LOS CASTAÑOS",
                    "descripcion": "Calle ubicada en la zona 6, CALLE LOS CASTAÑOS.",
                    "hora_inicio": "07:03:00",
                    "hora_final": "07:08:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 417,
                    "nombre": "JR LOS EUCALIPTOS",
                    "descripcion": "Calle ubicada en la zona 6, JR LOS EUCALIPTOS.",
                    "hora_inicio": "07:08:00",
                    "hora_final": "07:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 418,
                    "nombre": "VIA INTER REGIONAL, CALLE SANTA MARIA DEL HUALLAGA",
                    "descripcion": "Calle ubicada en la zona 6, VÍA INTER REGIONAL, CALLE SANTA MARIA DEL HUALLAGA.",
                    "hora_inicio": "07:10:00",
                    "hora_final": "07:18:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 419,
                    "nombre": "VIA INTER REGIONAL",
                    "descripcion": "Calle ubicada en la zona 6, VÍA INTER REGIONAL.",
                    "hora_inicio": "07:18:00",
                    "hora_final": "07:24:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 420,
                    "nombre": "CALLE LA PROGRESIVA",
                    "descripcion": "Calle ubicada en la zona 6, CALLE LA PROGRESIVA.",
                    "hora_inicio": "07:24:00",
                    "hora_final": "07:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 421,
                    "nombre": "AV. LOS SAUCES",
                    "descripcion": "Calle ubicada en la zona 6, AV. LOS SAUCES.",
                    "hora_inicio": "07:30:00",
                    "hora_final": "07:40:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 422,
                    "nombre": "CALLE LAS ASUCENAS",
                    "descripcion": "Calle ubicada en la zona 6, CALLE LAS ASUCENAS.",
                    "hora_inicio": "07:40:00",
                    "hora_final": "07:45:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 423,
                    "nombre": "PRQ SEÑOR DE LOS MILAGROS",
                    "descripcion": "Calle ubicada en la zona 6, PRQ SEÑOR DE LOS MILAGROS.",
                    "hora_inicio": "07:45:00",
                    "hora_final": "07:50:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 424,
                    "nombre": "CALLE LAS AZUCENAS",
                    "descripcion": "Calle ubicada en la zona 6, CALLE LAS AZUCENAS.",
                    "hora_inicio": "07:50:00",
                    "hora_final": "08:00:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 425,
                    "nombre": "JR LOMA UMBROSA",
                    "descripcion": "Calle ubicada en la zona 6, JR LOMA UMBROSA.",
                    "hora_inicio": "08:00:00",
                    "hora_final": "08:04:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 426,
                    "nombre": "AV. LA COLECTORA, FONAVI III.",
                    "descripcion": "Calle ubicada en la zona 6, AV. LA COLECTORA, FONAVI III.",
                    "hora_inicio": "08:04:00",
                    "hora_final": "08:15:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 427,
                    "nombre": "VIA COLECTORA",
                    "descripcion": "Calle ubicada en la zona 6, VIA COLECTORA.",
                    "hora_inicio": "08:15:00",
                    "hora_final": "08:16:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 428,
                    "nombre": "JR LOMA UMBROSA",
                    "descripcion": "Calle ubicada en la zona 6, JR LOMA UMBROSA.",
                    "hora_inicio": "08:16:00",
                    "hora_final": "08:18:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 429,
                    "nombre": "CALLE LOS NARANJOS",
                    "descripcion": "Calle ubicada en la zona 6, CALLE LOS NARANJOS.",
                    "hora_inicio": "08:18:00",
                    "hora_final": "08:24:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 430,
                    "nombre": "CALLE LAS MARAVILLAS",
                    "descripcion": "Calle ubicada en la zona 6, CALLE LAS MARAVILLAS.",
                    "hora_inicio": "08:24:00",
                    "hora_final": "08:32:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 431,
                    "nombre": "VIA INTER REGIONAL",
                    "descripcion": "Calle ubicada en la zona 6, VÍA INTER REGIONAL.",
                    "hora_inicio": "08:32:00",
                    "hora_final": "08:35:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 432,
                    "nombre": "JR PORTADA DEL SOL",
                    "descripcion": "Calle ubicada en la zona 6, JR PORTADA DEL SOL.",
                    "hora_inicio": "08:35:00",
                    "hora_final": "08:43:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 433,
                    "nombre": "VIA COLECTORA",
                    "descripcion": "Calle ubicada en la zona 6, VIA COLECTORA.",
                    "hora_inicio": "08:43:00",
                    "hora_final": "08:45:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 434,
                    "nombre": "CALLE SAN MIGUEL",
                    "descripcion": "Calle ubicada en la zona 6, CALLE SAN MIGUEL.",
                    "hora_inicio": "08:45:00",
                    "hora_final": "08:51:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 435,
                    "nombre": "JR PORTADA DEL SOL",
                    "descripcion": "Calle ubicada en la zona 6, JR PORTADA DEL SOL.",
                    "hora_inicio": "08:51:00",
                    "hora_final": "08:54:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 436,
                    "nombre": "VIA INTER REGIONAL",
                    "descripcion": "Calle ubicada en la zona 6, VÍA INTER REGIONAL.",
                    "hora_inicio": "08:54:00",
                    "hora_final": "09:00:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 437,
                    "nombre": "JR PRIMAVERA",
                    "descripcion": "Calle ubicada en la zona 6, JR PRIMAVERA.",
                    "hora_inicio": "09:00:00",
                    "hora_final": "09:06:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 438,
                    "nombre": "VIA COLECTORA",
                    "descripcion": "Calle ubicada en la zona 6, VIA COLECTORA.",
                    "hora_inicio": "09:06:00",
                    "hora_final": "09:07:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 439,
                    "nombre": "CALLE URB PRIMAVERA",
                    "descripcion": "Calle ubicada en la zona 6, CALLE URB PRIMAVERA.",
                    "hora_inicio": "09:07:00",
                    "hora_final": "09:11:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 440,
                    "nombre": "JR LOS HUARANGOS",
                    "descripcion": "Calle ubicada en la zona 6, JR LOS HUARANGOS.",
                    "hora_inicio": "09:11:00",
                    "hora_final": "09:16:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 441,
                    "nombre": "JR PRIMAVERA",
                    "descripcion": "Calle ubicada en la zona 6, JR PRIMAVERA.",
                    "hora_inicio": "09:16:00",
                    "hora_final": "09:18:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 442,
                    "nombre": "JR LOS JACARANDAS",
                    "descripcion": "Calle ubicada en la zona 6, JR LOS JACARANDAS.",
                    "hora_inicio": "09:18:00",
                    "hora_final": "09:24:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 443,
                    "nombre": "CALLE URB PRIMAVERA",
                    "descripcion": "Calle ubicada en la zona 6, CALLE URB PRIMAVERA.",
                    "hora_inicio": "09:24:00",
                    "hora_final": "09:25:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 444,
                    "nombre": "JR EL PARQUE",
                    "descripcion": "Calle ubicada en la zona 6, JR EL PARQUE.",
                    "hora_inicio": "09:25:00",
                    "hora_final": "09:29:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 445,
                    "nombre": "JR LOS ALAMOS",
                    "descripcion": "Calle ubicada en la zona 6, JR LOS ALAMOS.",
                    "hora_inicio": "09:29:00",
                    "hora_final": "09:33:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 446,
                    "nombre": "VIA INTER REGIONAL",
                    "descripcion": "Calle ubicada en la zona 6, VÍA INTER REGIONAL.",
                    "hora_inicio": "09:33:00",
                    "hora_final": "09:37:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 447,
                    "nombre": "CALLE URB PRIMAVERA",
                    "descripcion": "Calle ubicada en la zona 6, CALLE URB PRIMAVERA.",
                    "hora_inicio": "09:37:00",
                    "hora_final": "09:42:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 448,
                    "nombre": "PASAJE SAN FRANCISCO",
                    "descripcion": "Calle ubicada en la zona 6, PASAJE SAN FRANCISCO.",
                    "hora_inicio": "09:42:00",
                    "hora_final": "09:50:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 449,
                    "nombre": "VIA INTER REGIONAL",
                    "descripcion": "Calle ubicada en la zona 6, VÍA INTER REGIONAL.",
                    "hora_inicio": "09:50:00",
                    "hora_final": "09:52:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 450,
                    "nombre": "CALLE LOS ALAMOS",
                    "descripcion": "Calle ubicada en la zona 6, CALLE LOS ALAMOS.",
                    "hora_inicio": "09:52:00",
                    "hora_final": "09:56:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 451,
                    "nombre": "CALLE COOP. SAN FRANCISCO",
                    "descripcion": "Calle ubicada en la zona 6, CALLE COOP. SAN FRANCISCO.",
                    "hora_inicio": "09:56:00",
                    "hora_final": "10:01:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 452,
                    "nombre": "VIA COLECTORA",
                    "descripcion": "Calle ubicada en la zona 6, VIA COLECTORA.",
                    "hora_inicio": "10:01:00",
                    "hora_final": "10:02:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 453,
                    "nombre": "JR ABU DABI",
                    "descripcion": "Calle ubicada en la zona 6, JR ABU DABI.",
                    "hora_inicio": "10:02:00",
                    "hora_final": "10:07:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 454,
                    "nombre": "VIA INTER REGIONAL",
                    "descripcion": "Calle ubicada en la zona 6, VIA INTER REGIONAL.",
                    "hora_inicio": "10:07:00",
                    "hora_final": "10:09:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 455,
                    "nombre": "CALLE CALICANTO",
                    "descripcion": "Calle ubicada en la zona 6, CALLE CALICANTO.",
                    "hora_inicio": "10:09:00",
                    "hora_final": "10:15:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 456,
                    "nombre": "VIA COLECTORA",
                    "descripcion": "Calle ubicada en la zona 6, VIA COLECTORA.",
                    "hora_inicio": "10:15:00",
                    "hora_final": "10:16:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 457,
                    "nombre": "JR VICTOR R. HAYA DE LA TORRE",
                    "descripcion": "Calle ubicada en la zona 6, JR VICTOR R. HAYA DE LA TORRE.",
                    "hora_inicio": "10:16:00",
                    "hora_final": "10:22:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 458,
                    "nombre": "VIA INTER REGIONAL",
                    "descripcion": "Calle ubicada en la zona 6, VIA INTER REGIONAL.",
                    "hora_inicio": "10:22:00",
                    "hora_final": "10:24:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 459,
                    "nombre": "JR SANTA ELENA",
                    "descripcion": "Calle ubicada en la zona 6, JR SANTA ELENA.",
                    "hora_inicio": "10:24:00",
                    "hora_final": "10:32:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 460,
                    "nombre": "VIA COLECTORA",
                    "descripcion": "Calle ubicada en la zona 6, VIA COLECTORA.",
                    "hora_inicio": "10:32:00",
                    "hora_final": "10:33:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 461,
                    "nombre": "CALLE 1",
                    "descripcion": "Calle ubicada en la zona 6, CALLE 1.",
                    "hora_inicio": "10:33:00",
                    "hora_final": "10:36:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 462,
                    "nombre": "CALLE LEONCIO PRADO",
                    "descripcion": "Calle ubicada en la zona 6, CALLE LEONCIO PRADO.",
                    "hora_inicio": "10:36:00",
                    "hora_final": "10:42:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 463,
                    "nombre": "VIA COLECTORA",
                    "descripcion": "Calle ubicada en la zona 6, VIA COLECTORA.",
                    "hora_inicio": "10:42:00",
                    "hora_final": "10:44:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },
                {
                    "id": 464,
                    "nombre": "VIA REGIONAL FIN DE RUTA",
                    "descripcion": "Calle ubicada en la zona 6, VIA REGIONAL FIN DE RUTA.",
                    "hora_inicio": "10:44:00",
                    "hora_final": "10:55:00",
                    "numero_cuadra": 1,
                    "zona_id": 6
                },

                /* Fonavi II Sauce - Zona 7 */
                {
                    "id": 305,
                    "nombre": "CALLE 1, URB LEONCIO P.",
                    "descripcion": "Calle ubicada en la zona 7, CALLE 1, URB LEONCIO P.",
                    "hora_inicio": "05:20:00",
                    "hora_final": "05:25:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 306,
                    "nombre": "VIA COLECTORA",
                    "descripcion": "Calle ubicada en la zona 7, VIA COLECTORA.",
                    "hora_inicio": "05:25:00",
                    "hora_final": "05:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 307,
                    "nombre": "JR MANGLARES",
                    "descripcion": "Calle ubicada en la zona 7, JR MANGLARES.",
                    "hora_inicio": "05:30:00",
                    "hora_final": "05:32:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 308,
                    "nombre": "VIA COLECTORA",
                    "descripcion": "Calle ubicada en la zona 7, VIA COLECTORA.",
                    "hora_inicio": "05:32:00",
                    "hora_final": "05:35:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 309,
                    "nombre": "JR LOS EUCALIPTOS",
                    "descripcion": "Calle ubicada en la zona 7, JR LOS EUCALIPTOS.",
                    "hora_inicio": "05:35:00",
                    "hora_final": "05:40:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 310,
                    "nombre": "JR LOS PORTALES",
                    "descripcion": "Calle ubicada en la zona 7, JR LOS PORTALES.",
                    "hora_inicio": "05:40:00",
                    "hora_final": "05:45:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 311,
                    "nombre": "AV. LOS SUCES",
                    "descripcion": "Calle ubicada en la zona 7, AV. LOS SUCES.",
                    "hora_inicio": "05:45:00",
                    "hora_final": "05:50:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 312,
                    "nombre": "JR LOS NOGALES",
                    "descripcion": "Calle ubicada en la zona 7, JR LOS NOGALES.",
                    "hora_inicio": "05:50:00",
                    "hora_final": "05:55:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 313,
                    "nombre": "JR LAS ALMENDRAS",
                    "descripcion": "Calle ubicada en la zona 7, JR LAS ALMENDRAS.",
                    "hora_inicio": "06:00:00",
                    "hora_final": "06:05:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 314,
                    "nombre": "JR LOS CEREZOS",
                    "descripcion": "Calle ubicada en la zona 7, JR LOS CEREZOS.",
                    "hora_inicio": "06:05:00",
                    "hora_final": "06:08:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 315,
                    "nombre": "JR LOS OLMOS",
                    "descripcion": "Calle ubicada en la zona 7, JR LOS OLMOS.",
                    "hora_inicio": "06:08:00",
                    "hora_final": "06:11:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 316,
                    "nombre": "JR LOS PINOS",
                    "descripcion": "Calle ubicada en la zona 7, JR LOS PINOS.",
                    "hora_inicio": "06:11:00",
                    "hora_final": "06:13:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 317,
                    "nombre": "JR LOS CEDROS",
                    "descripcion": "Calle ubicada en la zona 7, JR LOS CEDROS.",
                    "hora_inicio": "06:13:00",
                    "hora_final": "06:15:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 318,
                    "nombre": "JR LOS OLIVOS",
                    "descripcion": "Calle ubicada en la zona 7, JR LOS OLIVOS.",
                    "hora_inicio": "06:18:00",
                    "hora_final": "06:20:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 319,
                    "nombre": "JR LOS OLMOS",
                    "descripcion": "Calle ubicada en la zona 7, JR LOS OLMOS.",
                    "hora_inicio": "06:20:00",
                    "hora_final": "06:22:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 320,
                    "nombre": "JR LOS CEREZOS",
                    "descripcion": "Calle ubicada en la zona 7, JR LOS CEREZOS.",
                    "hora_inicio": "06:22:00",
                    "hora_final": "06:25:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 321,
                    "nombre": "JR LAS CASUARINAS",
                    "descripcion": "Calle ubicada en la zona 7, JR LAS CASUARINAS.",
                    "hora_inicio": "06:25:00",
                    "hora_final": "06:28:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 322,
                    "nombre": "JR LOS NOGALES",
                    "descripcion": "Calle ubicada en la zona 7, JR LOS NOGALES.",
                    "hora_inicio": "06:28:00",
                    "hora_final": "06:31:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 323,
                    "nombre": "AV. LOS SUCES",
                    "descripcion": "Calle ubicada en la zona 7, AV. LOS SUCES.",
                    "hora_inicio": "06:31:00",
                    "hora_final": "06:34:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 324,
                    "nombre": "CALLE LA PROGRESIVA",
                    "descripcion": "Calle ubicada en la zona 7, CALLE LA PROGRESIVA.",
                    "hora_inicio": "06:34:00",
                    "hora_final": "06:38:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 325,
                    "nombre": "CALLE ANTURIO",
                    "descripcion": "Calle ubicada en la zona 7, CALLE ANTURIO.",
                    "hora_inicio": "06:38:00",
                    "hora_final": "06:41:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 326,
                    "nombre": "JR SANTA MARIA",
                    "descripcion": "Calle ubicada en la zona 7, JR SANTA MARIA.",
                    "hora_inicio": "06:41:00",
                    "hora_final": "06:44:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 327,
                    "nombre": "CALLE LAS PALMERAS",
                    "descripcion": "Calle ubicada en la zona 7, CALLE LAS PALMERAS.",
                    "hora_inicio": "06:44:00",
                    "hora_final": "06:47:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 328,
                    "nombre": "JR LOS CEDROS",
                    "descripcion": "Calle ubicada en la zona 7, JR LOS CEDROS.",
                    "hora_inicio": "06:47:00",
                    "hora_final": "06:51:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 329,
                    "nombre": "CALLE PROGRESIVA",
                    "descripcion": "Calle ubicada en la zona 7, CALLE PROGRESIVA.",
                    "hora_inicio": "06:51:00",
                    "hora_final": "06:56:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 330,
                    "nombre": "PSJE CAMELIA",
                    "descripcion": "Calle ubicada en la zona 7, PSJE CAMELIA.",
                    "hora_inicio": "06:56:00",
                    "hora_final": "07:00:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 331,
                    "nombre": "CALLE PROGRESIVA",
                    "descripcion": "Calle ubicada en la zona 7, CALLE PROGRESIVA.",
                    "hora_inicio": "07:00:00",
                    "hora_final": "07:02:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 332,
                    "nombre": "JR LOMA UMBROSA",
                    "descripcion": "Calle ubicada en la zona 7, JR LOMA UMBROSA.",
                    "hora_inicio": "07:02:00",
                    "hora_final": "07:06:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 333,
                    "nombre": "JR LAS LOMAS DE S. BLAS",
                    "descripcion": "Calle ubicada en la zona 7, JR LAS LOMAS DE S. BLAS.",
                    "hora_inicio": "07:06:00",
                    "hora_final": "07:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 334,
                    "nombre": "JR PORTADA DEL SOL",
                    "descripcion": "Calle ubicada en la zona 7, JR PORTADA DEL SOL.",
                    "hora_inicio": "07:10:00",
                    "hora_final": "07:11:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 335,
                    "nombre": "JR LOMA VERDE",
                    "descripcion": "Calle ubicada en la zona 7, JR LOMA VERDE.",
                    "hora_inicio": "07:11:00",
                    "hora_final": "07:15:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 336,
                    "nombre": "JR LOMA HERMOSA",
                    "descripcion": "Calle ubicada en la zona 7, JR LOMA HERMOSA.",
                    "hora_inicio": "07:15:00",
                    "hora_final": "07:20:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 337,
                    "nombre": "VIA COLECTORA",
                    "descripcion": "Calle ubicada en la zona 7, VIA COLECTORA.",
                    "hora_inicio": "07:20:00",
                    "hora_final": "07:20:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 338,
                    "nombre": "BREAK",
                    "descripcion": "Tiempo de descanso.",
                    "hora_inicio": "07:20:00",
                    "hora_final": "07:25:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 339,
                    "nombre": "PASAJE LAS MARAVILLAS",
                    "descripcion": "Calle ubicada en la zona 7, PASAJE LAS MARAVILLAS.",
                    "hora_inicio": "07:25:00",
                    "hora_final": "07:35:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 340,
                    "nombre": "JR LOMA VERDE",
                    "descripcion": "Calle ubicada en la zona 7, JR LOMA VERDE.",
                    "hora_inicio": "07:35:00",
                    "hora_final": "07:45:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 341,
                    "nombre": "JR LAS PAVAS",
                    "descripcion": "Calle ubicada en la zona 7, JR LAS PAVAS.",
                    "hora_inicio": "08:00:00",
                    "hora_final": "08:16:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 342,
                    "nombre": "VIA COLECTOTRA",
                    "descripcion": "Calle ubicada en la zona 7, VIA COLECTOTRA.",
                    "hora_inicio": "08:16:00",
                    "hora_final": "08:17:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 343,
                    "nombre": "JR PORTADA DEL SOL",
                    "descripcion": "Calle ubicada en la zona 7, JR PORTADA DEL SOL.",
                    "hora_inicio": "08:17:00",
                    "hora_final": "08:21:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 344,
                    "nombre": "JR BELLA DURMIENTE",
                    "descripcion": "Calle ubicada en la zona 7, JR BELLA DURMIENTE.",
                    "hora_inicio": "08:21:00",
                    "hora_final": "08:24:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 345,
                    "nombre": "JR LAS PAVAS",
                    "descripcion": "Calle ubicada en la zona 7, JR LAS PAVAS.",
                    "hora_inicio": "08:24:00",
                    "hora_final": "08:26:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 346,
                    "nombre": "JR LOMA VERDE",
                    "descripcion": "Calle ubicada en la zona 7, JR LOMA VERDE.",
                    "hora_inicio": "08:26:00",
                    "hora_final": "08:29:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 347,
                    "nombre": "JR PORTADA DEL SOL",
                    "descripcion": "Calle ubicada en la zona 7, JR PORTADA DEL SOL.",
                    "hora_inicio": "08:29:00",
                    "hora_final": "08:32:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 348,
                    "nombre": "JR CULTURA",
                    "descripcion": "Calle ubicada en la zona 7, JR CULTURA.",
                    "hora_inicio": "08:32:00",
                    "hora_final": "08:35:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 349,
                    "nombre": "JR CULTURA",
                    "descripcion": "Calle ubicada en la zona 7, JR CULTURA.",
                    "hora_inicio": "08:35:00",
                    "hora_final": "08:39:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 350,
                    "nombre": "JR KOREA DEL NORTE",
                    "descripcion": "Calle ubicada en la zona 7, JR KOREA DEL NORTE.",
                    "hora_inicio": "08:39:00",
                    "hora_final": "08:41:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 351,
                    "nombre": "JR COREA DEL SUR",
                    "descripcion": "Calle ubicada en la zona 7, JR COREA DEL SUR.",
                    "hora_inicio": "08:32:00",
                    "hora_final": "08:36:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 352,
                    "nombre": "AV. PRIMAVERA",
                    "descripcion": "Calle ubicada en la zona 7, AV. PRIMAVERA.",
                    "hora_inicio": "08:36:00",
                    "hora_final": "08:41:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 353,
                    "nombre": "JR JAPON",
                    "descripcion": "Calle ubicada en la zona 7, JR JAPON.",
                    "hora_inicio": "08:41:00",
                    "hora_final": "08:43:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 354,
                    "nombre": "JR INDONESIA",
                    "descripcion": "Calle ubicada en la zona 7, JR INDONESIA.",
                    "hora_inicio": "08:43:00",
                    "hora_final": "08:45:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 355,
                    "nombre": "JR ASIA",
                    "descripcion": "Calle ubicada en la zona 7, JR ASIA.",
                    "hora_inicio": "08:45:00",
                    "hora_final": "08:48:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 356,
                    "nombre": "JR KOREA DEL NORTE",
                    "descripcion": "Calle ubicada en la zona 7, JR KOREA DEL NORTE.",
                    "hora_inicio": "08:48:00",
                    "hora_final": "08:50:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 357,
                    "nombre": "JR JAPON",
                    "descripcion": "Calle ubicada en la zona 7, JR JAPON.",
                    "hora_inicio": "08:50:00",
                    "hora_final": "08:52:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 358,
                    "nombre": "JR TAIWAN",
                    "descripcion": "Calle ubicada en la zona 7, JR TAIWAN.",
                    "hora_inicio": "08:52:00",
                    "hora_final": "08:55:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 359,
                    "nombre": "JR ASIA",
                    "descripcion": "Calle ubicada en la zona 7, JR ASIA.",
                    "hora_inicio": "08:55:00",
                    "hora_final": "08:55:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 360,
                    "nombre": "JR KOREA DEL NORTE",
                    "descripcion": "Calle ubicada en la zona 7, JR KOREA DEL NORTE.",
                    "hora_inicio": "08:55:00",
                    "hora_final": "08:57:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 361,
                    "nombre": "JR CULTURA",
                    "descripcion": "Calle ubicada en la zona 7, JR CULTURA.",
                    "hora_inicio": "08:57:00",
                    "hora_final": "09:02:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 362,
                    "nombre": "JR QATAR",
                    "descripcion": "Calle ubicada en la zona 7, JR QATAR.",
                    "hora_inicio": "09:02:00",
                    "hora_final": "09:05:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 363,
                    "nombre": "CALLE DUBAI",
                    "descripcion": "Calle ubicada en la zona 7, CALLE DUBAI.",
                    "hora_inicio": "09:05:00",
                    "hora_final": "09:08:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 364,
                    "nombre": "JR KOREA DEL NORTE",
                    "descripcion": "Calle ubicada en la zona 7, JR KOREA DEL NORTE.",
                    "hora_inicio": "09:08:00",
                    "hora_final": "09:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 365,
                    "nombre": "JR COREA DEL SUR",
                    "descripcion": "Calle ubicada en la zona 7, JR COREA DEL SUR.",
                    "hora_inicio": "09:10:00",
                    "hora_final": "09:13:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 366,
                    "nombre": "CALLE LOS ALAMOS",
                    "descripcion": "Calle ubicada en la zona 7, CALLE LOS ALAMOS.",
                    "hora_inicio": "09:13:00",
                    "hora_final": "09:18:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 367,
                    "nombre": "VIA COLECTORA",
                    "descripcion": "Calle ubicada en la zona 7, VIA COLECTORA.",
                    "hora_inicio": "09:18:00",
                    "hora_final": "10:15:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 368,
                    "nombre": "JR ABU DABI",
                    "descripcion": "Calle ubicada en la zona 7, JR ABU DABI.",
                    "hora_inicio": "10:15:00",
                    "hora_final": "10:18:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 369,
                    "nombre": "JR LA CULTURA",
                    "descripcion": "Calle ubicada en la zona 7, JR LA CULTURA.",
                    "hora_inicio": "10:18:00",
                    "hora_final": "10:18:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 370,
                    "nombre": "URB SANTA ELENA, CALLE A",
                    "descripcion": "Calle ubicada en la zona 7, URB SANTA ELENA, CALLE A.",
                    "hora_inicio": "10:18:00",
                    "hora_final": "10:23:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 371,
                    "nombre": "URB SANTA ELENA, CALLE C",
                    "descripcion": "Calle ubicada en la zona 7, URB SANTA ELENA, CALLE C.",
                    "hora_inicio": "10:23:00",
                    "hora_final": "10:27:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 372,
                    "nombre": "JR LA CULTURA",
                    "descripcion": "Calle ubicada en la zona 7, JR LA CULTURA.",
                    "hora_inicio": "10:27:00",
                    "hora_final": "10:28:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 373,
                    "nombre": "URB SANTA ELENA MZ F",
                    "descripcion": "Calle ubicada en la zona 7, URB SANTA ELENA MZ F.",
                    "hora_inicio": "10:28:00",
                    "hora_final": "10:33:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 374,
                    "nombre": "CALLE SANTA ELENA",
                    "descripcion": "Calle ubicada en la zona 7, CALLE SANTA ELENA.",
                    "hora_inicio": "10:33:00",
                    "hora_final": "10:35:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 375,
                    "nombre": "JR V. RAUL H. DE LA TORRE",
                    "descripcion": "Calle ubicada en la zona 7, JR V. RAUL H. DE LA TORRE.",
                    "hora_inicio": "10:35:00",
                    "hora_final": "10:40:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 376,
                    "nombre": "JR CULTURA",
                    "descripcion": "Calle ubicada en la zona 7, JR CULTURA.",
                    "hora_inicio": "10:47:00",
                    "hora_final": "10:47:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 377,
                    "nombre": "JR JULIO A. RUIS VASQUEZ",
                    "descripcion": "Calle ubicada en la zona 7, JR JULIO A. RUIS VASQUEZ.",
                    "hora_inicio": "10:47:00",
                    "hora_final": "11:05:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 378,
                    "nombre": "VIA COLETORA",
                    "descripcion": "Calle ubicada en la zona 7, VIA COLETORA.",
                    "hora_inicio": "11:05:00",
                    "hora_final": "10:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },
                {
                    "id": 379,
                    "nombre": "VIA COLECTORA REGRESO",
                    "descripcion": "Calle ubicada en la zona 7, VIA COLECTORA REGRESO.",
                    "hora_inicio": "11:10:00",
                    "hora_final": "11:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 7
                },

                /* Huayopampa - Zona 8 */
                {
                    "id": 243,
                    "nombre": "VIA REGIONAL, CATARATAS",
                    "descripcion": "Calle ubicada en la zona 8, VIA REGIONAL, CATARATAS.",
                    "hora_inicio": "05:20:00",
                    "hora_final": "05:25:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 244,
                    "nombre": "CALLE LOS MANGLARES",
                    "descripcion": "Calle ubicada en la zona 8, CALLE LOS MANGLARES.",
                    "hora_inicio": "05:25:00",
                    "hora_final": "05:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 245,
                    "nombre": "VIA COLECTORA",
                    "descripcion": "Calle ubicada en la zona 8, VIA COLECTORA.",
                    "hora_inicio": "05:30:00",
                    "hora_final": "05:35:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 246,
                    "nombre": "CALLE MIRAFLORES",
                    "descripcion": "Calle ubicada en la zona 8, CALLE MIRAFLORES.",
                    "hora_inicio": "05:35:00",
                    "hora_final": "05:42:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 247,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "Calle ubicada en la zona 8, VIA REGIONAL.",
                    "hora_inicio": "05:42:00",
                    "hora_final": "05:50:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 248,
                    "nombre": "CALLE LOS FRESNOS",
                    "descripcion": "Calle ubicada en la zona 8, CALLE LOS FRESNOS.",
                    "hora_inicio": "05:50:00",
                    "hora_final": "05:55:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 249,
                    "nombre": "AV. FERNANDO B. DE TERRY",
                    "descripcion": "Calle ubicada en la zona 8, AV. FERNANDO B. DE TERRY.",
                    "hora_inicio": "05:55:00",
                    "hora_final": "06:05:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 250,
                    "nombre": "CALLE ESMERALDAS",
                    "descripcion": "Calle ubicada en la zona 8, CALLE ESMERALDAS.",
                    "hora_inicio": "06:05:00",
                    "hora_final": "06:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 251,
                    "nombre": "JR CUCULI",
                    "descripcion": "Calle ubicada en la zona 8, JR CUCULI.",
                    "hora_inicio": "06:10:00",
                    "hora_final": "06:17:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 252,
                    "nombre": "CALLE LOS FRESNOS",
                    "descripcion": "Calle ubicada en la zona 8, CALLE LOS FRESNOS.",
                    "hora_inicio": "06:17:00",
                    "hora_final": "06:20:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 253,
                    "nombre": "URB SAN ZEFORA",
                    "descripcion": "Calle ubicada en la zona 8, URB SAN ZEFORA.",
                    "hora_inicio": "06:20:00",
                    "hora_final": "06:35:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 254,
                    "nombre": "CALLE LAS ESMERALDAS",
                    "descripcion": "Calle ubicada en la zona 8, CALLE LAS ESMERALDAS.",
                    "hora_inicio": "06:35:00",
                    "hora_final": "06:37:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 255,
                    "nombre": "CALLE MALECON",
                    "descripcion": "Calle ubicada en la zona 8, CALLE MALECON.",
                    "hora_inicio": "06:37:00",
                    "hora_final": "06:42:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 256,
                    "nombre": "MALECON HUALLAGA",
                    "descripcion": "Calle ubicada en la zona 8, MALECON HUALLAGA.",
                    "hora_inicio": "06:42:00",
                    "hora_final": "06:45:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 257,
                    "nombre": "CALLE LAS ESMERALDAS",
                    "descripcion": "Calle ubicada en la zona 8, CALLE LAS ESMERALDAS.",
                    "hora_inicio": "06:45:00",
                    "hora_final": "06:51:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 258,
                    "nombre": "HUAYOPAMPA",
                    "descripcion": "Calle ubicada en la zona 8, HUAYOPAMPA.",
                    "hora_inicio": "06:51:00",
                    "hora_final": "06:53:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 259,
                    "nombre": "JR LAS PERDICES",
                    "descripcion": "Calle ubicada en la zona 8, JR LAS PERDICES.",
                    "hora_inicio": "06:53:00",
                    "hora_final": "07:00:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 260,
                    "nombre": "MALECON H. HUAYOPAMPA",
                    "descripcion": "Calle ubicada en la zona 8, MALECON H. HUAYOPAMPA.",
                    "hora_inicio": "07:00:00",
                    "hora_final": "07:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 261,
                    "nombre": "AV SEÑOR DE HUAYOPAMPA",
                    "descripcion": "Calle ubicada en la zona 8, AV SEÑOR DE HUAYOPAMPA.",
                    "hora_inicio": "07:10:00",
                    "hora_final": "07:12:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 262,
                    "nombre": "JR LAS GAVIOTAS",
                    "descripcion": "Calle ubicada en la zona 8, JR LAS GAVIOTAS.",
                    "hora_inicio": "07:12:00",
                    "hora_final": "07:17:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 263,
                    "nombre": "JR LOS JILGUEROS",
                    "descripcion": "Calle ubicada en la zona 8, JR LOS JILGUEROS.",
                    "hora_inicio": "07:17:00",
                    "hora_final": "07:22:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 264,
                    "nombre": "AV SEÑOR DE HUAYOPAMPA",
                    "descripcion": "Calle ubicada en la zona 8, AV SEÑOR DE HUAYOPAMPA.",
                    "hora_inicio": "07:22:00",
                    "hora_final": "07:23:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 265,
                    "nombre": "JR LAS GARZAS",
                    "descripcion": "Calle ubicada en la zona 8, JR LAS GARZAS.",
                    "hora_inicio": "07:23:00",
                    "hora_final": "07:28:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 266,
                    "nombre": "URB H, LAS LLANTAS",
                    "descripcion": "Calle ubicada en la zona 8, URB H, LAS LLANTAS.",
                    "hora_inicio": "07:28:00",
                    "hora_final": "07:32:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 267,
                    "nombre": "JR LAS GOLONDRINAS",
                    "descripcion": "Calle ubicada en la zona 8, JR LAS GOLONDRINAS.",
                    "hora_inicio": "07:32:00",
                    "hora_final": "07:37:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 268,
                    "nombre": "AV HUAYOPAMPA",
                    "descripcion": "Calle ubicada en la zona 8, AV HUAYOPAMPA.",
                    "hora_inicio": "08:00:00",
                    "hora_final": "08:00:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 269,
                    "nombre": "AV SEÑOR DE HUAYOPAMPA",
                    "descripcion": "Calle ubicada en la zona 8, AV SEÑOR DE HUAYOPAMPA.",
                    "hora_inicio": "08:00:00",
                    "hora_final": "08:05:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 270,
                    "nombre": "AV HUAYOPAMPA",
                    "descripcion": "Calle ubicada en la zona 8, AV HUAYOPAMPA.",
                    "hora_inicio": "08:05:00",
                    "hora_final": "08:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 271,
                    "nombre": "JR LOS JILGUEROS",
                    "descripcion": "Calle ubicada en la zona 8, JR LOS JILGUEROS.",
                    "hora_inicio": "08:10:00",
                    "hora_final": "08:13:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 272,
                    "nombre": "AV HUAYOPAMPA",
                    "descripcion": "Calle ubicada en la zona 8, AV HUAYOPAMPA.",
                    "hora_inicio": "08:13:00",
                    "hora_final": "08:17:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 273,
                    "nombre": "PSJE LOS CIPRESES",
                    "descripcion": "Calle ubicada en la zona 8, PSJE LOS CIPRESES.",
                    "hora_inicio": "08:17:00",
                    "hora_final": "08:23:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 274,
                    "nombre": "JR LOS TULIPANES",
                    "descripcion": "Calle ubicada en la zona 8, JR LOS TULIPANES.",
                    "hora_inicio": "08:23:00",
                    "hora_final": "08:27:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 275,
                    "nombre": "AV HUAYOPAMPA",
                    "descripcion": "Calle ubicada en la zona 8, AV HUAYOPAMPA.",
                    "hora_inicio": "08:27:00",
                    "hora_final": "08:28:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 276,
                    "nombre": "AV. SEÑOR DE HUAYOPAMPA",
                    "descripcion": "Calle ubicada en la zona 8, AV. SEÑOR DE HUAYOPAMPA.",
                    "hora_inicio": "08:28:00",
                    "hora_final": "08:32:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 277,
                    "nombre": "JR LOS NARDOS",
                    "descripcion": "Calle ubicada en la zona 8, JR LOS NARDOS.",
                    "hora_inicio": "08:32:00",
                    "hora_final": "08:35:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 278,
                    "nombre": "JR LOS TULIPANES",
                    "descripcion": "Calle ubicada en la zona 8, JR LOS TULIPANES.",
                    "hora_inicio": "08:35:00",
                    "hora_final": "08:40:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 279,
                    "nombre": "AV. FERNANDO B. DE TERRY",
                    "descripcion": "Calle ubicada en la zona 8, AV. FERNANDO B. DE TERRY.",
                    "hora_inicio": "08:40:00",
                    "hora_final": "08:44:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 280,
                    "nombre": "AV. SEÑOR DE HUAYOPAMPA",
                    "descripcion": "Calle ubicada en la zona 8, AV. SEÑOR DE HUAYOPAMPA.",
                    "hora_inicio": "08:44:00",
                    "hora_final": "08:47:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 281,
                    "nombre": "AV, FERNANDO B.DE TERRY",
                    "descripcion": "Calle ubicada en la zona 8, AV, FERNANDO B.DE TERRY.",
                    "hora_inicio": "08:51:00",
                    "hora_final": "08:55:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 282,
                    "nombre": "CELIMA",
                    "descripcion": "Calle ubicada en la zona 8, CELIMA.",
                    "hora_inicio": "08:55:00",
                    "hora_final": "09:00:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 283,
                    "nombre": "VIA INTER R.E. PAVELTICH",
                    "descripcion": "Calle ubicada en la zona 8, VIA INTER R.E. PAVELTICH.",
                    "hora_inicio": "09:05:00",
                    "hora_final": "09:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 284,
                    "nombre": "URB LOS PINOS",
                    "descripcion": "Calle ubicada en la zona 8, URB LOS PINOS.",
                    "hora_inicio": "09:10:00",
                    "hora_final": "09:25:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 285,
                    "nombre": "JR PRIMAVERA",
                    "descripcion": "Calle ubicada en la zona 8, JR PRIMAVERA.",
                    "hora_inicio": "09:25:00",
                    "hora_final": "09:28:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 286,
                    "nombre": "VIA INTER R.E. PAVELTICH",
                    "descripcion": "Calle ubicada en la zona 8, VIA INTER R.E. PAVELTICH.",
                    "hora_inicio": "09:28:00",
                    "hora_final": "09:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 287,
                    "nombre": "PSJE SAN ANTONIO",
                    "descripcion": "Calle ubicada en la zona 8, PSJE SAN ANTONIO.",
                    "hora_inicio": "09:30:00",
                    "hora_final": "09:32:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 288,
                    "nombre": "VIA INTER R.E. PAVELTICH",
                    "descripcion": "Calle ubicada en la zona 8, VIA INTER R.E. PAVELTICH.",
                    "hora_inicio": "09:32:00",
                    "hora_final": "09:33:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 289,
                    "nombre": "PSJE WATTSON",
                    "descripcion": "Calle ubicada en la zona 8, PSJE WATTSON.",
                    "hora_inicio": "09:33:00",
                    "hora_final": "09:35:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 290,
                    "nombre": "PROLONGACION MAYRO",
                    "descripcion": "Calle ubicada en la zona 8, PROLONGACION MAYRO.",
                    "hora_inicio": "09:35:00",
                    "hora_final": "09:39:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 291,
                    "nombre": "SAN CRISTOBAL",
                    "descripcion": "Calle ubicada en la zona 8, SAN CRISTOBAL.",
                    "hora_inicio": "09:39:00",
                    "hora_final": "09:41:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 292,
                    "nombre": "PSJE 1 DE MAYO",
                    "descripcion": "Calle ubicada en la zona 8, PSJE 1 DE MAYO.",
                    "hora_inicio": "09:41:00",
                    "hora_final": "09:43:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 293,
                    "nombre": "AV. PRINCIPAL",
                    "descripcion": "Calle ubicada en la zona 8, AV. PRINCIPAL.",
                    "hora_inicio": "09:49:00",
                    "hora_final": "09:55:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 294,
                    "nombre": "SAN CRISTOBAL",
                    "descripcion": "Calle ubicada en la zona 8, SAN CRISTOBAL.",
                    "hora_inicio": "09:58:00",
                    "hora_final": "10:01:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 295,
                    "nombre": "CALLE BRANCACHO",
                    "descripcion": "Calle ubicada en la zona 8, CALLE BRANCACHO.",
                    "hora_inicio": "10:01:00",
                    "hora_final": "10:05:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 296,
                    "nombre": "LLICUA ALTA",
                    "descripcion": "Calle ubicada en la zona 8, LLICUA ALTA.",
                    "hora_inicio": "10:05:00",
                    "hora_final": "10:09:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 297,
                    "nombre": "AV PRINCIPAL",
                    "descripcion": "Calle ubicada en la zona 8, AV PRINCIPAL.",
                    "hora_inicio": "10:09:00",
                    "hora_final": "10:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 298,
                    "nombre": "PROLONGACION MAYRO",
                    "descripcion": "Calle ubicada en la zona 8, PROLONGACION MAYRO.",
                    "hora_inicio": "10:10:00",
                    "hora_final": "10:17:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 299,
                    "nombre": "CALLE BRANCACHO",
                    "descripcion": "Calle ubicada en la zona 8, CALLE BRANCACHO.",
                    "hora_inicio": "10:17:00",
                    "hora_final": "10:21:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 300,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "Calle ubicada en la zona 8, VIA REGIONAL.",
                    "hora_inicio": "10:21:00",
                    "hora_final": "10:22:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 301,
                    "nombre": "URB LOS EUCALIPTOS",
                    "descripcion": "Calle ubicada en la zona 8, URB LOS EUCALIPTOS.",
                    "hora_inicio": "10:22:00",
                    "hora_final": "10:29:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 302,
                    "nombre": "CALLE LOS EUCALIPTOS",
                    "descripcion": "Calle ubicada en la zona 8, CALLE LOS EUCALIPTOS.",
                    "hora_inicio": "10:29:00",
                    "hora_final": "10:35:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 303,
                    "nombre": "CALLE BRANCACHO",
                    "descripcion": "Calle ubicada en la zona 8, CALLE BRANCACHO.",
                    "hora_inicio": "10:35:00",
                    "hora_final": "10:38:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 304,
                    "nombre": "PROLONGACION MAYRO",
                    "descripcion": "Calle ubicada en la zona 8, PROLONGACION MAYRO.",
                    "hora_inicio": "10:38:00",
                    "hora_final": "10:45:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },

                /* Jancao - Zona 9 */

                /* Esperanza - Zona 10 */
                {
                    "id": 465,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL.",
                    "hora_inicio": "05:15:00",
                    "hora_final": "05:20:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 466,
                    "nombre": "VIA REGIONAL JANCAO",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL JANCAO.",
                    "hora_inicio": "05:20:00",
                    "hora_final": "05:25:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 467,
                    "nombre": "VIA REGIONAL SAN ANDRES",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL SAN ANDRES.",
                    "hora_inicio": "05:25:00",
                    "hora_final": "05:45:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 468,
                    "nombre": "LIMON PAMPA",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, LIMON PAMPA.",
                    "hora_inicio": "05:45:00",
                    "hora_final": "05:50:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 469,
                    "nombre": "SAN ANDRES",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, SAN ANDRES.",
                    "hora_inicio": "05:50:00",
                    "hora_final": "06:00:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 470,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL.",
                    "hora_inicio": "06:00:00",
                    "hora_final": "06:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 471,
                    "nombre": "CALLE 10",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, CALLE 10.",
                    "hora_inicio": "06:10:00",
                    "hora_final": "06:20:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 472,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL.",
                    "hora_inicio": "06:20:00",
                    "hora_final": "06:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 473,
                    "nombre": "CALLE 8",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, CALLE 8.",
                    "hora_inicio": "06:45:00",
                    "hora_final": "06:50:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 474,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL.",
                    "hora_inicio": "06:50:00",
                    "hora_final": "07:05:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 475,
                    "nombre": "CALLE 7",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, CALLE 7.",
                    "hora_inicio": "06:50:00",
                    "hora_final": "07:15:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 476,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL.",
                    "hora_inicio": "07:05:00",
                    "hora_final": "07:23:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 477,
                    "nombre": "JR DIVINO MAESTRO",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR DIVINO MAESTRO.",
                    "hora_inicio": "07:15:00",
                    "hora_final": "07:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 478,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL.",
                    "hora_inicio": "07:23:00",
                    "hora_final": "07:38:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 479,
                    "nombre": "JR SEÑOR DE BURGOS",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR SEÑOR DE BURGOS.",
                    "hora_inicio": "07:30:00",
                    "hora_final": "07:45:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 480,
                    "nombre": "JR SAN LORENZO",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR SAN LORENZO.",
                    "hora_inicio": "07:38:00",
                    "hora_final": "07:45:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 481,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL.",
                    "hora_inicio": "07:45:00",
                    "hora_final": "07:45:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 482,
                    "nombre": "JR SAN SEBASTIAN",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR SAN SEBASTIAN.",
                    "hora_inicio": "07:50:00",
                    "hora_final": "07:58:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 483,
                    "nombre": "JR SAN MIGUEL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR SAN MIGUEL.",
                    "hora_inicio": "07:58:00",
                    "hora_final": "08:04:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 484,
                    "nombre": "JR SAN BENITO",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR SAN BENITO.",
                    "hora_inicio": "08:04:00",
                    "hora_final": "08:12:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 485,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL.",
                    "hora_inicio": "08:12:00",
                    "hora_final": "08:17:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 486,
                    "nombre": "CALLE SAN JUAN BOSCO",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, CALLE SAN JUAN BOSCO.",
                    "hora_inicio": "08:17:00",
                    "hora_final": "08:22:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 487,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL.",
                    "hora_inicio": "08:22:00",
                    "hora_final": "08:25:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 488,
                    "nombre": "JR SAN ROQUE",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR SAN ROQUE.",
                    "hora_inicio": "08:25:00",
                    "hora_final": "08:33:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 489,
                    "nombre": "JR LIBRA",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR LIBRA.",
                    "hora_inicio": "08:33:00",
                    "hora_final": "08:41:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 490,
                    "nombre": "JR LIBRA",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR LIBRA.",
                    "hora_inicio": "08:41:00",
                    "hora_final": "08:46:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 491,
                    "nombre": "MALECON JANCAO",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, MALECON JANCAO.",
                    "hora_inicio": "08:46:00",
                    "hora_final": "08:52:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 492,
                    "nombre": "JR ESCORPIO",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR ESCORPIO.",
                    "hora_inicio": "08:52:00",
                    "hora_final": "09:02:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 493,
                    "nombre": "JR SAN FELIPE",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR SAN FELIPE.",
                    "hora_inicio": "09:02:00",
                    "hora_final": "09:22:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 494,
                    "nombre": "JR SAGITARIO",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR SAGITARIO.",
                    "hora_inicio": "09:22:00",
                    "hora_final": "09:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 495,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL.",
                    "hora_inicio": "09:30:00",
                    "hora_final": "09:36:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 496,
                    "nombre": "JR FRANCIA",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, JR FRANCIA.",
                    "hora_inicio": "09:36:00",
                    "hora_final": "09:46:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 497,
                    "nombre": "MALECON JANCAO",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, MALECON JANCAO.",
                    "hora_inicio": "09:46:00",
                    "hora_final": "09:48:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 498,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL.",
                    "hora_inicio": "09:52:00",
                    "hora_final": "09:56:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },
                {
                    "id": 499,
                    "nombre": "VIA REGIONAL JANCAO",
                    "descripcion": "ESPERANZA - Calle ubicada en la zona 10, VIA REGIONAL JANCAO.",
                    "hora_inicio": "09:56:00",
                    "hora_final": "10:06:00",
                    "numero_cuadra": 1,
                    "zona_id": 10
                },

                /* Colpa - Zona 11 */

                /* Matibamba - Zona 12 */

                /* Via Regional - Zona 13 */
                {
                    "id": 380,
                    "nombre": "MERCADO AMARILIS",
                    "descripcion": "Calle ubicada en la zona 13, MERCADO AMARILIS.",
                    "hora_inicio": "05:15:00",
                    "hora_final": "06:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 13
                },
                {
                    "id": 381,
                    "nombre": "PARQUE ESTIVEN HOKIG (LA PAMPA)",
                    "descripcion": "Calle ubicada en la zona 13, PARQUE ESTIVEN HOKIG (LA PAMPA).",
                    "hora_inicio": "06:20:00",
                    "hora_final": "06:25:00",
                    "numero_cuadra": 1,
                    "zona_id": 13
                },
                {
                    "id": 382,
                    "nombre": "PARADERO 15",
                    "descripcion": "Calle ubicada en la zona 13, PARADERO 15.",
                    "hora_inicio": "06:30:00",
                    "hora_final": "06:45:00",
                    "numero_cuadra": 1,
                    "zona_id": 13
                },
                {
                    "id": 383,
                    "nombre": "PARADERO 13",
                    "descripcion": "Calle ubicada en la zona 13, PARADERO 13.",
                    "hora_inicio": "06:51:00",
                    "hora_final": "06:55:00",
                    "numero_cuadra": 1,
                    "zona_id": 13
                },
                {
                    "id": 384,
                    "nombre": "PARADERO 12",
                    "descripcion": "Calle ubicada en la zona 13, PARADERO 12.",
                    "hora_inicio": "07:02:00",
                    "hora_final": "07:20:00",
                    "numero_cuadra": 1,
                    "zona_id": 13
                },
                {
                    "id": 385,
                    "nombre": "PARADERO 10",
                    "descripcion": "Calle ubicada en la zona 13, PARADERO 10.",
                    "hora_inicio": "07:25:00",
                    "hora_final": "07:35:00",
                    "numero_cuadra": 1,
                    "zona_id": 13
                },
                {
                    "id": 386,
                    "nombre": "PARADERO 9",
                    "descripcion": "Calle ubicada en la zona 13, PARADERO 9.",
                    "hora_inicio": "07:41:00",
                    "hora_final": "07:50:00",
                    "numero_cuadra": 1,
                    "zona_id": 13
                },
                {
                    "id": 387,
                    "nombre": "CRUCE HAVIER HERAUD (PUENTE PEATONAL)",
                    "descripcion": "Calle ubicada en la zona 13, CRUCE HAVIER HERAUD (PUENTE PEATONAL).",
                    "hora_inicio": "07:56:00",
                    "hora_final": "08:00:00",
                    "numero_cuadra": 1,
                    "zona_id": 13
                },
                {
                    "id": 388,
                    "nombre": "CACHINA (MERCADO SAN LUIS)",
                    "descripcion": "Calle ubicada en la zona 13, CACHINA (MERCADO SAN LUIS).",
                    "hora_inicio": "08:04:00",
                    "hora_final": "08:15:00",
                    "numero_cuadra": 1,
                    "zona_id": 13
                },
                {
                    "id": 389,
                    "nombre": "PUENTE BURGOS",
                    "descripcion": "Calle ubicada en la zona 13, PUENTE BURGOS.",
                    "hora_inicio": "08:19:00",
                    "hora_final": "08:32:00",
                    "numero_cuadra": 1,
                    "zona_id": 13
                },
                {
                    "id": 390,
                    "nombre": "ETNASA",
                    "descripcion": "Calle ubicada en la zona 13, ETNASA.",
                    "hora_inicio": "08:36:00",
                    "hora_final": "08:50:00",
                    "numero_cuadra": 1,
                    "zona_id": 13
                },
                {
                    "id": 391,
                    "nombre": "FONAVI 2 (PUNTO CRITICO)",
                    "descripcion": "Calle ubicada en la zona 13, FONAVI 2 (PUNTO CRITICO).",
                    "hora_inicio": "09:00:00",
                    "hora_final": "09:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 13
                }
            ]);
        });
};
