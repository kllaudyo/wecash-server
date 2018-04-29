const passport = require("passport");
const Strategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "Maravilha na vida";

module.exports = app => {
    const strategy = new Strategy(opts, (payload, done) => {
        const conn = app.data.connectionFactory();
        const dao = new app.data.UsuarioDAO(conn);
        dao.getUsuario(payload.id_usuario, (err, rs) => {
            if(err)
                return done(err,null);

            if(rs[0][0]){
                const {id_usuario, id_empresa} = rs[0][0];
                return done(null, {id_usuario, id_empresa});
            }

            return done(null, false);
        })
    });

    passport.use(strategy);

    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate("jwt", {session:false})
    }
};