var http = require('http');

var configuracoes = {
    hostName : 'localhost',
    port : 3000,
    path: '/produtos',
    method: 'post',
    headers : {
        'accept':'application/json',
        'content-type':'application/json'
    }
}

var produto = {
    produto: 'test post'
}

var clientRequest = http.request(configuracoes,function(res){
    console.log(res.statusCode);
    res.on('data',function(body){
        console.log('resultado' + body);
    });
});

clientRequest.end(JSON.stringify(produto),function(){
    console.log('finish');
});