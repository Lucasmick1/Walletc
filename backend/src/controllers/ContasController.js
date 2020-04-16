const connection = require('../database/connection');

module.exports = {

    async index(request, response){
        const contas = await connection('contas').select('*');

    response.json( contas )
    },

    async create(request, response){
        const {nome, valor, vencimento, descricao, situacao} = request.body;

        const user_id = request.headers.authorization;

        const [id] = await connection('contas').insert({
            nome,
            valor,
            vencimento,
            descricao,
            situacao,
            user_id
        })
    

        response.json({id})
    },

    async delete(request, response){

        const {id} = request.params;
        const user_id = request.headers.authorization;

            const conta = await connection('contas')
                                .where('id', id)
                                .select('user_id')
                                .first();

            if(conta.user_id != user_id){
                return response.status(401).json({Erro: "Não autorizado"});
            }

            await connection('contas').where('id', id).delete();

            return response.status(204).send();
    },

    async update(request, response){
        const {id} = request.params;
        const user_id = request.headers.authorization;
        const {nome, valor, vencimento, descricao} = request.body;

            const conta = await connection('contas')
                                .where('id', id)
                                .select('user_id')
                                .first();

             if(conta.user_id != user_id){
                return response.status(401).json({Erro: "Não autorizado"});
              }

              await connection('contas').where('id', id).update({
                  nome,
                  valor,
                  vencimento,
                  descricao,
                  user_id
              });

              return response.status(204).send();
    }

    

    
}