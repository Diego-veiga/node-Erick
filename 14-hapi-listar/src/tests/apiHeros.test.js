const assert = require('assert')
const api = require('./../api')
let app ={}

describe('Suite de testes da API Heroes', function(){
    this.beforeAll(async()=>{
        app = await api
    })
    it('Listar/herois', async()=>{
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=10'
        })
        const statisCode= result.statusCode
        const dados = JSON.parse(result.payload)
        console.log('DADOS',dados)
        assert.deepEqual(statisCode, 200)
        assert.ok(Array.isArray(dados))
    })
    it('listar / herois - deve retornar  somente 10  registros', async () =>{
        const TAMANHO_LIMIT = 3
        const result =  await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}`
        })
        const statisCode= result.statusCode
        const dados = JSON.parse(result.payload)
        console.log('DADOS',dados.length )
        assert.deepEqual(statisCode, 200)
        assert.ok(dados.length === TAMANHO_LIMIT)
    })
    it('listar / herois - deve retornar  somente 10  registros', async () =>{
        const TAMANHO_LIMIT = 'aaa'
        const result =  await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}`
        })
        
        assert.deepEqual(result.payload, "Erro interno no servidor")
        
    })
    it('listar /herois - deve filtrar um item', async () =>{
        const TAMANHO_LIMIT = 1000
        const NAME ='Mulher Maravilha 1608240575608'
        const result =  await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}&nome=${NAME}`
        })
        const statisCode= result.statusCode
        const dados = JSON.parse(result.payload)
        assert.deepEqual(statisCode, 200)
        assert.ok(dados[0].nome === NAME)
    })
})