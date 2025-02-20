const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('usuarios').del();
    await knex('credenciales').del();

    // Insert admin user
    const [userId] = await knex('usuarios').insert({
        id: 1,
        role: 'admin',
        nombres: 'Admin',
        primer_apellido: 'User',
        segundo_apellido: '',
        email: 'admin@example.com',
        telefono: '123456789',
    });

    // Insert admin credentials
    const hashedPassword = await bcrypt.hash('adminpassword', 10);
    await knex('credenciales').insert({
        username: 'admin',
        password: hashedPassword,
        usuario_id: userId,
    });
};
