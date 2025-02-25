exports.seed = function (knex) {
    return knex('asignaciones_vehiculos').del()
        .then(function () {
            return knex('asignaciones_vehiculos').insert([
                {
                    "id": 1,
                    "usuario_id": 2,
                    "recolector_id": 1
                },
                {
                    "id": 2,
                    "usuario_id": 3,
                    "recolector_id": 2
                },
                {
                    "id": 3,
                    "usuario_id": 3,
                    "recolector_id": 2
                },
                {
                    "id": 4,
                    "usuario_id": 2,
                    "recolector_id": 1
                },
                {
                    "id": 5,
                    "usuario_id": 4,
                    "recolector_id": 3
                },
                {
                    "id": 6,
                    "usuario_id": 4,
                    "recolector_id": 3
                },
                {
                    "id": 7,
                    "usuario_id": 2,
                    "recolector_id": 1
                },
                {
                    "id": 8,
                    "usuario_id": 4,
                    "recolector_id": 3
                },
                {
                    "id": 9,
                    "usuario_id": 2,
                    "recolector_id": 1
                },
                {
                    "id": 10,
                    "usuario_id": 4,
                    "recolector_id": 3
                },
                {
                    "id": 11,
                    "usuario_id": 4,
                    "recolector_id": 3
                },
                {
                    "id": 12,
                    "usuario_id": 4,
                    "recolector_id": 3
                },
                {
                    "id": 13,
                    "usuario_id": 3,
                    "recolector_id": 2
                },
                {
                    "id": 14,
                    "usuario_id": 5,
                    "recolector_id": 4
                },
                {
                    "id": 15,
                    "usuario_id": 5,
                    "recolector_id": 4
                },
                {
                    "id": 16,
                    "usuario_id": 5,
                    "recolector_id": 4
                },
                {
                    "id": 17,
                    "usuario_id": 6,
                    "recolector_id": 5
                },
                {
                    "id": 18,
                    "usuario_id": 7,
                    "recolector_id": 6
                }
            ]);
        });
};
