const ICrud = require('./../interface/InterfaceCrud')

class ContextStrategy extends ICrud{
    constructor(strategy){
        super()
        this._databse= strategy;
    }
    create(item){
        return this._databse.create(item)
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
    isConected(){
        this._databse.isConected()
    }
}

module.exports = ContextStrategy