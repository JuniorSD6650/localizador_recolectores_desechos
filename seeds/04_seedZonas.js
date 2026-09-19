exports.seed = async function (knex) {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
  await knex('zonas').del();
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1');

  await knex('zonas').insert([
    {
      id: 1,
      nombre: 'Paucarbamba S1 y S2',
      descripcion: 'Zona ubicada en Paucarbambilla, esta es la zona 1 de recolección.',
      imagen: 'uploads/zonas/ZONA_1_Pbba.jpg',
      organizacion_id: 1,
      color_ruta: '#1976D2',
      coordenadas_ruta: JSON.stringify([
        { lat: -9.9306, lng: -76.2422 },
        { lat: -9.9315, lng: -76.2415 },
        { lat: -9.9328, lng: -76.2405 },
        { lat: -9.9342, lng: -76.2418 },
        { lat: -9.9355, lng: -76.2430 }
      ])
    },
    {
      id: 2,
      nombre: 'Paucarbamba S3 y S4',
      descripcion: 'Zona ubicada en Paucarbamba S3 y S4, esta es la zona 2 de recolección.',
      imagen: 'uploads/zonas/ZONA_2_Pbba_S3_4.jpg',
      organizacion_id: 1,
      color_ruta: '#049434',
      coordenadas_ruta: JSON.stringify([
        { lat: -9.9355, lng: -76.2430 },
        { lat: -9.9368, lng: -76.2442 },
        { lat: -9.9380, lng: -76.2432 },
        { lat: -9.9392, lng: -76.2420 }
      ])
    },
    {
      id: 3,
      nombre: 'Paucarbambilla, Fonavi I, Zona 0',
      descripcion: 'Zona ubicada en Paucarbambilla, Fonavi I, Zona 0, esta es la zona 3 de recolección.',
      imagen: 'uploads/zonas/ZONA_3_Pbbilla_F1_Z0.jpg',
      organizacion_id: 1,
      color_ruta: '#fc640c',
      coordenadas_ruta: JSON.stringify([
        { lat: -9.9275, lng: -76.2390 },
        { lat: -9.9288, lng: -76.2402 },
        { lat: -9.9300, lng: -76.2410 },
        { lat: -9.9312, lng: -76.2395 }
      ])
    },
    {
      id: 4,
      nombre: 'San Luis S1, S2 y S3',
      descripcion: 'Zona ubicada en San Luis S1, S2 y S3, esta es la zona 4 de recolección.',
      imagen: 'uploads/zonas/ZONA_4_San_Luis_1_2_3.jpg',
      organizacion_id: 1,
      color_ruta: '#8b5cf6',
      coordenadas_ruta: JSON.stringify([
        { lat: -9.9220, lng: -76.2360 },
        { lat: -9.9235, lng: -76.2375 },
        { lat: -9.9250, lng: -76.2388 },
        { lat: -9.9265, lng: -76.2372 }
      ])
    },
    {
      id: 5,
      nombre: 'San Luis S4 y S5',
      descripcion: 'Zona ubicada en San Luis S4 y S5, esta es la zona 5 de recolección.',
      imagen: 'uploads/zonas/ZONA_5_San_Luis_4_5.jpg',
      organizacion_id: 1,
      color_ruta: '#06b6d4',
      coordenadas_ruta: JSON.stringify([
        { lat: -9.9265, lng: -76.2372 },
        { lat: -9.9280, lng: -76.2360 },
        { lat: -9.9295, lng: -76.2350 },
        { lat: -9.9310, lng: -76.2365 }
      ])
    },
    {
      id: 6,
      nombre: 'Llicua',
      descripcion: 'Zona ubicada en Llicua, esta es la zona 6 de recolección.',
      imagen: 'uploads/zonas/ZONA_6_Llicua.jpg',
      organizacion_id: 1
    },
    {
      id: 7,
      nombre: 'Fonavi II Sauce',
      descripcion: 'Zona ubicada en Fonavi II Sauce, esta es la zona 7 de recolección.',
      imagen: 'uploads/zonas/ZONA_7_FII_Sauce.jpg',
      organizacion_id: 1
    },
    {
      id: 8,
      nombre: 'Huayopampa',
      descripcion: 'Zona ubicada en Huayopampa, esta es la zona 8 de recolección.',
      imagen: 'uploads/zonas/ZONA_8_Huayopampa.jpg',
      organizacion_id: 1
    },
    {
      id: 9,
      nombre: 'Jancao',
      descripcion: 'Zona ubicada en Jancao, esta es la zona 9 de recolección.',
      imagen: 'uploads/zonas/ZONA_9_Jancao.jpg',
      organizacion_id: 1
    },
    {
      id: 10,
      nombre: 'Esperanza',
      descripcion: 'Zona ubicada en Esperanza, esta es la zona 10 de recolección.',
      imagen: 'uploads/zonas/ZONA_10_Esperanza.jpg',
      organizacion_id: 1
    },
    {
      id: 11,
      nombre: 'Colpa',
      descripcion: 'Zona ubicada en Colpa, esta es la zona 11A de recolección.',
      imagen: 'uploads/zonas/ZONA_11A_Colpa.jpg',
      organizacion_id: 1
    },
    {
      id: 12,
      nombre: 'Matibamba',
      descripcion: 'Zona ubicada en Matibamba, esta es la zona 11B de recolección.',
      imagen: 'uploads/zonas/ZONA_11B_Matibamba.jpg',
      organizacion_id: 1
    },
    {
      id: 13,
      nombre: 'Via Regional',
      descripcion: 'Zona ubicada en Via Regional, esta es la zona 13 de recolección.',
      imagen: '',
      organizacion_id: 1
    }
  ]);
};