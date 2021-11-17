const { pesosas } = require('./services');
const services = require('./services');
const service = require('./services')

async function main(){

    try{
        
        const result = await service.obtertPessoa('a');
        const names = [];
        /*for(let i = 0; i <= result.results.length - 1; i++){
            const pessoa= result.results[i];
            names.push(pessoa.name);
          
        }*/
       /* for(let i in result.results){
            const pessoa = result.results[i];
            names.push(pessoa.name);
        }*/

        for(pessoa of result.results){
            names.push(pessoa.name);
        }
        console.log('nome', names);

    }catch(error){
        console.error('erro', error);

    }

   
  
}
    
    main()