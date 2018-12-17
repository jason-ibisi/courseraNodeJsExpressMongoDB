const assert = require('assert');

// A function to encapsulate the Insert Operation
exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.insertOne(document);
};

// A function to encapsulate the Search/Find Operation
exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    return coll.find({}).toArray();
};

// A function to encapsulate the Delete Operation
exports.deleteDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};

// A function to encapsulate the Update Operation
exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    return coll.updateOne(document, { $set: update}, null);
};