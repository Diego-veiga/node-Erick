const assert = require('assert')
const api = require('./../api')
let app ={}

describe.only('Suite de testes da API Heroes', function(){
    this.beforeAll(async()=>{
        app = await api
    })
    it('Listar/herois', async()=>{
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })
        const statisCode= result.statusCode
        const dados = JSON.parse(result.payload)
        console.log('DADOS',dados)
        assert.deepEqual(statisCode, 200)
        assert.ok(Array.isArray(dados))
    })
})