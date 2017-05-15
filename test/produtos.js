var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProdutoController',function(){
    console.log(process.env.NODE_ENV);

    beforeEach(function(done){
        var conn = express.infra.connectionFactory();
        conn.query('delete from produtos',function(err, result){
            if(!err) done();
        });
    });

    afterEach(function(done){
        var conn = express.infra.connectionFactory();
        conn.query('delete from produtos',function(err, result){
            if(!err) done();
        });
    });

    it('#Listagem de produtos por json',function(done){
        request.get('/produtos').set('Accept','application/json').expect('Content-type',/json/).expect(200,done);
    });

    it('#Cadastro de produto invalido via json',function(done){
        request.post('/produtos').set('Accept','application/json').send({produto:"titulo"}).expect(400,done);
    });

    it('#Cadastro de produto valido via json',function(done){
        request.post('/produtos').set('Accept','application/json').send({produto:"test",valor:100.0}).expect(302,done);
    });
});