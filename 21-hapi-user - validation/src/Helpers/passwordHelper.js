const Bcrypt = require('bcrypt')
const {promisify} = require('util')
const hasAsync = promisify(Bcrypt.hash)
const compareAsync = promisify(Bcrypt.compare)

const SALT =3

class passwordHelper{
    static hasPassword(pass){
        return hasAsync(pass, SALT)
    }
    static comparePassword(pass, hash){
        return compareAsync(pass, hash)
    }

}

module.exports = passwordHelper