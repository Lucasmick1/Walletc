
exports.up = function(knex) {
    return knex.schema.createTable('contas', function(table){
        table.increments();

        table.string('nome').notNullable();
        table.decimal('valor').notNullable();
        table.string('vencimento').notNullable();
        table.string('descricao');
        table.string('situacao').notNullable();
        table.string('user_id').notNullable();
  
        table.foreign('user_id').references('id').inTable('usuario');
  
    })
  };
  
  exports.down = function(knex) {
   return knex.schema.dropTable('conta');
  };
  