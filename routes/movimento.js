module.exports = app => {

    app.get('/movimentos', app.auth.authenticate(), (req, res) => {

        const conn = app.data.connectionFactory();
        const dao = new app.data.MovimentoDAO(conn);
        const {id_usuario, id_empresa} = req.user;

        dao.getMovimentos(id_empresa, (err, rs) => {

            conn.end();

            if(err){
                res.status(400).json({err});
                return;
            }

            res.status(200).json(rs[0]);

        });

    });

    app.get('/movimentos/:id', app.auth.authenticate(), (req, res) => {

        const id = req.params.id;
        const conn = app.data.connectionFactory();
        const dao = new app.data.MovimentoDAO(conn);
        const {id_usuario, id_empresa} = req.user;

        dao.getMovimento(id, (err, rs) => {

            if(err){
                res.status(400).json({err});
                return;
            }

            res.status(200).json(rs[0][0]);

        });

    });

    app.post('/movimentos', app.auth.authenticate(), (req, res) => {

        const movimento = req.body;
        const conn = app.data.connectionFactory();
        const dao = new app.data.MovimentoDAO(conn);
        const {id_usuario, id_empresa} = req.user;

        dao.insert(movimento, (err, rs) => {

            if(err){
                res.status(400).json({err});
                return;
            }

            movimento["id_movimento"] = rs[0].id_movimento;

            const result = {
                status:"1",
                message:"Incluído com sucesso",
                payload: movimento
            };

            res
                .status(201)
                .json(result);

        });

    });

    app.put('/movimentos/:id', app.auth.authenticate(), (req, res) => {

        const id = req.params.id;
        const movimento = req.body;
        movimento.id_movimento = parseInt(id, 10);
        const conn = app.data.connectionFactory();
        const dao = new app.data.MovimentoDAO(conn);
        const {id_usuario, id_empresa} = req.user;

        dao.update(movimento, (err, rs) => {

            if(err){
                res.status(400).json({err});
                return;
            }

            const result = {
                status:"1",
                message:"Atualizado com sucesso",
                payload: movimento
            };

            res
                .status(200)
                .json(result);
        });

    });

    app.delete('/movimentos/:id', app.auth.authenticate(), (req, res) => {

        const id = req.params.id;
        const conn = app.data.connectionFactory();
        const dao = new app.data.MovimentoDAO(conn);
        const {id_usuario, id_empresa} = req.user;

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