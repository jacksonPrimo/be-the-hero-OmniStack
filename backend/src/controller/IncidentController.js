const connection = require('../database/connection')

module.exports = {
    async create(request, response){
        const{title, description, value} = request.body
        const ong_id = request.headers.authorization;
        const[id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })
        response.json({id})
    },
    async list(request, response){
        const {page = 1} = request.query
        
        const [count] = await connection('incidents').count(); //contando quantos casos foram registraodos
        
        const body = await connection('incidents')
            .join('ongs', 'ong_id', '=', 'incidents.ong_id') // aqui fazemos uma junção entre a tabela incidents e ong apenas para valores onde o ong_id forem iguais
            .limit(5)//limitar a consulta ao banco de dados para 5 registros
            .offset((page - 1) * 5) //offset serve para pular registros, e neste caso a cada pagina ele pula uma certa quantidade de registros 
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ])
        response.header('X-total_count', count['count(*)'])
        return response.json(body)
    },

    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)//aqui filtramos apenas dados da tabela cujo id passado na requisição seja igual ao id da tabela
            .select('ong_id')//aqui estamos pegando apenas o valor org_id da tabela
            .first();//como haverá apenas um caso com este id usamos essa função para pegar apenas o primeiro resultado
        if(incident.ong_id != ong_id){
            return response.status(401).json({error: "Operation not permitted. "})
        }
        //se o org_id do incidente for diferente do org_id que esta logado ou seja o que esta no header da requisição então será retornado um status de erro de pessoa não altorizada
        await connection('incidents').where('id', id).delete();
        return response.status(204).send();
    }
}