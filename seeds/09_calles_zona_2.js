exports.seed = function (knex) {
    return knex('calles').del()
        .then(function () {
            return knex('calles').insert([
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
                }
            ]);
        });
};
