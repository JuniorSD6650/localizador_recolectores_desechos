exports.seed = function (knex) {
    return knex('calles').del()
        .then(function () {
            return knex('calles').insert([

            ]);
        });
};
