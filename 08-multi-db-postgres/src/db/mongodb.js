const ICrud = require('./interface/InterfaceCrud')
class MongoDB extends ICrud { 
    constructor(){
        super()
    }
    create(item){
        console.log('Este item foi salvo no mongo DB')
    }
}
module.exports = MongoDB
