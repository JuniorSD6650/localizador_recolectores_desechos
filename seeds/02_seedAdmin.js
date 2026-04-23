const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
    await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
    await knex('usuarios').del();
    await knex('credenciales').del();
    await knex.raw('SET FOREIGN_KEY_CHECKS = 1');

    const [userId] = await knex('usuarios').insert({
        id: 1,
        role: 'admin',
        nombres: 'Admin',
        primer_apellido: 'User',
        segundo_apellido: '',
        email: 'admin@example.com',
        telefono: '123456789',
    });

    const hashedPassword = await bcrypt.hash('adminpassword', 10);
    await knex('credenciales').insert({
        username: 'admin',
        password: hashedPassword,
        usuario_id: userId,
    });
};