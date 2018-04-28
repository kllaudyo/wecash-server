const CategoriaDAO = function(connection){
    this._conn = connection;
};

CategoriaDAO.prototype.getCategorias = function(id_empresa, cb){
    this._conn.query("call get_categorias(?);", id_empresa, cb);
};

CategoriaDAO.prototype.getCategoria = function(id_categoria, cb){
    this._conn.query("call get_categoria(?);", id_categoria, cb);
};

CategoriaDAO.prototype.insert = function({id_empresa, ds_categoria, tp_categoria}, cb){
    this._conn.query("SET @output = 10");
    this._conn.query("call post_categoria(@output, ?, ?, ?)", [id_empresa, ds_categoria, tp_categoria]);
    this._conn.query("select @output as id_categoria", cb);
};

CategoriaDAO.prototype.update = function({id_categoria, ds_categoria, tp_categoria}, cb){
    this._conn.query("call put_categoria(?,?,?)",[id_categoria, ds_categoria, tp_categoria], cb);
};

CategoriaDAO.prototype.delete = function(id_categoria, cb){
    this._conn.query("call delete_categoria(?)", id_categoria, cb);
};

module.exports = () => CategoriaDAO;