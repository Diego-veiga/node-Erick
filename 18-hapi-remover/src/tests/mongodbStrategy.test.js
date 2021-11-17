const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb/mongodb')
const heroiSchema = require('./../db/strategies/mongodb/schemas/heroiSchema')
const Context = require('./../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR ={   
    nome: 'Mulher Maravilha',
    poder: 'Laço'
}
const MOCK_HEROI_DEFAULT={
    nome: `Mulher Maravilha ${Date.now()}`,
    poder: 'Laço'
} 
const MOCK_HEROI_ATAULIZAR={
    nome: `Patolino ${Date.now()}`,
    poder: 'Valocidade'
} 
let MOCK_HEROI_ID=''

let context = {}

describe('MongoDb suite de testes', function(){
    this.beforeAll( async function() {
        const connection = MongoDb.connect()
        context = new Context(new MongoDb(connection,heroiSchema))

        await context.create(MOCK_HEROI_DEFAULT)
        const resul= await context.create(MOCK_HEROI_ATAULIZAR)
        MOCK_HEROI_ID=  resul._id

    })   
    it('verificar conexao', async()=>{
        const result = await context.isConnected()
        expected ='Conectado'
        assert.deepEqual(result, expected)
    })
    it('cadastrar', async()=>{
        const {nome, poder} = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })
    it('listar', async()=>{
        const [{nome, poder}]= await context.read({nome:MOCK_HEROI_DEFAULT.nome})
        const resul={
            nome, poder
        }
        assert.deepEqual(resul, MOCK_HEROI_DEFAULT)
    })
    it('atualizar', async() =>{
        const result = await context.update(MOCK_HEROI_ID,{ nome:'Pernalonga'})

        assert.deepEqual(result.nModified,1)
    })
    it('Remover', async()=>{
        const result = await context.delete(MOCK_HEROI_ID)
        assert.deepEqual(result.n,1)
    })

})