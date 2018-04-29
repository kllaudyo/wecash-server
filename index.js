const app = require('./config/wecash-express')();

app.listen(3001, ()=> console.log("servidor online"));