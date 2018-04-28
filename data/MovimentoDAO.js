const MovimentoDAO = function(connection){
    this._conn = connection;
};

MovimentoDAO.prototype.getMovimentos = function(id_empresa, cb){
    this._conn.query("call get_movimentos(?);", id_empresa, cb);
};

MovimentoDAO.prototype.getMovimento = function(id_movimento, cb){
    this._conn.query("call get_movimento(?);", id_movimento, cb);
};

MovimentoDAO.prototype.insert = function({id_conta, id_categoria, ds_movimento, dt_previsao, dt_confirmacao, vl_previsto, vl_confirmado}, cb){
    this._conn.query("SET @output = 10");
    this._conn.query("call post_movimento(@output, ?, ?, ?, str_to_date(?,'%d/%m/%Y'), str_to_date(?,'%d/%m/%Y'), cast(? as decimal(10,2)), cast(? as decimal(10,2)))", [id_conta, id_categoria, ds_movimento, dt_previsao, dt_confirmacao, vl_previsto, vl_confirmado]);
    this._conn.query("select @output as id_movimento", cb);
};

MovimentoDAO.prototype.update = function({id_movimento, id_conta, id_categoria, ds_movimento, dt_previsao, dt_confirmacao, vl_previsto, vl_confirmado}, cb){
    this._conn.query("call put_movimento(?, ?, ?, ?, str_to_date(?,'%d/%m/%Y'), str_to_date(?,'%d/%m/%Y'), cast(? as decimal(10,2)), cast(? as decimal(10,2)))", [id_movimento, id_conta, id_categoria, ds_movimento, dt_previsao, dt_confirmacao, vl_previsto, vl_confirmado], cb);
};

MovimentoDAO.prototype.delete = function(id_movimento, cb){
    this._conn.query("call delete_movimento(?);", id_movimento, cb);
};

module.exports = () => MovimentoDAO;
