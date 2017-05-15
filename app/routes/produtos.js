module.exports = function(app){
    app.get('/produtos', function(req,res,next){       
        var connection = app.infra.connectionFactory();
        
        //don't forget the 'new' on the class
        var produtosDAO  = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function(err,result){
            if(err) return next(err);
            res.format({
                html : function(){
                    res.render('produtos/lista',{lista:result});
                }, 
                json: function(){
                    res.json(result);
                }
            });
            
        });

        connection.end();
    });

    app.get('/produtos/form',function(req,res){
        res.render('produtos/form',{errosValidator:{},produto:{}});
    });

    app.post('/produtos',function(req,res,next){

        var produto = req.body;
        
        req.assert('produto','produto obrigatorio').notEmpty();
        req.assert('valor','valor invalido').isFloat();

        var erros = req.validationErrors();
        
        if(erros){
            res.format({
                html:function(){
                    res.status(400).render('produtos/form',{errosValidator:erros,produto:produto});
                },
                json:function(){
                    res.status(400).json(erros);
                }
            });
            
            return;
        }

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.salva(produto,function(err, result){
            if(err) return next(err);
            produtosDAO.lista(function(err,result){
                if(err) return next(err);
                res.redirect('/produtos');
            });
        });
    });

    app.delete('/produtos/:id',function(req,res){
        console.log(req.params.id);
        res.send('depois eu deleto blz?!');
    });
}