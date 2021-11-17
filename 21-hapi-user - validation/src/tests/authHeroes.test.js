const assert = require('assert')
const api = require('./../api')
const Postgress = require('./../db/strategies/postgres/postgres')
const Context = require('./../db/strategies/base/contextStrategy')
const UsuarioSchema = require('./../db/strategies/postgres/schemas/usuarioSchema') 

let app ={}

const USER={
    username: 'xuxadasilva',
    password: '123'
}
const USER_DB={
    USER: USER.username.toLowerCase(),
    password:'$2b$04$zzf1N.8wTo3QigHjYfl87Ov3pNyoV7I85ZfAZ9sJqAtsE2G6bNgpC'
}

describe('Auth test suite', function(){
    this.beforeAll(async()=>{
         app = await api
         const PostgressConnection=  await Postgress.connect()
         const model = await Postgress.defineModel(PostgressConnection, UsuarioSchema)
         const Postgres = new Context(new Postgress(PostgressConnection,model))
         await Postgres.update(null, USER_DB, true)
    })

    it('deve obter um token', async()=>{
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER

        })

        console.log('RESULT', result.payload)

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length > 10)
    })
})