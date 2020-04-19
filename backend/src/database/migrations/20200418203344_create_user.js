
exports.up = function(knex) {
    return  knex.schema.createTable('usuarios', function(table){
         table.string('id').primary();
         table.string('nome').notNullable();
         table.string('email').notNullable();
         table.string('senha').notNullable();
         table.decimal('salario').notNullable();
         table.decimal('carteira').notNullable();
         table.decimal('carteiraBd').notNullable();
         
     })
   };
   
   exports.down = function(knex) {
     knex.schema.dropTable('usuario');
   };