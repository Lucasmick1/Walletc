exports.up = function(knex) {
    return  knex.schema.createTable('usuarios', function(table){
         table.string('id').primary();
         table.string('nome').notNullable();
         table.string('email').notNullable();
         table.string('senha').notNullable();
         table.decimal('salario').notNullable();
         
     })
   };
   
   exports.down = function(knex) {
     knex.schema.dropTable('usuario');
   };

