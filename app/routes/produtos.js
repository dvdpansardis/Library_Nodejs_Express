module.exports = function(app){
    app.get('/produtos', function(req,res){       
        var connection = app.infra.connectionFactory();
        
        //don't forget the 'new' on the class
        var produtosDAO  = new app.infra.ProdutosDAO(connection);

        produtosDAO .lista(function(err,result){
            res.render('produtos/lista',{lista:result});
        });

        connection.end();
    });
}