const { obtertPessoa } = require('./services');

async function main (){

    try {
        const {results} = await obtertPessoa('a');
        const pesos =results.map((item)=> parseInt(item.height));

    const total = pesos.reduce((anterior, proximo)=>{
        return anterior + proximo;
    })
    console.log(pesos);
    console.log('total', total);


    const minhaLista =[['aline', 'bia'], ['diego', 'elvis']];
    console.log(minhaLista);

    const junto = minhaLista.reduce((anterior, proximo)=>{
        return anterior.concat(proximo);
    },[])

    console.log('junto',junto);
        
    } catch (error) {
        console.error('error',error);
        
    }
}
main();