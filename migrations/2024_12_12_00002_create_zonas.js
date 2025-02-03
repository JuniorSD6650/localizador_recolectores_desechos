exports.up = function (knex) {
  return knex.schema.createTable('zonas', function (table) {
    table.increments('id').primary().unsigned();
    table.string('nombre', 255).notNullable();
    table.text('descripcion').nullable();
    table.string('imagen', 500).nullable();
    table.integer('organizacion_id').unsigned().references('id').inTable('organizacion').onDelete('RESTRICT')
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('zonas');
};
