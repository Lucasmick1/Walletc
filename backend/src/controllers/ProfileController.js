const connection = require('../database/connection');

module.exports = {

    async index(request, response){

        const user_id = request.headers.authorization;

        const results = await connection('contas').where('user_id', user_id).select('*');
        
        
        
        return response.json(results);
        
        
    }
}