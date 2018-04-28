module.exports = app => {

    app.get('/contas', (req, res) => {

        const conn = app.data.connectionFactory();
        const dao = new app.data.ContaDAO(conn);

        dao.getContas(1, (err, rs) => {

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

    app.get('/contas/:id', (req, res) => {

        const id = req.params.id;
        const conn = app.data.connectionFactory();
        const dao = new app.data.ContaDAO(conn);

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

    app.post('/contas', (req, res) => {

        const conta = req.body;
        const conn = app.data.connectionFactory();
        const dao = new app.data.ContaDAO(conn);

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

    app.delete('/contas/:id', (req, res) => {

        const id = req.params.id;
        const conn = app.data.connectionFactory();
        const dao = new app.data.ContaDAO(conn);

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