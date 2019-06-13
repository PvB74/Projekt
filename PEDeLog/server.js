const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello from Express to React' });
});

app.use(express.static(path.join(__dirname, 'client/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/build/index.html'));
// });

// allow CORS.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//Daten aus MongoDB holen
const MongoClient = require('mongodb');
// let dbUrl = 'mongodb://localhost:27017/pededose';
let dbUrl = 'mongodb://localhost:27017';
let loginData = [];
let activitylog = [];

//API für Login-Daten
app.get('/api/login', (req, res) => {
  let clientConn;
  MongoClient.connect(dbUrl)
  .then((client) => {
    clientConn = client
    const db = clientConn.db('pededose')
    return db.collection('login').find().toArray();
  })
  .then((result)=>{
    loginData = result;
    const db = clientConn.db('pededose')
    const populatedData = result.map((entry)=>db.collection('activitylog').findOne({login_id: entry.login_id}))
    return Promise.all(populatedData)
    // const metadata = { total_count: login.length };
  })
  .then((populatedData)=>{
    const populatedRecords = loginData.map((entry, index)=>Object.assign({}, entry, {
      login_data: populatedData[index]
    }))
    res.json({ records: populatedRecords });
  })
  .catch((err)=>{
    res.status(500).send(err)
  })
  .then(()=>{
    clientConn.close();
  })
});

app.post('/api/login', (req, res)=>{
  let clientConn;
  console.log(req.body.state)
  MongoClient.connect(dbUrl)
  .then((client) => {
    clientConn = client
    const db = client.db('pededose')
    return db.collection('login').insertOne(req.body.state, {
      bypassDocumentValidation: true
    })
  })
  .then((result)=>{
    console.log(result)
    res.sendStatus(200)
  })
  .catch((err)=>{
    console.error(err)
    res.status(500).send(err)
  })
})

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

// app.all('/*', (req, res)=>res.sendStatus(404))


const port = process.env.PORT || 5000;
http.createServer(app).listen(port, ()=>console.log(`Listening on port - ${port}`))
// app.listen(port, () => console.log(`Listening on port ${port}`));
