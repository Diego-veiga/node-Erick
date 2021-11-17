const ContextStrategy = require('./db/base/contextStrategy')
const Postgres = require('./db/postgres')
const MongoDB = require('./db/mongodb')

const p = new ContextStrategy(new Postgres());
p.create();

const contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create('produto')
