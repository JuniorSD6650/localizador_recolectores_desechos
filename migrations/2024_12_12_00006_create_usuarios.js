exports.up = function (knex) {
  return knex.schema.createTable('usuarios', function (table) {
    table.increments('id').primary().unsigned();
    table.string('username', 255).notNullable().unique();
    table.string('password', 255).notNullable();
    table.string('role', 50).notNullable().defaultTo('conductor');
    table.string('nombre_completo', 255).nullable();
    table.string('email', 255).nullable();
    table.string('telefono', 15).nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('usuarios');
};
