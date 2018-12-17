const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOperation = require('./operations');

// URL of mongodb server
const url = 'mongodb://localhost:27017/';
// mongodb database to be accessed 
const dbname = 'conFusion';

MongoClient.connect(url, {useNewUrlParser: true})
    .then((client) => {

        console.log('Connected to server');
        // connect to database
        const db = client.db(dbname);

        dbOperation.insertDocument(db, {name: "Vadonut", description: "Test"}, "dishes")
            .then((result) => {
                console.log('Insert Document:\n', result.ops);

                return dbOperation.findDocuments(db, "dishes");
            })
            .then((docs) => {
                console.log('Found Documents:\n', docs);

                return dbOperation.updateDocument(db, {name: 'Vadonut'}, {description: 'Updated Test'}, "dishes");
            })
            .then((result) => {
                console.log('Updated Document:\n', result.result);

                return dbOperation.findDocuments(db, "dishes");
            })
            .then((docs) => {
                console.log('Found Documents:\n', docs);

                return db.dropCollection("dishes");
            })
            .then((result) => {
                console.log('Dropped Collection: ', result);

                client.close();
            });

    })
    .catch((err) => console.log(err));