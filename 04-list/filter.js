const { obterPessoas, obtertPessoa} = require('./services');

/*
 const item ={
     nome:'Erick',
     idade:12,
     altura=1.50
 }
 const {nome, idade} =item
 */

 async function main(){
     try {
         const { results } = await obtertPessoa('a');
         
         const familiaLars= results.filter(function (item){
             //por padrão precisa retornar um booleano
             // para informar  se deve mater ou remover da lista 
             //flase > remove da lista
             // true mantem
             //não econtrou =-1
             //encontrou = posicaoNo Array
             const result = item.name.toLowerCase( ).indexOf('lars') !== -1
             return result;
         })
         const names= familiaLars.map((pessoa)=> pessoa.name)
         console.log(names)

         
     } catch (error) {
         console.error('error', error);
         
     }
 }

 main()