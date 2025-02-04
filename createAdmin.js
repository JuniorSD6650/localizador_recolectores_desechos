require('dotenv').config();
const bcrypt = require('bcryptjs');
const knex = require('knex')(require('./knexfile.js'));

const createAdmin = async () => {
  try {
    const username = 'admin';
    const password = 'adminpassword';

    // Verifica si ya existe un usuario con rol de 'admin'
    const existingAdmin = await knex('usuarios').where({ role: 'admin' }).first();
    if (existingAdmin) {
      console.log('El usuario administrador ya existe.');
      return;
    }

    // Crea el usuario en la tabla 'usuarios'
    const result = await knex('usuarios').insert({
      role: 'admin',
      nombres: 'Admin',
      primer_apellido: 'Admin',
      email: 'admin@example.com',
      telefono: '123456789',
      created_at: knex.fn.now()
    });

    const userId = result[0] ? result[0] : result.insertId; // Obtiene el ID en MySQL

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea las credenciales asociadas al usuario
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
