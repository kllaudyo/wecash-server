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

        dao.getMovimentos(id, (err, rs) => {

            if(err){
                res.status(400).json({err});
                return;
            }

            res.status(200).json(rs[0][0]);

        });

    });

};