module.exports = app => {

    app.get('/categorias', (req, res) => {

        const conn = app.data.connectionFactory();
        const dao = new app.data.CategoriaDAO(conn);

        dao.getCategorias(1, (err, rs) => {

            if(err){
                res.status(400).json({err});
                return;
            }

            res.status(200).json(rs[0]);

        });

    });

    app.get('/categorias/:id', (req, res) => {

        const id = req.params.id;
        const conn = app.data.connectionFactory();
        const dao = new app.data.CategoriaDAO(conn);

        dao.getCategoria(id, (err, rs) => {

            if(err){
                res.status(400).json({err});
                return;
            }

            res.status(200).json(rs[0][0]);

        });

    });

};