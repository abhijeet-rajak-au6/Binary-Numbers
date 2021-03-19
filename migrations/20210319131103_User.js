exports.up = async function (knex) {
  await knex.schema.createTable("user", function (table) {
    table.increments().primary();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("role").notNullable();
    table.string("account_no").unique();
    table.integer("total_balance").defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("user");
};
