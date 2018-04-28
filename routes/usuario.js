module.exports = app => {

    app.get('/usuarios', (req, res) => {

        const conn = app.data.connectionFactory();
        const dao = new app.data.UsuarioDAO(conn);

        dao.getUsuarios(1, (err, rs) => {

            if(err){
                res.status(400).json({err});
                return;
            }

            res.status(200).json(rs[0]);

        });

    });

    app.get('/usuarios/:id', (req, res) => {

        const id = req.params.id;
        const conn = app.data.connectionFactory();
        const dao = new app.data.UsuarioDAO(conn);

        dao.getUsuario(id, (err, rs) => {

            if(err){
                res.status(400).json({err});
                return;
            }

            res.status(200).json(rs[0][0]);

        });

    });

    app.post('/usuarios', (req, res) => {

        const usuario = req.body;
        const conn = app.data.connectionFactory();
        const dao = new app.data.UsuarioDAO(conn);

        dao.insert(usuario, (err, rs) => {

            if(err){
                res.status(400).json({err});
                return;
            }

            usuario["id_usuario"] = rs[0].id_usuario;

            const result = {
                status:"1",
                message:"Incluído com sucesso",
                payload: usuario
            };

            res
                .status(201)
                .json(result);

        });

    });

    app.put('/usuarios/:id', (req, res) => {

        const id = req.params.id;
        const usuario = req.body;
        usuario.id_usuario = id;
        const conn = app.data.connectionFactory();
        const dao = new app.data.UsuarioDAO(conn);

        dao.update(usuario, (err, rs) => {

            if(err){
                res.status(400).json({err});
                return;
            }

            const result = {
                status:"1",
                message:"Atualizado com sucesso",
                payload: usuario
            };

            res
                .status(200)
                .json(result);
        })

    });

    app.delete('/usuarios/:id', (req, res) => {

        const id = req.params.id;
        const conn = app.data.connectionFactory();
        const dao = new app.data.UsuarioDAO(conn);

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