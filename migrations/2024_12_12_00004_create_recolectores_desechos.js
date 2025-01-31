exports.up = function (knex) {
  return knex.schema.createTable('recolectores_desechos', function (table) {
    table.increments('id').primary().unsigned();
    table.string('nombre_recolector', 255).notNullable();
    table.string('ubicacion_enlace', 255).nullable();
    table.timestamp('fecha_ubicacion_actualizada').nullable();
    table.string('placa', 50).notNullable().unique();
    table.string('tipo_vehiculo', 50).notNullable();
    table.string('estado_operativo', 50).defaultTo('operativo');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('recolectores_desechos');
};
