const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')
const Jwt = require('jsonwebtoken')
const { boomify } = require('boom')
const passwordHelper = require('./../Helpers/passwordHelper')
const failAction= (request,handler,erro)=>{
    throw erro;
}

const USER={
    username: 'xuxadasilva',
    password: '123'
}
class AuthRoutes extends BaseRoute{
    constructor(secret, db){
        super()
        this.secret = secret,
        this.db = db
    }
    login(){
        return{
            path: '/login',
            method: 'POST',
            config:{
                auth: false,
                tags: ['api'],
                description: 'obter token',
                notes: 'Deve obter o token com usuario e senha',
                validate: {
                    failAction,
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async(request)=>{
                const {username, password} = request.payload
                const [usuario] = await this.db.read({username: username.toLowerCase()})
                if(!usuario){
                    return Boom.unauthorized('O usuario informado não existe')
                }
                const Match = await passwordHelper.comparePassword(password, usuario.password)
                if(!Match){
                    return Boom.unauthorized('usuario e senha inválidos')
                }

                /*if(username.toLowerCase() !== USER.username || password !== USER.password)
                return Boom.unauthorized() */

                const token = Jwt.sign({username: username, id: usuario.id}, this.secret)
                
                 return{
                     token
                 }
            

            }
   
        }
    }
}

module.exports = AuthRoutes

