const UsuarioDAO = function (connection) {
    this._conn = connection;
};

UsuarioDAO.prototype.getUsuarios = function(id_empresa, cb){
    this._conn.query("call get_usuarios(?);", id_empresa, cb);
};

UsuarioDAO.prototype.getUsuario = function (id_usaurio, cb) {
    this._conn.query("call get_usuario(?);", id_usaurio, cb);
};

module.exports = () => UsuarioDAO;