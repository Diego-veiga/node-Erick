const ICrud = require('../interface/InterfaceCrud')

class ContextStrategy extends ICrud{
    constructor(strategy){
        super()
        this._databse= strategy;
    }
    create(item,skip, limit){
        return this._databse.create(item,skip, limit)
    }
    read(item){
        return this._databse.read(item)
    }
    update(id,item){
        return this._databse.update(id,item)
    }
    delete(id){
        return this._databse.delete(id)
    }
     isConnected(){
       return this._databse.isConnected()
    }
    static connect(){
        return this._databse.connect()
    }
}

module.exports = ContextStrategy