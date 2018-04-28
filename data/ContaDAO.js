const ContaDAO = function(connection){
    this._conn = connection;
};

ContaDAO.prototype.getContas = function(id_empresa, cb){
    this._conn.query("call get_contas(?);", id_empresa, cb);
};

module.exports = function(){return ContaDAO};