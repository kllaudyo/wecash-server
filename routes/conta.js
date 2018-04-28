module.exports = app => {

    app.get('/contas', (req, res) => {

        const conn = app.data.connectionFactory();
        const dao = new app.data.ContaDAO(conn);

        dao.getContas(1, (err, rs) => {

            if(err){
                res.status(400).json({err});
                return;
            }

            res.status(200).json(rs[0]);

        });

    });

    app.get('/contas/:id', (req, res) => {

        const id = req.params.id;
        const conn = app.data.connectionFactory();
        const dao = new app.data.ContaDAO(conn);

        dao.getConta(id, (err, rs) => {

            if(err){
                res.status(400).json({err});
                return;
            }

            res.status(200).json(rs[0][0]);

        });

    });
};