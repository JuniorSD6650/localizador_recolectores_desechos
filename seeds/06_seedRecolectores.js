exports.seed = function (knex) {
    return knex('recolectores_desechos').del()
        .then(function () {
            return knex('recolectores_desechos').insert([
                /* General, Especifico Organico y Especifico Inorganico */
                {
                    "id": 1,
                    "nombre_recolector": "General",
                    "placa": "EX 0410",
                    "tipo_vehiculo": "MOTOFURGÓN",
                    "estado_operativo": "operativo"
                },
                {
                    "id": 2,
                    "nombre_recolector": "Específico Orgánico",
                    "placa": "EW 6926",
                    "tipo_vehiculo": "MOTOFURGÓN",
                    "estado_operativo": "operativo"
                },
                {
                    "id": 3,
                    "nombre_recolector": "General",
                    "placa": "SP",
                    "tipo_vehiculo": "MOTOFURGÓN",
                    "estado_operativo": "operativo"
                },
                {
                    "id": 4,
                    "nombre_recolector": "General",
                    "placa": "EAL 234",
                    "tipo_vehiculo": "CAMIÓN BARANDA",
                    "estado_operativo": "operativo"
                },
                {
                    "id": 5,
                    "nombre_recolector": "General",
                    "placa": "EW 67 83",
                    "tipo_vehiculo": "MOTOFURGÓN",
                    "estado_operativo": "operativo"
                },
                {
                    "id": 6,
                    "nombre_recolector": "Específico Orgánico",
                    "placa": "EX 5645",
                    "tipo_vehiculo": "MOTOFURGÓN",
                    "estado_operativo": "operativo"
                }
            ]);
        });
};
