exports.seed = async function (knex) {
  // 1. Desactivamos las restricciones de llaves foráneas temporalmente
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0');

  // 2. Limpiamos la tabla (ahora sí nos dejará)
  await knex('organizacion').del();

  // 3. Insertamos la organización
  await knex('organizacion').insert({
    id: 1,
    nombre: 'Municipalidad de Amarilis',
    descripcion: 'La Municipalidad de Amarilis es una entidad pública encargada de la administración local del distrito de Amarilis, promoviendo el desarrollo y bienestar de sus ciudadanos.',
  });

  // 4. Volvemos a activar las restricciones
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1');
};