const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

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
    const collection = db.collection('dishes');

    collection.insertOne({
        "name": "Uthapizza", 
        "description": "test"}, 
        (err, result) => {
            assert.equal(err, null);

            console.log('After Insert:\n');
            console.log(result.ops);

            // Return collections in the database; 
            // empty find array means all docs would be returned 
            collection.find({}).toArray((err, docs) => {
                assert.equal(err, null);

                console.log('Found:\n');
                console.log(docs);

                db.dropCollection('dishes', (err, result) => {
                    assert.equal(err, null);

                    client.close();
                });
            });
    });

});