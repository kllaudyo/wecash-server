const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = () => {
    const app = express();

    app.use(cors({
        origin: ["http://localhost:3000","http://localhost:3001"],
        methods: ["GET","POST","PUT","DELETE","OPTION"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

    consign()
        .include("auth.js")
        .then('routes')
        .then('data')
        .into(app);

    app.use(app.auth.initialize());

    return app;
};