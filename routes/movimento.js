module.exports = app => {

    app.get('/movimentos', (req, res) => {

        const conn = app.data.connectionFactory();
        const dao = new app.data.MovimentoDAO(conn);

        dao.getMovimentos(1, (err, rs) => {

            if(err){
                res.status(400).json({err});
                return;
            }

            res.status(200).json(rs[0]);

        });

    });

    app.get('/movimentos/:id', (req, res) => {

        const id = req.params.id;
        const conn = app.data.connectionFactory();
        const dao = new app.data.MovimentoDAO(conn);

        dao.getMovimento(id, (err, rs) => {

            if(err){
                res.status(400).json({err});
                return;
            }

            res.status(200).json(rs[0][0]);

        });

    });

    app.post('/movimentos', (req, res) => {

        const movimento = req.body;
        const conn = app.data.connectionFactory();
        const dao = new app.data.MovimentoDAO(conn);

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

    app.put('/movimentos/:id', (req, res) => {

        const id = req.params.id;
        const movimento = req.body;
        movimento.id_movimento = id;
        const conn = app.data.connectionFactory();
        const dao = new app.data.MovimentoDAO(conn);

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

    app.delete('/movimentos/:id', (req, res) => {

        const id = req.params.id;
        const conn = app.data.connectionFactory();
        const dao = new app.data.MovimentoDAO(conn);

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