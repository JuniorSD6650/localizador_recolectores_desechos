exports.seed = function (knex) {
  return knex('zonas').del()
    .then(function () {
      return knex('zonas').insert([
        {
          id: 1,
          nombre: 'Paucarbambilla',
          descripcion: 'Zona ubicada en Paucarbambilla, esta es la zona 1 de recolección.',
          imagen: 'uploads/zonas/ZONA_1_Pbba.jpg',
          organizacion_id: 1
        },
        {
          id: 2,
          nombre: 'Paucarbamba S3 y S4',
          descripcion: 'Zona ubicada en Paucarbamba S3 y S4, esta es la zona 2 de recolección.',
          imagen: 'uploads/zonas/ZONA_2_Pbba_S3_4.jpg',
          organizacion_id: 1
        },
        {
          id: 3,
          nombre: 'Paucarbambilla, Fonavi I, Zona 0',
          descripcion: 'Zona ubicada en Paucarbambilla, Fonavi I, Zona 0, esta es la zona 3 de recolección.',
          imagen: 'uploads/zonas/ZONA_3_Pbbilla_F1_Z0.jpg',
          organizacion_id: 1
        },
        {
          id: 4,
          nombre: 'San Luis S1 y S2',
          descripcion: 'Zona ubicada en San Luis S1 y S2, esta es la zona 4 de recolección.',
          imagen: 'uploads/zonas/ZONA_4_San_Luis_1_2_3.jpg',
          organizacion_id: 1
        },
        {
          id: 5,
          nombre: 'San Luis S4 y S5',
          descripcion: 'Zona ubicada en San Luis S4 y S5, esta es la zona 5 de recolección.',
          imagen: 'uploads/zonas/ZONA_5_San_Luis_4_5.jpg',
          organizacion_id: 1
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
          imagen: 'uploads/zonas/ZONA_11A_Colpaj.jpg',
          organizacion_id: 1
        },
        {
          id: 12,
          nombre: 'Matibamba',
          descripcion: 'Zona ubicada en Matibamba, esta es la zona 11B de recolección.',
          imagen: 'uploads/zonas/ZONA_11B_Matibamba.jpg',
          organizacion_id: 1
        }
      ]);
    });
};
