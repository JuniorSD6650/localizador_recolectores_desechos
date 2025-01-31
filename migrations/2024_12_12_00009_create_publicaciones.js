exports.up = function (knex) {
    return knex.schema.createTable('publicaciones', function (table) {
        table.increments('id').primary().unsigned();
        table.string('titulo', 255).notNullable();
        table.string('imagen_url', 255).notNullable();
        table.text('descripcion').nullable();
        table.boolean('activo').defaultTo(true);
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('publicaciones');
};
