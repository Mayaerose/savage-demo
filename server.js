require('dotenv').config() // loads MONGODB_URI from the .env file when you run it on your computer
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

// the connection string now comes from the environment, so the password is never in the code
const url = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "demo";
// Render tells the app which port to use. On my computer it falls back to 3000
const port = process.env.PORT || 3000;

if (!url) {
    console.log("Missing MONGODB_URI. Add it to your .env file (see .env.example), or to Environment on Render.");
    process.exit(1);
}

app.listen(port, () => {
    console.log("Server is running on port " + port);
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            console.log("Could not connect to MongoDB:", error.message);
            process.exit(1);
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

// if the database isn't connected yet, answer right away instead of leaving the page loading forever
app.use((req, res, next) => {
  if (!db) return res.status(503).send('Still connecting to the database. Wait a few seconds and refresh the page.')
  next()
})

app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).send('Could not load the messages. Check the server logs.')
    }
    res.render('index.ejs', {messages: result})
  })
})

app.post('/messages', (req, res) => {
  db.collection('messages').insertOne({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).send('Could not save the message. Check the server logs.')
    }
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/messages', (req, res) => {
  db.collection('messages')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
     $set: {
     ...(req.body.thumbUp !== undefined ? { thumbUp: Number(req.body.thumbUp) + 1 } : {}),
     ...(req.body.thumbDown !== undefined ? { thumbDown: Number(req.body.thumbDown) + 1 } : {})
   }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
