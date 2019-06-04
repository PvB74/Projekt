const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

// allow CORS.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

//Daten aus MongoDB holen
const MongoClient = require('mongodb');
let dbUrl = 'mongodb://localhost:27017/pededose';
let login = [];
let activitylog = [];

//API für Login-Daten
app.get('/api/login', (req, res) => {
    MongoClient.connect(dbUrl, (err, db) => {
        db.collection('login').find().toArray(function(err, result) {
            login = result;
        });
        db.close();
    });
    const metadata = { total_count: login.length };
    res.json({ _metadata: metadata, records: login });
});

//API für Activitylog-Daten - Achtung Version MongoDB muss so bleiben, sonst funktioniert es nicht (collection wird nicht erkannt...)
app.get('/api/activitylog', (req, res) => {
    MongoClient.connect(dbUrl, (err, db) => {
        db.collection('activitylog').find().toArray(function(err, result) {
            activitylog = result;
        });
        db.close();
    });
    const metadata = { total_count: activitylog.length };
    res.json({ _metadata: metadata, records: activitylog }); //
});

app.listen(3000, () => {
    console.log('App started on port 3000');
});