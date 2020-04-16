const connection = require('../database/connection');

module.exports = {


    async index(request, response){
        const {id} = request.params;
        const user_id = request.headers.authorization;

        const user = await connection('contas').where('id', id).select('user_id').first();

            if(user_id !== user.user_id){
                return response.status(401).send();
            }

        const {situacao} = await connection('contas').where('id', id).select('situacao').first();

        return response.status(200).send(situacao);
    },

    async update(request, response){
        const {id} = request.params;
        const user_id = request.headers.authorization;

        const {situacao} = request.body;

        const user = await connection('contas').where('id', id).select('user_id').first();

            if(user_id !== user.user_id){
                return response.status(401).send();
            }
        
            await connection('contas').where('id', id).select('situacao').update({
                situacao
            })

            return response.status(200).send()
    }
}