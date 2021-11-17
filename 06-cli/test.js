const { deepEqual, ok } = require('assert');
const { DH_CHECK_P_NOT_PRIME } = require('constants');
const database = require('./database');

const DEFAULT_ITEM_CADASTRAR={  
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}
const DEFAUT_ITEM_ATUALZIAR={
   nome: 'Lanterna verde',
   poder: 'Energia de anel',
   id: 2

}

describe('Suite de manipulação de herois', ()=>{
    before(async () =>{
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
        await database.cadastrar(DEFAUT_ITEM_ATUALZIAR);
    })
    it('deve pesquisar um heroi usando arquivos', async()=>{
        const expected = DEFAULT_ITEM_CADASTRAR;
        const [resultado] = await database.listar(expected.id)


        ok(resultado, expected)
    })
    it('deve cadatrar um heroi, usando arquivos', async()=>{
        const expected = DEFAULT_ITEM_CADASTRAR;
        const  resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id);

        deepEqual(actual, expected)
    })
    it('deve remover um heroi por id', async () =>{
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);
        deepEqual(resultado, expected)
    })
    
    it('deve atualziar um heroi pelo id', async () =>{
        const expected ={
            ...DEFAUT_ITEM_ATUALZIAR,
            nome: 'Batman',
            poder: 'Dinheiro'
        }

        const novoDado ={
            nome: 'Batman',
            poder: 'Dinheiro'
        }

         await database.atualizar(DEFAUT_ITEM_ATUALZIAR.id, novoDado);
        const [resultado] = await database.listar(DEFAUT_ITEM_ATUALZIAR.id)
        deepEqual(resultado, expected);

    })
})