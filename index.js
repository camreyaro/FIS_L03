const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
var Datastore = require('nedb')
db = new Datastore('');

var jsonParser = bodyParser.json()
var contacts = [
    { "name": "peter", "phone": 12345 },
    { "name": "john", "phone": 6789 }
];

var new_contact = { "name": "Lalisa Manoban", "phone": 12345 }

app.get('/', (req, res) => res.send('Hello World!'))

// API CRUD METHOD

//// GET CONTACTS
app.get('/api/v1/contacts', (req, res) => {
    console.log(Date() + " - GET")
    name = req.query.name
    console.log(name)
    if (name) {
        db.find({ 'name': name }, function (err, docs) {
            res.status(200).send(docs)
        });
    } else {
        console.log("hola")
        db.find({}, function (err, docs) {
            res.status(200).send(docs)
        });
    }
});


//// DELETE CONTACTS
app.delete('/api/v1/contacts', (req, res) => {
    console.log(Date() + " - DELETE")
    db.remove({}, function (err, docs) {
        res.sendStatus(200)
    });
});

//// POST CONTACT
app.post('/api/v1/contact', jsonParser, (req, res) => {
    console.log(Date() + " - POST")
    var contact = req.body
    db.insert(contact, function (err, newDoc) {
    });
    res.sendStatus(201);
});

//// PUT CONTACT
app.put('/api/v1/contact', jsonParser, (req, res) => {
    console.log(Date() + " - PUT")
    var contact = req.body
    db.update({'name': contact.name}, contact, function (err, docs) {
    });
    res.sendStatus(201);
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))