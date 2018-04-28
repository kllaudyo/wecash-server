const ContaDAO = function(connection){
    this._conn = connection;
};

ContaDAO.prototype.getContas = function(id_empresa, cb){
    this._conn.query("call get_contas(?);", id_empresa, cb);
};

ContaDAO.prototype.getConta = function(id_conta, cb){
    this._conn.query("call get_conta(?);", id_conta, cb);
};

module.exports = () => ContaDAO;