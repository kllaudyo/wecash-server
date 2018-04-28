module.exports = app => {
    app.get('/contas', (req, res) => {

        const conn = app.data.connectionFactory();
        const dao = new app.data.ContaDAO(conn);

        dao.getContas(1, (err, rs) => {

            if(err){
                res.status(400).json({err});
                return;
            }

            res.status(200).json(rs);

        });
    });
};