const assert = require('assert')
const { basename } = require('path')
const { obterPessoa} = require('./service')


describe('Star Wars Tests', function(){
    it('deve buscar o r2de com o formato correto', async()=>{
        const expected =[{nome: 'R2-D2', peso: '96'}]
        const nomeBase = `r2-d2`

        const resultado = await obterPessoa(nomeBase);
        assert.deepEqual(resultado,expected)
    })
})