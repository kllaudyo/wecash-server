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

};