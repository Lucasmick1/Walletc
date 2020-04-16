const connection = require('../database/connection');
const crypto = require('crypto');
module.exports = {

    async index(request, response){

        const usuarios = await connection('usuarios').select('*');
    
        response.json( usuarios )
    },




    async create(request, response){

        const {nome, email, senha, salario } = request.body;
    
        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('usuarios').insert({
            id,
            nome,
            email,
            senha,
            salario
        })
    
        return response.json({ id });
    },



    async indexSalario(request, response){

        const user_id = request.headers.authorization;

        const usuario =await connection('usuarios').where('id', user_id)
                                                   .select()
                                                   .first();

        
            if(usuario.id !== user_id){
                return response.status(401).json({Erro: "Tarefa não autorizada!"});
            }

            const salario = await connection('usuarios').where('id', user_id)
                                                        .select('salario')
                                                        .first();
            return response.json(salario);
    },




    async updateSalario(request, response){
        
            const {salario} = request.body;
            const user_id = request.headers.authorization;


            const usuario = await connection('usuarios').where('id', user_id).select().first();

            if(usuario.id !== user_id){
                return response.status(401).json({Error: "Não foi possível fazer a atualização"})
            };

           await connection('usuarios').where('id', user_id).select('salario').update({
                salario
            });
            
        
            return response.status(200).json({Successful: "Atualização feita com sucesso!"});
        
    }
}