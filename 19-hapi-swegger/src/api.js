// npm i happi
const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroiSchema')
const HeroRoutes = require('./routes/heroRoutes')

const HapiSwegger = require( 'hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')



const app = new Hapi.server({
    port: 5000
})

function mapRoutes(instance, methods){
    return methods.map(method => instance[method]())
}
async function main (){
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection,HeroiSchema))
    
    const SweggerOptions ={
        info:{
            title: 'API  herois',
            version: 'V1.0'
        },
        lang: 'pt'
    }

     await app.register([
        Vision,
        Inert,
        {
            plugin: HapiSwegger,
            options: SweggerOptions 
        }
    ])
    app.route(
      mapRoutes(new HeroRoutes(context), HeroRoutes.methods())
        
    )
    await app.start()
    console.log('Servidor rodando na porta ', app.info.port)
    return app

}
 module.exports = main()