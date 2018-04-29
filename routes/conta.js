module.exports = app => {

    app.get('/contas', app.auth.authenticate(), (req, res) => {

        const conn = app.data.connectionFactory();
        const dao = new app.data.ContaDAO(conn);
        const {id_usuario, id_empresa} = req.user;

        dao.getContas(id_empresa, (err, rs) => {

            conn.end();

            if(err){
                res
                    .status(400)
                    .json({err});
                return;
            }

            res
                .status(200)
                .json(rs[0]);

        });

    });

    app.get('/contas/:id', app.auth.authenticate(), (req, res) => {

        const id = req.params.id;
        const conn = app.data.connectionFactory();
        const dao = new app.data.ContaDAO(conn);
        const {id_usuario, id_empresa} = req.user;

        dao.getConta(id, (err, rs) => {

            if(err){
                res
                    .status(400)
                    .json({err});
                return;
            }

            res
                .status(200)
                .json(rs[0][0]);

        });

    });

    app.post('/contas', app.auth.authenticate(), (req, res) => {

        const conta = req.body;
        const conn = app.data.connectionFactory();
        const dao = new app.data.ContaDAO(conn);
        const {id_usuario, id_empresa} = req.user;

        dao.insert(conta, (err, rs) => {

            if(err){
                res.status(400).json({err});
                return;
            }

            conta["id_conta"] = rs[0].id_conta;

            const result = {
                status:"1",
                message:"Incluído com sucesso",
                payload: conta
            };

            res
                .status(201)
                .json(result);

        });

    });

    app.put('/contas/:id', app.auth.authenticate(), (req, res) => {

        const id = req.params.id;
        const conta = req.body;
            conta.id_conta = id;
        const conn = app.data.connectionFactory();
        const dao = new app.data.ContaDAO(conn);
        const {id_usuario, id_empresa} = req.user;

        dao.update(conta, (err, rs) => {

            if(err){
                res.status(400).json({err});
                return;
            }

            const result = {
                status:"1",
                message:"Atualizado com sucesso",
                payload: conta
            };

            res
                .status(200)
                .json(result);
        })

    });

    app.delete('/contas/:id', app.auth.authenticate(), (req, res) => {

        const id = req.params.id;
        const conn = app.data.connectionFactory();
        const dao = new app.data.ContaDAO(conn);
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