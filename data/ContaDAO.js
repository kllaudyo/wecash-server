const ContaDAO = function(connection){
    this._conn = connection;
};

ContaDAO.prototype.getContas = function(id_empresa, cb){
    this._conn.query("call get_contas(?);", id_empresa, cb);
};

ContaDAO.prototype.getConta = function(id_conta, cb){
    this._conn.query("call get_conta(?);", id_conta, cb);
};

ContaDAO.prototype.insert = function({id_empresa, ds_conta}, cb){
    this._conn.query("SET @output = 10");
    this._conn.query("call post_conta(@output, ?, ?)", [id_empresa, ds_conta]);
    this._conn.query("select @output as id_conta", cb);
};

ContaDAO.prototype.update = function({id_conta, ds_conta}, cb){
    this._conn.query("call put_conta(?,?)",[id_conta, ds_conta], cb);
};

ContaDAO.prototype.delete = function(id_conta, cb){
    this._conn.query("call delete_conta(?);", id_conta, cb);
};

module.exports = () => ContaDAO;