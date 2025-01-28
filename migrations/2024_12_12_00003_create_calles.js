exports.up = function (knex) {
  return knex.schema.createTable('calles', function (table) {
    table.increments('id').primary().unsigned();
    table.string('nombre', 255).notNullable();
    table.text('descripcion').nullable();
    table.time('hora_inicio').notNullable();
    table.time('hora_final').notNullable();
    table.integer('numero_cuadra').unsigned().notNullable();
    table.integer('zona_id').unsigned().references('id').inTable('zonas').onDelete('CASCADE');

  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('calles');
};
