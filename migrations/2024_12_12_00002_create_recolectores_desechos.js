exports.up = function (knex) {
  return knex.schema.createTable('recolectores_desechos', function (table) {
    table.increments('id').primary().unsigned();
    table.string('nombre_recolector', 255).notNullable();
    table.string('telefono_recolector', 15).nullable();
    table.string('zona_responsable', 255).nullable();
    table.string('ubicacion_enlace', 255).nullable();
    table.timestamp('fecha_ubicacion_actualizada').nullable();
    table.string('estado', 50).defaultTo('activo');

    table.integer('organizacion_id').unsigned().references('id').inTable('organizacion').onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('recolectores_desechos');
};
