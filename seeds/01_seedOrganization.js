exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('organizacion').del();

  // Insert organization
  await knex('organizacion').insert({
    id: 1,
    nombre: 'Municipalidad de Amarilis',
    descripcion: 'La Municipalidad de Amarilis es una entidad pública encargada de la administración local del distrito de Amarilis, promoviendo el desarrollo y bienestar de sus ciudadanos.',
  });
};
