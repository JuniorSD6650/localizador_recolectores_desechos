exports.up = function (knex) {
  return knex.schema.createTable('asignaciones_vehiculos', function (table) {
    table.increments('id').primary().unsigned();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('usuario_id').unsigned().notNullable().references('id').inTable('usuarios').onDelete('CASCADE');
    table.integer('recolector_id').unsigned().notNullable().references('id').inTable('recolectores_desechos').onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('asignaciones_vehiculos');
};
