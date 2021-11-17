//docker ps
//docker exec -it 1ce127ee82a4 mongo -u erickwendel -p minhasenhasecreta --authenticationDatabase herois 

//databases
show dbs


//mudando o contexto para uma database
use herois

//mostrar tables (colecoes)
show collections


db.herois.count()

db.herois.findOne()


//create 
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})
for ( let i=0; i<=1000;i++){
    db.herois.insert({
        nome: `Clone -${i}`,
        poder: `valocidade`,
        daatNascimento: '1998-01-01'
    })
}

//read
db.herois.find()
db.herois.find().pretty()
db.herois.find().limit(1000).sort({nome:-1})
db.herois.finc({}, {poder: 1, _id:0})

//update
db.herois.update({_id: ObjectId("5fda1df447ab24c58c86cb7f")}, {nome: "Mulher maravilha"})
db.herois.update({_id: ObjectId("5fda1df447ab24c58c86cb73")}, { $set: {nome: "Lanterna verde"}})

//remove
 db.herois.remove({})
 db.herois.remove({nome: "Mulher maravilha"})

