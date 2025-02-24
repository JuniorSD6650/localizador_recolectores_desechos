exports.seed = function (knex) {
    return knex('calles').del()
        .then(function () {
            return knex('calles').insert([
                {
                    "id": 243,
                    "nombre": "VIA REGIONAL, CATARATAS",
                    "descripcion": "Calle ubicada en la zona 6, VIA REGIONAL, CATARATAS.",
                    "hora_inicio": "05:20:00",
                    "hora_final": "05:25:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 244,
                    "nombre": "CALLE LOS MANGLARES",
                    "descripcion": "Calle ubicada en la zona 6, CALLE LOS MANGLARES.",
                    "hora_inicio": "05:25:00",
                    "hora_final": "05:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 245,
                    "nombre": "VIA COLECTORA",
                    "descripcion": "Calle ubicada en la zona 6, VIA COLECTORA.",
                    "hora_inicio": "05:30:00",
                    "hora_final": "05:35:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 246,
                    "nombre": "CALLE MIRAFLORES",
                    "descripcion": "Calle ubicada en la zona 6, CALLE MIRAFLORES.",
                    "hora_inicio": "05:35:00",
                    "hora_final": "05:42:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 247,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "Calle ubicada en la zona 6, VIA REGIONAL.",
                    "hora_inicio": "05:42:00",
                    "hora_final": "05:50:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 248,
                    "nombre": "CALLE LOS FRESNOS",
                    "descripcion": "Calle ubicada en la zona 6, CALLE LOS FRESNOS.",
                    "hora_inicio": "05:50:00",
                    "hora_final": "05:55:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 249,
                    "nombre": "AV. FERNANDO B. DE TERRY",
                    "descripcion": "Calle ubicada en la zona 6, AV. FERNANDO B. DE TERRY.",
                    "hora_inicio": "05:55:00",
                    "hora_final": "06:05:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 250,
                    "nombre": "CALLE ESMERALDAS",
                    "descripcion": "Calle ubicada en la zona 6, CALLE ESMERALDAS.",
                    "hora_inicio": "06:05:00",
                    "hora_final": "06:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 251,
                    "nombre": "JR CUCULI",
                    "descripcion": "Calle ubicada en la zona 6, JR CUCULI.",
                    "hora_inicio": "06:10:00",
                    "hora_final": "06:17:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 252,
                    "nombre": "CALLE LOS FRESNOS",
                    "descripcion": "Calle ubicada en la zona 6, CALLE LOS FRESNOS.",
                    "hora_inicio": "06:17:00",
                    "hora_final": "06:20:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 253,
                    "nombre": "URB SAN ZEFORA",
                    "descripcion": "Calle ubicada en la zona 6, URB SAN ZEFORA.",
                    "hora_inicio": "06:20:00",
                    "hora_final": "06:35:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 254,
                    "nombre": "CALLE LAS ESMERALDAS",
                    "descripcion": "Calle ubicada en la zona 6, CALLE LAS ESMERALDAS.",
                    "hora_inicio": "06:35:00",
                    "hora_final": "06:37:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 255,
                    "nombre": "CALLE MALECON",
                    "descripcion": "Calle ubicada en la zona 6, CALLE MALECON.",
                    "hora_inicio": "06:37:00",
                    "hora_final": "06:42:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 256,
                    "nombre": "MALECON HUALLAGA",
                    "descripcion": "Calle ubicada en la zona 6, MALECON HUALLAGA.",
                    "hora_inicio": "06:42:00",
                    "hora_final": "06:45:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 257,
                    "nombre": "CALLE LAS ESMERALDAS",
                    "descripcion": "Calle ubicada en la zona 6, CALLE LAS ESMERALDAS.",
                    "hora_inicio": "06:45:00",
                    "hora_final": "06:51:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 258,
                    "nombre": "HUAYOPAMPA",
                    "descripcion": "Calle ubicada en la zona 6, HUAYOPAMPA.",
                    "hora_inicio": "06:51:00",
                    "hora_final": "06:53:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 259,
                    "nombre": "JR LAS PERDICES",
                    "descripcion": "Calle ubicada en la zona 6, JR LAS PERDICES.",
                    "hora_inicio": "06:53:00",
                    "hora_final": "07:00:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 260,
                    "nombre": "MALECON H. HUAYOPAMPA",
                    "descripcion": "Calle ubicada en la zona 6, MALECON H. HUAYOPAMPA.",
                    "hora_inicio": "07:00:00",
                    "hora_final": "07:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 261,
                    "nombre": "AV SEÑOR DE HUAYOPAMPA",
                    "descripcion": "Calle ubicada en la zona 6, AV SEÑOR DE HUAYOPAMPA.",
                    "hora_inicio": "07:10:00",
                    "hora_final": "07:12:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 262,
                    "nombre": "JR LAS GAVIOTAS",
                    "descripcion": "Calle ubicada en la zona 6, JR LAS GAVIOTAS.",
                    "hora_inicio": "07:12:00",
                    "hora_final": "07:17:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 263,
                    "nombre": "JR LOS JILGUEROS",
                    "descripcion": "Calle ubicada en la zona 6, JR LOS JILGUEROS.",
                    "hora_inicio": "07:17:00",
                    "hora_final": "07:22:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 264,
                    "nombre": "AV SEÑOR DE HUAYOPAMPA",
                    "descripcion": "Calle ubicada en la zona 6, AV SEÑOR DE HUAYOPAMPA.",
                    "hora_inicio": "07:22:00",
                    "hora_final": "07:23:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 265,
                    "nombre": "JR LAS GARZAS",
                    "descripcion": "Calle ubicada en la zona 6, JR LAS GARZAS.",
                    "hora_inicio": "07:23:00",
                    "hora_final": "07:28:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 266,
                    "nombre": "URB H, LAS LLANTAS",
                    "descripcion": "Calle ubicada en la zona 6, URB H, LAS LLANTAS.",
                    "hora_inicio": "07:28:00",
                    "hora_final": "07:32:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 267,
                    "nombre": "JR LAS GOLONDRINAS",
                    "descripcion": "Calle ubicada en la zona 6, JR LAS GOLONDRINAS.",
                    "hora_inicio": "07:32:00",
                    "hora_final": "07:37:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 268,
                    "nombre": "AV HUAYOPAMPA",
                    "descripcion": "Calle ubicada en la zona 6, AV HUAYOPAMPA.",
                    "hora_inicio": "08:00:00",
                    "hora_final": "08:00:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 269,
                    "nombre": "AV SEÑOR DE HUAYOPAMPA",
                    "descripcion": "Calle ubicada en la zona 6, AV SEÑOR DE HUAYOPAMPA.",
                    "hora_inicio": "08:00:00",
                    "hora_final": "08:05:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 270,
                    "nombre": "AV HUAYOPAMPA",
                    "descripcion": "Calle ubicada en la zona 6, AV HUAYOPAMPA.",
                    "hora_inicio": "08:05:00",
                    "hora_final": "08:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 271,
                    "nombre": "JR LOS JILGUEROS",
                    "descripcion": "Calle ubicada en la zona 6, JR LOS JILGUEROS.",
                    "hora_inicio": "08:10:00",
                    "hora_final": "08:13:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 272,
                    "nombre": "AV HUAYOPAMPA",
                    "descripcion": "Calle ubicada en la zona 6, AV HUAYOPAMPA.",
                    "hora_inicio": "08:13:00",
                    "hora_final": "08:17:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 273,
                    "nombre": "PSJE LOS CIPRESES",
                    "descripcion": "Calle ubicada en la zona 6, PSJE LOS CIPRESES.",
                    "hora_inicio": "08:17:00",
                    "hora_final": "08:23:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 274,
                    "nombre": "JR LOS TULIPANES",
                    "descripcion": "Calle ubicada en la zona 6, JR LOS TULIPANES.",
                    "hora_inicio": "08:23:00",
                    "hora_final": "08:27:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 275,
                    "nombre": "AV HUAYOPAMPA",
                    "descripcion": "Calle ubicada en la zona 6, AV HUAYOPAMPA.",
                    "hora_inicio": "08:27:00",
                    "hora_final": "08:28:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 276,
                    "nombre": "AV. SEÑOR DE HUAYOPAMPA",
                    "descripcion": "Calle ubicada en la zona 6, AV. SEÑOR DE HUAYOPAMPA.",
                    "hora_inicio": "08:28:00",
                    "hora_final": "08:32:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 277,
                    "nombre": "JR LOS NARDOS",
                    "descripcion": "Calle ubicada en la zona 6, JR LOS NARDOS.",
                    "hora_inicio": "08:32:00",
                    "hora_final": "08:35:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 278,
                    "nombre": "JR LOS TULIPANES",
                    "descripcion": "Calle ubicada en la zona 6, JR LOS TULIPANES.",
                    "hora_inicio": "08:35:00",
                    "hora_final": "08:40:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 279,
                    "nombre": "AV. FERNANDO B. DE TERRY",
                    "descripcion": "Calle ubicada en la zona 6, AV. FERNANDO B. DE TERRY.",
                    "hora_inicio": "08:40:00",
                    "hora_final": "08:44:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 280,
                    "nombre": "AV. SEÑOR DE HUAYOPAMPA",
                    "descripcion": "Calle ubicada en la zona 6, AV. SEÑOR DE HUAYOPAMPA.",
                    "hora_inicio": "08:44:00",
                    "hora_final": "08:47:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 281,
                    "nombre": "AV, FERNANDO B.DE TERRY",
                    "descripcion": "Calle ubicada en la zona 6, AV, FERNANDO B.DE TERRY.",
                    "hora_inicio": "08:51:00",
                    "hora_final": "08:55:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 282,
                    "nombre": "CELIMA",
                    "descripcion": "Calle ubicada en la zona 6, CELIMA.",
                    "hora_inicio": "08:55:00",
                    "hora_final": "09:00:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 283,
                    "nombre": "VIA INTER R.E. PAVELTICH",
                    "descripcion": "Calle ubicada en la zona 6, VIA INTER R.E. PAVELTICH.",
                    "hora_inicio": "09:05:00",
                    "hora_final": "09:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 284,
                    "nombre": "URB LOS PINOS",
                    "descripcion": "Calle ubicada en la zona 6, URB LOS PINOS.",
                    "hora_inicio": "09:10:00",
                    "hora_final": "09:25:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 285,
                    "nombre": "JR PRIMAVERA",
                    "descripcion": "Calle ubicada en la zona 6, JR PRIMAVERA.",
                    "hora_inicio": "09:25:00",
                    "hora_final": "09:28:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 286,
                    "nombre": "VIA INTER R.E. PAVELTICH",
                    "descripcion": "Calle ubicada en la zona 6, VIA INTER R.E. PAVELTICH.",
                    "hora_inicio": "09:28:00",
                    "hora_final": "09:30:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 287,
                    "nombre": "PSJE SAN ANTONIO",
                    "descripcion": "Calle ubicada en la zona 6, PSJE SAN ANTONIO.",
                    "hora_inicio": "09:30:00",
                    "hora_final": "09:32:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 288,
                    "nombre": "VIA INTER R.E. PAVELTICH",
                    "descripcion": "Calle ubicada en la zona 6, VIA INTER R.E. PAVELTICH.",
                    "hora_inicio": "09:32:00",
                    "hora_final": "09:33:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 289,
                    "nombre": "PSJE WATTSON",
                    "descripcion": "Calle ubicada en la zona 6, PSJE WATTSON.",
                    "hora_inicio": "09:33:00",
                    "hora_final": "09:35:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 290,
                    "nombre": "PROLONGACION MAYRO",
                    "descripcion": "Calle ubicada en la zona 6, PROLONGACION MAYRO.",
                    "hora_inicio": "09:35:00",
                    "hora_final": "09:39:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 291,
                    "nombre": "SAN CRISTOBAL",
                    "descripcion": "Calle ubicada en la zona 6, SAN CRISTOBAL.",
                    "hora_inicio": "09:39:00",
                    "hora_final": "09:41:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 292,
                    "nombre": "PSJE 1 DE MAYO",
                    "descripcion": "Calle ubicada en la zona 6, PSJE 1 DE MAYO.",
                    "hora_inicio": "09:41:00",
                    "hora_final": "09:43:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 293,
                    "nombre": "AV. PRINCIPAL",
                    "descripcion": "Calle ubicada en la zona 6, AV. PRINCIPAL.",
                    "hora_inicio": "09:49:00",
                    "hora_final": "09:55:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 294,
                    "nombre": "SAN CRISTOBAL",
                    "descripcion": "Calle ubicada en la zona 6, SAN CRISTOBAL.",
                    "hora_inicio": "09:58:00",
                    "hora_final": "10:01:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 295,
                    "nombre": "CALLE BRANCACHO",
                    "descripcion": "Calle ubicada en la zona 6, CALLE BRANCACHO.",
                    "hora_inicio": "10:01:00",
                    "hora_final": "10:05:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 296,
                    "nombre": "LLICUA ALTA",
                    "descripcion": "Calle ubicada en la zona 6, LLICUA ALTA.",
                    "hora_inicio": "10:05:00",
                    "hora_final": "10:09:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 297,
                    "nombre": "AV PRINCIPAL",
                    "descripcion": "Calle ubicada en la zona 6, AV PRINCIPAL.",
                    "hora_inicio": "10:09:00",
                    "hora_final": "10:10:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 298,
                    "nombre": "PROLONGACION MAYRO",
                    "descripcion": "Calle ubicada en la zona 6, PROLONGACION MAYRO.",
                    "hora_inicio": "10:10:00",
                    "hora_final": "10:17:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 299,
                    "nombre": "CALLE BRANCACHO",
                    "descripcion": "Calle ubicada en la zona 6, CALLE BRANCACHO.",
                    "hora_inicio": "10:17:00",
                    "hora_final": "10:21:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 300,
                    "nombre": "VIA REGIONAL",
                    "descripcion": "Calle ubicada en la zona 6, VIA REGIONAL.",
                    "hora_inicio": "10:21:00",
                    "hora_final": "10:22:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 301,
                    "nombre": "URB LOS EUCALIPTOS",
                    "descripcion": "Calle ubicada en la zona 6, URB LOS EUCALIPTOS.",
                    "hora_inicio": "10:22:00",
                    "hora_final": "10:29:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 302,
                    "nombre": "CALLE LOS EUCALIPTOS",
                    "descripcion": "Calle ubicada en la zona 6, CALLE LOS EUCALIPTOS.",
                    "hora_inicio": "10:29:00",
                    "hora_final": "10:35:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 303,
                    "nombre": "CALLE BRANCACHO",
                    "descripcion": "Calle ubicada en la zona 6, CALLE BRANCACHO.",
                    "hora_inicio": "10:35:00",
                    "hora_final": "10:38:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                },
                {
                    "id": 304,
                    "nombre": "PROLONGACION MAYRO",
                    "descripcion": "Calle ubicada en la zona 6, PROLONGACION MAYRO.",
                    "hora_inicio": "10:38:00",
                    "hora_final": "10:45:00",
                    "numero_cuadra": 1,
                    "zona_id": 8
                }
            ]);
        });
};
