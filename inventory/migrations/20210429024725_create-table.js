
exports.up = function(knex) {
  return knex.schema.createTable('inventory', (table) => {
  	table.increments().primary();
  	table.text('item_name');
  	table.decimal('price', 2);
  	table.integer('quanity').unsigned();
  });

};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('inventory');
};
