var http = require('http');

var configuracoes = {
    hostName : 'localhost',
    port : 3000,
    path: '/produtos',
    headers : {
        'accept':'application/json'
    }
}

http.get(configuracoes,function(res){
    console.log(res.statusCode);
    res.on('data',function(body){
        console.log('resultado' + body);
    });
});