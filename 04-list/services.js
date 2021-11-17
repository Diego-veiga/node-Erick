const axios = require('axios')

const URL = `https://swapi.dev/api/people`

async function obtertPessoa(nome){
    url = `${URL}/?search=${nome}`
    const results =  await axios.get(url);
    console.log(results.data);
    return results.data

}

module.exports= {
    obtertPessoa
}