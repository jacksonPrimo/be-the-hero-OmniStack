

exports.up = function(knex) {
    return knex.schema.createTable('incidents',function(table){
        //chave primaria
        table.increments();
        
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        //chave estrangeira
        table.string('ong_id').notNullable();
        table.foreign('ong_id').references('id').inTable('ongs')
        //aqui estamos dizendo que a coluna ong_id é uma chave extrangeira que faz referencia a 
        //chave primaria id da tabela ongs
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('incidents')
  };
  