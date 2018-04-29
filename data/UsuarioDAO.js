const UsuarioDAO = function (connection) {
    this._conn = connection;
};

UsuarioDAO.prototype.getUsuarios = function(id_empresa, cb){
    this._conn.query("call get_usuarios(?);", id_empresa, cb);
};

UsuarioDAO.prototype.authUsuario = function(nm_email, nm_senha, cb){
    this._conn.query("call auth_usuario(?,?);", [nm_email, nm_senha], cb);
};

UsuarioDAO.prototype.getUsuario = function (id_usaurio, cb) {
    this._conn.query("call get_usuario(?);", id_usaurio, cb);
};

UsuarioDAO.prototype.insert = function({id_empresa, nm_usuario, nm_email, nm_senha}, cb){
    this._conn.query("SET @output = 10");
    this._conn.query("call post_usuario(@output, ?, ?, ?, ?)", [id_empresa, nm_usuario, nm_email, nm_senha]);
    this._conn.query("select @output as id_usuario", cb);
};

UsuarioDAO.prototype.update = function({id_usuario, nm_usuario, nm_email, nm_senha}, cb){
    this._conn.query("call put_usuario(?,?,?,?)",[id_usuario, nm_usuario, nm_email, nm_senha], cb);
};

UsuarioDAO.prototype.delete = function(id_usuario, cb){
    this._conn.query("call delete_usuario(?);", id_usuario, cb);
};

module.exports = () => UsuarioDAO;