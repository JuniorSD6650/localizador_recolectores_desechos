exports.up = function (knex) {
  return knex.schema.createTable('recolectores_desechos', function (table) {
    table.increments('id').primary().unsigned();
    table.string('nombre_recolector', 255).notNullable();
    table.string('telefono_recolector', 15).nullable();
    table.string('zona_responsable', 255).nullable();
    table.string('ubicacion_enlace', 255).nullable();
    table.timestamp('fecha_ubicacion_actualizada').nullable();
    table.string('placa', 50).notNullable().unique();
    table.string('tipo_vehiculo', 50).notNullable();
    table.string('estado_operativo', 50).defaultTo('operativo');
    table.integer('zona_id').unsigned().references('id').inTable('zonas').onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('recolectores_desechos');
};
