const connection = require('../database/connection');

module.exports = {
    async indexSalario(request, response){

        const user_id = request.headers.authorization;

        const usuarioNoBanco =await connection('usuarios').where('id', user_id)
                                                   .select()
                                                   .first();

        
            if(usuarioNoBanco.id !== user_id){
                return response.status(401).json({Erro: "Tarefa não autorizada!"});
            }

            const {salario} = await connection('usuarios').where('id', user_id)
                                                        .select('salario')
                                                        .first();
                                                        
            return response.json(salario);
    },

    async updateSalario(request, response){
        
        const {novoSalario} = request.body;
        const user_id = request.headers.authorization;


        const usuarioNoBanco = await connection('usuarios').where('id', user_id).select().first();
        

        if(usuarioNoBanco.id !== user_id){
            return response.status(401).json({Error: "Não foi possível fazer a atualização"})
        };

        const antigoSalario = await connection('usuarios').where('id', user_id).select('salario').first();

        const antigaCarteira = await connection('usuarios').where('id', user_id).select('carteira').first();

        await connection('usuarios').where('id', user_id).select('salario').update({
            salario :novoSalario
        });
        
        const novaCarteira = (novoSalario - antigoSalario.salario) + antigaCarteira.carteira;
        
        
        await connection('usuarios').where('id', user_id).select('carteira').update({
            carteira:novaCarteira
        })
        
        
        return response.status(200).json({Successful: "Atualização feita com sucesso!"});
    
}
}