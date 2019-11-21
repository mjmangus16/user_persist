exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    users.increments("id").unique();
    users
      .string("name")
      .notNullable()
      .unique();
    users.string("password").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
