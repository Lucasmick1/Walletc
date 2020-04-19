const connection = require('../database/connection');

module.exports = {



    
    async indexCarteiraBd(request, response){
        const user_id = request.headers.authorization;

        const usuarioNoBanco = await connection('usuarios').where('id', user_id).select().first();

        if(usuarioNoBanco.id !== user_id){
            return response.status(405).json({Error:"Tarefa não autorizada!"});
        };

        const {carteiraBd} = await connection('usuarios').where('id', user_id).select('carteiraBd').first();

        return response.json(carteiraBd);
    },

    async adicionaFundosCarteiraBd(request, response){

        const {fundosCarteiraBd} = request.body;
        const user_id = request.headers.authorization;

        const usuarioNoBanco = await connection('usuarios').where('id', user_id).select().first();

        if(usuarioNoBanco.id !== user_id){
            return response.status(401).json({Error: "Não foi possível adicionar os fundos a carteira"})
        }

        const antigaCarteiraBd = await connection('usuarios').where('id', user_id).select('carteiraBd').first();
       
        
        const novaCarteiraBd = antigaCarteiraBd.carteiraBd + fundosCarteiraBd;

        await connection('usuarios').where('id', user_id).select('carteiraBd').update({
            carteiraBd : novaCarteiraBd
        });

        const {carteiraBd} = await connection('usuarios').where('id', user_id).select('carteiraBd').first();
        return response.json(carteiraBd);
    }
}