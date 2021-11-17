const {get}= require('axios')

const URL = `https://swapi.dev/api/people`

async function obterPessoa(nome){

    const url = `${URL}/${nome}`;
    const result = await get(url);
    return result.data.results.map(mapearPessoas)

}
function mapearPessoas(item){
    return{
        nome: item.name,
        peso: item.height
    }
}

module.exports ={
    obterPessoa
}