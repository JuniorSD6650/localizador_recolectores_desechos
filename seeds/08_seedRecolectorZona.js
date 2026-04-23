exports.seed = async function (knex) {
    await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
    await knex('asignaciones_zonas_recolectores').del();
    await knex.raw('SET FOREIGN_KEY_CHECKS = 1');

    await knex('asignaciones_zonas_recolectores').insert([
        {
            "id": 1,
            "recolector_id": 1,
            "zona_id": 1
        },
        {
            "id": 2,
            "recolector_id": 2,
            "zona_id": 2
        },
        {
            "id": 3,
            "recolector_id": 2,
            "zona_id": 3
        },
        {
            "id": 4,
            "recolector_id": 1,
            "zona_id": 4
        },
        {
            "id": 5,
            "recolector_id": 3,
            "zona_id": 5
        },
        {
            "id": 6,
            "recolector_id": 3,
            "zona_id": 6
        },
        {
            "id": 7,
            "recolector_id": 1,
            "zona_id": 7
        },
        {
            "id": 8,
            "recolector_id": 3,
            "zona_id": 8
        },
        {
            "id": 9,
            "recolector_id": 1,
            "zona_id": 9
        },
        {
            "id": 10,
            "recolector_id": 3,
            "zona_id": 10
        },
        {
            "id": 11,
            "recolector_id": 3,
            "zona_id": 11
        },
        {
            "id": 12,
            "recolector_id": 3,
            "zona_id": 12
        },
        {
            "id": 13,
            "recolector_id": 2,
            "zona_id": 13
        },
        {
            "id": 14,
            "recolector_id": 4,
            "zona_id": 1
        },
        {
            "id": 15,
            "recolector_id": 4,
            "zona_id": 2
        },
        {
            "id": 16,
            "recolector_id": 4,
            "zona_id": 5
        },
        {
            "id": 17,
            "recolector_id": 5,
            "zona_id": 6
        },
        {
            "id": 18,
            "recolector_id": 6,
            "zona_id": 7
        }
    ]);
};