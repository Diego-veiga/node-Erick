/*
0  obter um usuario
1 obter o numer de telefone de um usuario a partir de seu id 
2 obter o endereco do usuario pelo id 
*/

const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco); 

function obterUsuario(){
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function()  {
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            });
            
        }, 1000);
    });
  
}

function obterTelefone(idUsuario){
    return new Promise(function(resolve, reject){
        setTimeout(function() {
            return resolve({
                telefone:'1199002',
                ddd: 11
            });
            
        }, 2000);
    })
    
}

function obterEndereco(idUsuario, callback){
    setTimeout(function() {
        return callback(null,{
            rua: "Av reserva do jappi",
            numero: "123",
            cep: "13211-130"
        });
        
    }, 2000);

}

main()

async function main(){
    try{
        const usuario = await obterUsuario();
        //const telefone = await obterTelefone(usuario.id);
        //const endereco = await obterEnderecoAsync(usuario.id);

        const resultado =await Promise.all([obterTelefone(usuario.id), obterEnderecoAsync(usuario.id)]);
        
        const endereco = resultado[1]
        const telefone = resultado[0]

        console.log(`Nome: ${usuario.nome},
                      Telefone:(${telefone.ddd}) ${telefone.telefone},
                      Endereco: ${endereco.rua}, ${endereco.numero}`)
        
    }catch (error){
        console.log('Deu ruim',error);
    }
}

/*const usuarioPromise = obterUsuario();

usuarioPromise
              .then(function(usuario){
                  return obterTelefone(usuario.id)
                  .then(function resolverTelefone(result){
                      return{
                          usuario: {
                              nome: usuario.nome,
                              id: usuario.id
                          }, 
                          telefone: result
                      }
                  })
              })
              .then(function(resultado){
                  const endereco = obterEnderecoAsync(resultado.usuario.id)
                  return endereco.then(function resolverEndereco(result){
                      return {
                          usuario: resultado.usuario,
                          telefone: resultado.telefone,
                          endereco: result

                      }
                  })
              })
              .then(function(resultado){
                  console.log('resultado', resultado);
              })
              .catch(function(erro){
                  console.error('Deu ruim', erro);

              });


/*obterUsuario( function resolverUsuario(error, usuario){
    if(error){
        console.error("Deu ruim no usuario", error)
        return;
    }
    obterTelefone(usuario.id,function resolverTelefione(erro1,telefone){
        if(erro1){
            console.error("Deu ruim no telefone", erro1)
        }
        obterEndereco(usuario.id, function reolverEndereco(erro2, endereco){
            if(erro2){
                console.log('Deu ruim no endereco', erro2);
            }            
             console.log(`Nome:  ${usuario.nome} \n
                          Endereco: ${endereco.numero},${endereco.rua} \n
                          Telefone: ${telefone.ddd} ${telefone.telefone}`);

        })

    });
});
/*const telefone = obterTelefone(usuario.id);*/


/*console.log('endereco', telefone);*/

