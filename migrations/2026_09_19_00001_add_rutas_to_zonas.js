exports.up = function (knex) {
  return knex.schema.table('zonas', function (table) {
    table.json('coordenadas_ruta').nullable();
    table.string('color_ruta', 20).defaultTo('#1976D2');
  });
};

exports.down = function (knex) {
  return knex.schema.table('zonas', function (table) {
    table.dropColumn('coordenadas_ruta');
    table.dropColumn('color_ruta');
  });
};
