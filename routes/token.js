const jwt = require("jwt-simple");

module.exports = app => {

    app.post("/token", (req, res) => {

        const {nm_email, nm_senha} = req.body;

        if(nm_email && nm_senha){

            const conn = app.data.connectionFactory();
            const dao = new app.data.UsuarioDAO(conn);

            dao.authUsuario(nm_email, nm_senha, (err, rs) => {

                if(err){
                    res.status(401);
                    return;
                }

                if(rs[0][0]){
                    const usuario = rs[0][0];
                    const {id_usuario, id_empresa} = usuario;
                    const payload = {id_usuario, id_empresa};

                    res.status(200).json({
                        token: jwt.encode(payload, "Maravilha na vida")
                    });
                }else res.status(401);

            });
        }
    })
};