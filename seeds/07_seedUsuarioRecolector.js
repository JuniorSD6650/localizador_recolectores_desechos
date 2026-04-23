exports.seed = async function (knex) {
    await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
    await knex('asignaciones_vehiculos').del();
    await knex.raw('SET FOREIGN_KEY_CHECKS = 1');

    await knex('asignaciones_vehiculos').insert([
        { id: 1, usuario_id: 2, recolector_id: 1 },
        { id: 2, usuario_id: 3, recolector_id: 2 },
        { id: 5, usuario_id: 4, recolector_id: 3 },
        { id: 14, usuario_id: 5, recolector_id: 4 },
        { id: 17, usuario_id: 6, recolector_id: 5 },
        { id: 18, usuario_id: 7, recolector_id: 6 }
    ]);
};