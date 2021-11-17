const assert = require('assert')
const Postgres = require('./../db/strategies/postgres')
const Context = require('./../db/strategies/base/contextStrategy')


const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR={
    nome: 'Gaviao negro',
    poder:'flexas'
}
const MOCK_HEROI_ATUALIZAR={
    nome: 'Batman',
    poder:'Dinheiro'
}

describe('Postgres Strategy', function(){
    this.timeout(Infinity)
    this.beforeAll( async function() {
        await context.connect()
        await context.create(MOCK_HEROI_ATUALIZAR)
    })
    it('PostgresSql Connection', async function(){
        const result = await context.isConnected();
        assert.equal(result, true)
    })
    it('cadastrar', async function(){
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id

        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('listar', async function(){
        const [result]= await context.read({nome: MOCK_HEROI_CADASTRAR.nome})
        //const [result]= await context.read(MOCK_HEROI_CADASTRAR.nome)
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('atualizar', async function(){
        const [itemAtualziar] = await context.read({nome: MOCK_HEROI_ATUALIZAR.nome})
        const novoItem ={
           ...MOCK_HEROI_ATUALIZAR,
           nome:'Mulher maravilha'
        }

        const [result] = await context.update(itemAtualziar.id, novoItem)
        const [itemAtualziado] = await context.read({id: itemAtualziar.id})
        
        assert.deepEqual(result, 1)
        assert.deepEqual(itemAtualziado.nome, novoItem.nome)
    })
    it('remover por id', async function(){
        const [item] = await context.read({})
        const result = await context.delete(item.id)
        assert.deepEqual(result, 1)
    })
})