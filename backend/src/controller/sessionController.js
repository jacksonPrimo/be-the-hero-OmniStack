//controller que faz a verificação de um id para saber se ele existe
//é ultilizada no login 
const connection = require('../database/connection'); 
module.exports = {
    async autenticar(request, response){
        const {id} = request.body
        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first()
        if (!ong){
            return response.status(404).json({error:'no Ong found with this id'})
        }
        response.json(ong)
    }
}