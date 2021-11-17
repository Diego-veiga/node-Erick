const assert = require('assert')
const api = require('./../api')
let app ={}

const TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inh1eGFkYXNpbHZhIiwiaWQiOjEsImlhdCI6MTYwOTc4OTg3NX0.sdPoIjd4fOOFbhEDV8dNb3ZcH0ffxSO7seS2HlWibKk'
const headers = {
    Authorizathion: TOKEN
}
const MOCK_HEROI_CADASTRAR={
    nome: 'Chapolin Colorado',
    poder: 'Marreta bionica'
}

const MOCK_HEROI_INCIAL={
    nome:'Gaviao Negro',
    poder: 'A mira'
}
let MOCK_ID=''

describe('Suite de testes da API Heroes', function(){
    this.beforeAll(async()=>{
        app = await api
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            headers,
            payload: JSON.stringify(MOCK_HEROI_INCIAL)
        })
        const dados = JSON.parse(result.payload)
        MOCK_ID = dados._id
       
    })
    it('Listar/herois', async()=>{
        const result = await app.inject({
            method: 'GET',
            headers,
            url: '/herois?skip=0&limit=10'
        })
        const statisCode= result.statusCode
        const dados = JSON.parse(result.payload)
        
        assert.deepEqual(statisCode, 200)
        assert.ok(Array.isArray(dados))
    })
    it('listar / herois - deve retornar  somente 10  registros', async () =>{
        const TAMANHO_LIMIT = 3
        const result =  await app.inject({
            method: 'GET',
            headers,
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}`
        })
        const statisCode= result.statusCode
        const dados = JSON.parse(result.payload)
        
        assert.deepEqual(statisCode, 200)
        assert.ok(dados.length === TAMANHO_LIMIT)
    })
    it('listar / herois - deve retornar  somente 10  registros', async () =>{
        const TAMANHO_LIMIT = 'aaa'
        const result =  await app.inject({
            method: 'GET',
            headers,
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}`
        })
        const errorResut ={
        "statusCode":400,
        "error":"Bad Request",
        "message":"child \"limit\" fails because [\"limit\" must be a number]",
        "validation":{
                "source":"query",
                "keys":["limit"]
            }

        }
        assert.deepEqual(result.statusCode, 400)
        assert.deepEqual(result.payload, JSON.stringify(errorResut))
        
    })
    it('listar /herois - deve filtrar um item', async () =>{
        const TAMANHO_LIMIT = 1000
        const NAME = MOCK_HEROI_INCIAL.nome
        const result =  await app.inject({
            method: 'GET',
            headers,
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}&nome=${NAME}`
        })
        const statisCode= result.statusCode
        const dados = JSON.parse(result.payload)
        assert.deepEqual(statisCode, 200)
        assert.ok(dados[0].nome === NAME)
    })
    it('cadastrar POST -/herois', async()=>{
        const result = await app.inject({
            method: 'POST', 
            url: '/herois',
            headers,
            payload: MOCK_HEROI_CADASTRAR
             
        })
        const statusCode =  result.statusCode
        const {message , _id} = JSON.parse(result.payload) 
        assert.ok(statusCode, 200)
        assert.notStrictEqual(_id, undefined)
        assert.deepEqual(message,"Heroi cadastrado com sucesso")
    })
    it('atualizar /herois/{id}', async () => {
        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${MOCK_ID}`,
            headers,
            payload: {
                nome: 'Canário Negro',
                poder: 'Grito'
            }
        })
       
       const statusCode = result.statusCode
       const dados = JSON.parse(result.payload)
        assert.ok(statusCode, 200) 
        assert.deepEqual(dados.message, 'heroi atualizado com sucesso')

    })
    it('atualizar PATCH - /heroi/:{id} não deve atualizar com o id incorreto', async()=>{
        const _id=`5bfdb6e83f66ad3c32939fb1`
        

        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            headers,
            payload: JSON.stringify({ poder: 'super mira'})
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        console.log('DADOS', dados)
        const expected={
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'Id não encontrado no banco'
        }
        assert.ok(statusCode === 412) 
        assert.deepEqual(dados, expected)


    }) 
    it( 'remover DELETE - /HEROIS/:id' , async()=>{
        const _id = MOCK_ID
        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/herois/${_id}`
        })
        console.log('ID', _id)

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        assert.ok(statusCode, 200)
        assert.deepEqual(dados.message, 'Heroi removido com sucesso')

    })
    it( 'remover DELETE - /HEROIS/:id  não deve atualizar com o id incorreto' , async()=>{
        const _id=`5bfdb6e83f66ad3c32939fb1`
       
        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/herois/${_id}`
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        const expected={
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'Id não encontrado no banco'
        }
        assert.ok(statusCode===412)
        assert.deepEqual(dados, expected)

    })
    it( 'remover DELETE - /HEROIS/:id  não deve atualizar com o id invalido' , async()=>{
        const _id=`ID_INVALIDO`
       
        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/herois/${_id}`
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        
        const expected={
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'An internal server error occurred'
          }
        assert.ok(statusCode===500)
        assert.deepEqual(dados, expected)

    })
})