exports.seed = function (knex) {
    return knex('calles').del()
        .then(function () {
            return knex('calles').insert([
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
                }
            ]);
        });
};
