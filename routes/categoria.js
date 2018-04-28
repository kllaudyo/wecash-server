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

    app.post('/categorias', (req, res) => {

        const categoria = req.body;
        const conn = app.data.connectionFactory();
        const dao = new app.data.CategoriaDAO(conn);

        dao.insert(categoria, (err, rs) => {

            if(err){
                res.status(400).json({err});
                return;
            }

            categoria["id_categoria"] = rs[0].id_categoria;

            const result = {
                status:"1",
                message:"Incluído com sucesso",
                payload: categoria
            };

            res
                .status(201)
                .json(result);

        });

    });

    app.put('/categorias/:id', (req, res) => {

        const id = req.params.id;
        const categoria = req.body;
            categoria.id_categoria = id;
        const conn = app.data.connectionFactory();
        const dao = new app.data.CategoriaDAO(conn);

        dao.update(categoria, (err, rs) => {

            if(err){
                res.status(400).json({err});
                return;
            }

            const result = {
                status:"1",
                message:"Atualizado com sucesso",
                payload: categoria
            };

            res
                .status(200)
                .json(result);
        });

    });

    app.delete('/categorias/:id', (req, res) => {

        const id = req.params.id;
        const conn = app.data.connectionFactory();
        const dao = new app.data.CategoriaDAO(conn);

        dao.delete(id, (err, rs) => {

            if(err){
                res.status(400).json({err});
                return;
            }

            const result = {
                status:"1",
                message:"Excluído com sucesso"
            };

            res
                .status(204)
                .json(result);

        });

    });

};