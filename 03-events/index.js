 const { rejects } = require('assert');
const EventEmitter = require('events');
const { resolve } = require('path');


 class MeuEmissor extends EventEmitter{

 }

 const meuEmissor = new MeuEmissor()
 const nomeEvento = 'usuario:click'
 
 meuEmissor.on(nomeEvento, function(click){
     console.log('um usuario clicou', click)
 })

let contador =0
while(contador<10){
    meuEmissor.emit(nomeEvento, 'na barra de rolagem');
    meuEmissor.emit(nomeEvento, 'no ok')
    contador=contador++;
}

const stdin = process.openStdin();

function main (){
    return new Promise((resolve, reject){
        console.log(`você digitou: ${value.toString()>DataTransferItem()}`)
         stdin.addListener('data', function(value){
             
         })
    })
}


