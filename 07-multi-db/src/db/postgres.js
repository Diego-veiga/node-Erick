const ICrud = require('./interface/InterfaceCrud')
class Postgres extends ICrud{
    constructor(){
        super()
    }
    create(item){
        console.log(`Este itenm foi salvo no postgres`)
    }
}

module.exports = Postgres
