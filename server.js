const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase-admin');
const dotenv = require('dotenv');
const path = require('path');

const app= express();
dotenv.config();

const indexroutes = require('./routes/index');
const pathfile = path.join(__dirname, 'public');

app.use(express.static(pathfile));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public/static')));

app.use('/',indexroutes);

app.listen(4000, () => {
    console.log('Open http://localhost:4000 in your browser');
});

app.use((req, res) => {
     res.status(404).sendFile(pathfile + '/nully.html');
});