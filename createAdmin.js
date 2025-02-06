require('dotenv').config();
const bcrypt = require('bcryptjs');
const knex = require('knex')(require('./knexfile.js'));

const createAdmin = async () => {
  try {
    const username = 'admin';
    const password = 'adminpassword';

    const existingAdmin = await knex('usuarios').where({ role: 'admin' }).first();
    if (existingAdmin) {
      console.log('El usuario administrador ya existe.');
      return;
    }

    const result = await knex('usuarios').insert({
      role: 'admin',
      nombres: 'Admin',
      primer_apellido: 'Admin',
      email: 'admin@example.com',
      telefono: '123456789',
      created_at: knex.fn.now()
    });

    const userId = result[0] ? result[0] : result.insertId;

    const hashedPassword = await bcrypt.hash(password, 10);

    await knex('credenciales').insert({
      username: username,
      password: hashedPassword,
      usuario_id: userId,
      created_at: knex.fn.now()
    });

    console.log('Administrador creado exitosamente');
  } catch (error) {
    console.error('Error creando el administrador:', error);
  } finally {
    knex.destroy();
  }
};

createAdmin();
