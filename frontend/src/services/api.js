import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333' // este parâmetro representa uma parte das rotas imutavel aquela que não irá se alterar
})
export default api;