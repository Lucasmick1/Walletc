const connection = require('../database/connection');

module.exports = {

    async indexCarteira(request, response){

        const user_id = request.headers.authorization;


        const usuarioNoBanco = await connection('usuarios').where('id', user_id)
                                                   .select()
                                                   .first();

        
            if(usuarioNoBanco.id !== user_id){
                return response.status(401).json({Erro: "Tarefa não autorizada!"});
            }

            const {carteira} = await connection('usuarios').where('id', user_id)
                                                        .select('carteira')
                                                        .first();
            
                                                        
            return response.json(carteira);
    },

    async updateCarteira(request, response){
        const {novaCarteira} = request.body;
        const user_id = request.headers.authorization;


        const usuarioNoBanco = await connection('usuarios').where('id', user_id).select().first();
        

        if(usuarioNoBanco.id !== user_id){
            return response.status(401).json({Error: "Não foi possível fazer a atualização"})
        };
        
        await connection('usuarios').where('id', user_id).select('carteira').update({
            carteira : novaCarteira
        });

        const {carteira} = await connection('usuarios').where('id', user_id)
        .select('carteira')
        .first();

        return response.json(carteira)
    }

}