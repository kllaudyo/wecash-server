const MovimentoDAO = function(connection){
    this._conn = connection;
};

MovimentoDAO.prototype.getMovimentos = function(id_empresa, cb){
    this._conn.query("call get_movimentos(?);", id_empresa, cb);
};

MovimentoDAO.prototype.getMovimento = function(id_movimento, cb){
    this._conn.query("call get_movimento(?);", id_movimento, cb);
};

module.exports = () => MovimentoDAO;