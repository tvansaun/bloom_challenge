
exports.up = function(knex) {

  return knex.schema.createTable('order', (table) => {
  	table.increments().primary();
  	table.timestamps(true, true);
  	table.text('items')
  	table.decimal('total_price', 2);
  });

};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('order');
};