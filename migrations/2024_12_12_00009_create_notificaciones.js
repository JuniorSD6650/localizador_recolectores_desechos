exports.up = function (knex) {
  return knex.schema.createTable('notificaciones', function (table) {
    table.increments('id').primary().unsigned();
    table.string('titulo', 255).notNullable();
    table.text('mensaje').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.string('prioridad', 50).defaultTo('baja');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('notificaciones');
};
