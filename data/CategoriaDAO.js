const CategoriaDAO = function(connection){
    this._conn = connection;
};

CategoriaDAO.prototype.getCategorias = function(id_empresa, cb){
    this._conn.query("call get_categorias(?);", id_empresa, cb);
};

CategoriaDAO.prototype.getCategoria = function(id_categoria, cb){
    this._conn.query("call get_categoria(?);", id_categoria, cb);
};

module.exports = () => CategoriaDAO;