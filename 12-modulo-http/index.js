const http = require('http')

http.createServer((request, response)=>{
    response.end('Hello node')
}).listen(5000, ()=> console.log('O servidor esta rodando!!!'))