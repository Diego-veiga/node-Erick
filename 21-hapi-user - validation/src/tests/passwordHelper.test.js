const assert = require('assert')
const api = require('./../api')
const passwordHelper = require('../Helpers/passwordHelper')
const Context = require('./../db/strategies/base/contextStrategy')
const Postgres = require('./../db/strategies/postgres/postgres')



const SENHA = '123'
const HASH='$2b$04$dcaoHp8hIMjbsOC9xYsrAOuRAzbIJvDfwPrkL51GSNsO7ir5ne5Va'

const USER={
    username: 'xuxadasilva',
    password: '123'
}
const USER_DB={
    ...USER,
    password:''
}


describe('UserHelp senha suite', function(){
        
    it('Deve gerar um hash a partir de uma senha', async()=>{
        const result= await passwordHelper.hasPassword(SENHA)
        assert.ok(result.length > 10)
    })
    it('deve comparar a senha e seu hash', async()=>{
        const result = passwordHelper.comparePassword(SENHA, HASH)

        assert.ok(result)
    })
})