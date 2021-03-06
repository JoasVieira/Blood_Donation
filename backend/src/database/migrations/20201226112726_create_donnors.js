exports.up = function (knex) {
    return knex.schema.createTable('donnors', (table) => {
        table.increments()
        table.string('name').notNullable()
        table.string('email').notNullable()
        table.string('type').notNullable()
    })

};

exports.down = function (knex) {
    return knex.schema.dropTable('donnors')
};
