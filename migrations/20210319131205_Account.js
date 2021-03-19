exports.up = async function (knex) {
  await knex.schema.createTable("account", function (table) {
    table.increments().primary();
    table.integer("deposited").defaultTo(0);
    table.integer("withdraw").defaultTo(0);
    table.string("account_id").references("account_no").inTable("user");
    table.integer("user_id").unsigned().references("id").inTable("user").index();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("account");
};
