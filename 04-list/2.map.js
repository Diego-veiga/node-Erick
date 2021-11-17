const service = require('./services');

const Pessoas =[
    {
        id:1,
        nome:'Diego Veiga',
        titulos:['tecnico', 'graduado']
    },
    {
        id:2,
        nome:'Diego Veiga',
        titulos:['tecnico', 'graduado', 'pos-graduado']
    },
    {
        id:3,
        nome:'Diego Veiga',
        titulos:['tecnico', 'graduado', 'mestre']
    },
    {
        id:4,
        nome:'Diego Veiga',
        titulos:['tecnico', 'graduado', 'pos-mestre']
    },

]

const titulos = Pessoas.map(function(pessoa){
    return `${pessoa.nome} tem os seguintes titulos ${pessoa.titulos}`
})
console.log(titulos);

async function main(){
   try {
      /* const results = await service.obtertPessoa('a');
       //const names=[];
      /* results.results.forEach(function(item){
           names.push(item.name);
       })*/

       /*const names=results.results.map(function(pessoa){
          return pessoa.name;
       })*/

      /* const names = results.results.map(pessoa => pessoa.name);
       /*console.log('name', names);*/
       
   } catch (error) {
       console.error('error', error)
       
   }
}

main()