exports.up = function (knex) {
    return knex.schema.createTable('historial_jornadas', function (table) {
        table.increments('id').primary().unsigned();
        table.timestamp('fecha_asignacion').defaultTo(knex.fn.now());
        table.timestamp('fecha_finalizacion').nullable();
        table.string('observaciones', 500).nullable();
        table.integer('asignacion_id').unsigned().notNullable().references('id').inTable('asignaciones_vehiculos').onDelete('CASCADE');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('historial_jornadas');
};
