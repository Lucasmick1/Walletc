const connection = require('../database/connection');
const crypto = require('crypto');
module.exports = {

    async index(request, response){

        const usuarios = await connection('usuarios').select('*');
    
        response.json( usuarios )
    },




    async create(request, response){

        const {nome, email, senha, salario, carteira, carteiraBd } = request.body;
    
        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('usuarios').insert({
            id,
            nome,
            email,
            senha,
            salario,
            carteira,
            carteiraBd
        })
    
        return response.json({ id });
    },

    

    


    
}