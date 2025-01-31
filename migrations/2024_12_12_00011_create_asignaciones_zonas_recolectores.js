exports.up = function (knex) {
    return knex.schema.createTable('asignaciones_zonas_recolectores', function (table) {
        table.increments('id').primary().unsigned();
        table.integer('recolector_id').unsigned().notNullable().references('id').inTable('recolectores_desechos').onDelete('CASCADE');
        table.integer('zona_id').unsigned().notNullable().references('id').inTable('zonas').onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('asignaciones_zonas_recolectores');
};
