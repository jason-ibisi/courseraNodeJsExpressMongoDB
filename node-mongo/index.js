const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOperation = require('./operations');

// URL of mongodb server
const url = 'mongodb://localhost:27017/';
// mongodb database to be accessed 
const dbname = 'conFusion';

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {

    // check if error is null
    assert.equal(err, null);

    console.log('Connected to server');

    // connect to database
    const db = client.db(dbname);

    dbOperation.insertDocument(db, {name: "Vadonut", description: "Test"}, "dishes", (result) => {
        console.log('Insert Document:\n', result.ops);

        dbOperation.findDocuments(db, "dishes", (docs) => {
            console.log('Found Documents:\n', docs);

            dbOperation.updateDocument(db, {name: 'Vadonut'}, {description: 'Updated Test'}, "dishes", (result) => {
                console.log('Updated Document:\n', result.result);

                dbOperation.findDocuments(db, "dishes", (docs) => {
                    console.log('Found Documents:\n', docs);

                    db.dropCollection("dishes", (result) => {
                        console.log('Dropped Collection: ', result);

                        client.close();
                    });
                });
            });
        });
    });

});