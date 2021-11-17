






//const p = new COntextStrategy(new Postgres());
//p.create();

const contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create('produto')
