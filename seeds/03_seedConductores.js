const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
    await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
    // Limpiamos credenciales de conductores y luego los usuarios
    await knex('credenciales').whereIn('usuario_id', function () {
        this.select('id').from('usuarios').where('role', 'conductor');
    }).del();
    await knex('usuarios').where('role', 'conductor').del();
    await knex.raw('SET FOREIGN_KEY_CHECKS = 1');

    const conductores = [
        { id: 2, role: 'conductor', nombres: 'ERIK CHARLIE', primer_apellido: 'CABRERA', segundo_apellido: 'ESTACIO', dni: '43221638', telefono: '997237574' },
        { id: 3, role: 'conductor', nombres: 'KELVIN', primer_apellido: 'BORJA', segundo_apellido: 'SERAFIN', dni: '47957827', telefono: '965456679' },
        { id: 4, role: 'conductor', nombres: 'JUAN ALESSANDRI', primer_apellido: 'TELLO', segundo_apellido: 'AGUIRRE', dni: '48363419', telefono: '960210016' },
        { id: 5, role: 'conductor', nombres: 'HEYNER DIEGO', primer_apellido: 'ALIAGA', segundo_apellido: 'PUJAY', dni: '43283364', telefono: '900259647' },
        { id: 6, role: 'conductor', nombres: 'REY ISAAC', primer_apellido: 'ESPINOZA', segundo_apellido: 'RAMIREZ', dni: '71568270', telefono: '972115766' },
        { id: 7, role: 'conductor', nombres: 'GERMAN', primer_apellido: 'RAMOS', segundo_apellido: 'BENANCIO', dni: '22750056', telefono: '918880245' }
    ];

    const hashedPassword = await bcrypt.hash('conductorpassword', 10);

    for (const conductor of conductores) {
        await knex('usuarios').insert(conductor);
        await knex('credenciales').insert({
            username: `conductor${conductor.dni}`,
            password: hashedPassword,
            usuario_id: conductor.id,
        });
    }
};