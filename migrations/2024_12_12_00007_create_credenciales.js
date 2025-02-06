exports.up = function (knex) {
    return knex.schema.createTable('credenciales', function (table) {
        table.increments('id').primary().unsigned();
        table.string('username', 255).notNullable().unique();
        table.string('password', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.integer('usuario_id').unsigned().notNullable().references('id').inTable('usuarios').onDelete('CASCADE');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('credenciales');
};