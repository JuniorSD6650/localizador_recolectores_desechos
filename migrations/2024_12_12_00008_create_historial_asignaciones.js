exports.up = function (knex) {
  return knex.schema.createTable('historial_asignaciones', function (table) {
    table.increments('id').primary().unsigned();
    table.integer('usuario_id').unsigned().references('id').inTable('usuarios').onDelete('CASCADE');
    table.integer('recolector_id').unsigned().references('id').inTable('recolectores_desechos').onDelete('CASCADE');
    table.timestamp('fecha_asignacion').defaultTo(knex.fn.now());
    table.timestamp('fecha_finalizacion').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('historial_asignaciones');
};
