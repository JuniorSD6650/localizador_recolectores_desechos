exports.up = function (knex) {
    return knex.schema.createTable('historial_jornadas', function (table) {
        table.increments('id').primary().unsigned();
        table.timestamp('fecha_inicio').defaultTo(knex.fn.now());
        table.timestamp('fecha_fin').nullable();
        table.string('observaciones', 500).nullable();
        table.integer('usuario_id').unsigned().notNullable().references('id').inTable('usuarios').onDelete('CASCADE');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('historial_jornadas');
};
