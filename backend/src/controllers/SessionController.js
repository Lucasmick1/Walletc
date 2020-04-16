const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const {email} = request.body;

        

        const user = await connection('usuarios').where('email', email).select().first();

        if(user === undefined){
            return response.status(405).send()
        }

        return response.json({
            id: user.id
        });
    },
    async create(request, response){
        const {email, senha} = request.body;

        const user = await connection('usuarios').where('email', email).select().first();


        
       if(user === undefined){
           return response.status(405).send()
       }else if(senha !== user.senha){
           return response.status(405).send();
       }

        return response.json({
            id: user.id,
            nome: user.nome
        })

    }


}