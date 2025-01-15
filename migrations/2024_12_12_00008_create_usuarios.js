exports.up = function(knex) {
  return knex.schema.createTable('usuarios', function(table) {
    table.increments('id').primary().unsigned();
    table.string('username', 255).notNullable().unique();
    table.string('password', 255).notNullable();
    table.string('role', 50).notNullable().defaultTo('localizador');
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.integer('recolector_id').unsigned().nullable().references('id').inTable('recolectores_desechos').onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('usuarios');
};
