// npm i happi
const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroiSchema')
const HeroRoutes = require('./routes/heroRoutes')

const HapiSwegger = require( 'hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')

const AuthRoutes = require('./routes/authRoutes')
const { requirements } = require('inert')
const JWT_SECRET ='MEU_SEGREDAO_123'

const HapiJwt= require('hapi-auth-jwt2')


const Postgress = require('./db/strategies/postgres/postgres')
const usuarioSchema = require('./db/strategies/postgres/schemas/usuarioSchema')




const app = new Hapi.server({
    port: 5000
})

function mapRoutes(instance, methods){
    return methods.map(method => instance[method]())
}
async function main (){
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection,HeroiSchema))

    const connectionPostgress = await Postgress.connect()
    const model = await Postgress.defineModel(connectionPostgress, usuarioSchema)
    const contextPostgress = new Context(new Postgress(connectionPostgress,model))


    const SweggerOptions ={
        info:{
            title: 'API  herois',
            version: 'V1.0'
        },
        lang: 'pt'
    }

     await app.register([
        HapiJwt,
        Vision,
        Inert,
        {
            plugin: HapiSwegger,
            options: SweggerOptions 
        }
    ])
    app.auth.strategy('jwt', 'jwt',
                       { key: JWT_SECRET,
                        validate: (dado, Request)=>{
                            return{
                               isValid: true
                           }
                       }
                       
                    })
    app.auth.default('jwt')
    app.route([
        ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
        ...mapRoutes(new AuthRoutes(JWT_SECRET, contextPostgress), AuthRoutes.methods())
    ]
    )

    await app.start()
    console.log('Servidor rodando na porta ', app.info.port)
    return app

}
 module.exports = main()