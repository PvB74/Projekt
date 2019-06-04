const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello from Express to React' });
});

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

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
    db.collection('login').find().toJSON(function(err, result) {
      login = result;
    });
    db.close();
  });
  const metadata = { total_count: login.length };
  res.json({ records: login });
});

//API für Activitylog-Daten - Achtung Version MongoDB muss so bleiben, sonst funktioniert es nicht (collection wird nicht erkannt...)
app.get('/api/activitylog', (req, res) => {
  MongoClient.connect(dbUrl, (err, db) => {
    db.collection('activitylog').find().toJSON(function(err, result) {
      activitylog = result;
    });
    db.close();
  });
  const metadata = { total_count: activitylog.length };
  res.json({ _metadata: metadata, records: activitylog });
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
