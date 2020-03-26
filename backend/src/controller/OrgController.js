//este arquivo serve para colocar o conteúdo das rotas ou seja a função que recebe uma requisição e devolve uma resposta
const connection = require('../database/connection'); //arquivo feito dentro da pasta database para gerar uma conexão com o banco de dados sqlite 
const crypto = require('crypto') // biblioteca para gerar o id
module.exports = {
    async create(request, response){ //async estabelece que esta é uma função assincrona
        const {name, email, whatsapp, city, uf} = request.body
        //aqui pegamos cada um dos valores passados na requisição post e colocamos em uma constante 
        const id = crypto.randomBytes(4).toString('HEX')
        /**
         * como o id não será gerado pelo cliente e sim pelo servidor colocamos ele separado dos outros dados
         * crypto.randomBytes(4) irá gerar um valor aleatorio de 4 bytes
         * .toString("HEX") irá converter este valor gerado em uma string hexadecimal
         * */
        await connection('ongs').insert({ // estabelece que só seguirá com a execução após o termino deste treixo de codigo
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
        return response.json({id})
    },
    async list(request, response){
        const ongs = await connection('ongs').select('*')
        return response.json(ongs)
    }
}