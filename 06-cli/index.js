const Commander = require('commander');
const { obterDadosArquivo } = require('./database');
const database = require('./database');
const Database = require('./database');
const Heroi= require('./heroi');

async function main(){
    Commander
             .version('v1')
             .option('-n, --nome [value]', "Nome do heroi")
             .option('-p, --poder [value]', "Poder de Heroi")
             .option('-i, --id [value]', "Id do Heroi")

             .option('-c, --cadastrar', "Cadastrar um heroi")
             .option('-l, --listar', "Listar um heroi")
             .option('-r, --remover [value]', "Remover um heroi")
             .parse(process.argv);

             const heroi = new Heroi(Commander);
             try {
                if(Commander.cadastrar){
                    delete heroi.id 
                   const resultado = await Database.cadastrar(heroi);
                   if(! resultado){
                       console.error('Heroi não foi cadastrado')
                       return;
                   }
                   console.log('Heroi cadastrado');

                }
                if(Commander.listar){
                    const resultado = await Database.listar();
                    console.log(resultado);
                    return;

                }
                if(Commander.remover){
                    const resultado = await Database.remover(heroi.id);
                    if(!resultado){
                        console.error('Não foi possivel remover o heroi')
                        return;
                    }
                    console.log('Heroi removido com sucesso!');
                }
                if(Commander.atualizar){
                    const idParaAtualziar = parseInt(Commander.atualizar);
                    const dado = JSON.stringify(heroi);
                    const heroiAtualziar = JSON.parse(dado);
                    const resultado = await Database.atualizar(idParaAtualziar, heroiAtualziar);
                    id(!resultado){
                        console.error('Não foi possivel atualziar o heroi');
                        return;
                    }
                    console.log('Heroi atualizado com sucesso');
                }
                 
             } catch (error) {
                 console.error('error', error);
                 
             }
}

main()