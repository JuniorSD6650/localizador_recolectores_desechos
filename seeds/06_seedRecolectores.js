exports.seed = async function (knex) {
    await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
    await knex('recolectores_desechos').del();
    await knex.raw('SET FOREIGN_KEY_CHECKS = 1');

    await knex('recolectores_desechos').insert([
        { id: 1, nombre_recolector: "General", placa: "EX 0410", tipo_vehiculo: "MOTOFURGÓN", estado_operativo: "operativo", latitud: -9.9306, longitud: -76.2422 },
        { id: 2, nombre_recolector: "Específico Orgánico", placa: "EW 6926", tipo_vehiculo: "MOTOFURGÓN", estado_operativo: "operativo", latitud: -9.9306, longitud: -76.2422 },
        { id: 3, nombre_recolector: "General", placa: "SP", tipo_vehiculo: "MOTOFURGÓN", estado_operativo: "operativo", latitud: -9.9306, longitud: -76.2422 },
        { id: 4, nombre_recolector: "General", placa: "EAL 234", tipo_vehiculo: "CAMIÓN BARANDA", estado_operativo: "operativo", latitud: -9.9306, longitud: -76.2422 },
        { id: 5, nombre_recolector: "General", placa: "EW 67 83", tipo_vehiculo: "MOTOFURGÓN", estado_operativo: "operativo", latitud: -9.9306, longitud: -76.2422 },
        { id: 6, nombre_recolector: "Específico Orgánico", placa: "EX 5645", tipo_vehiculo: "MOTOFURGÓN", estado_operativo: "operativo", latitud: -9.9306, longitud: -76.2422 }
    ]);
};