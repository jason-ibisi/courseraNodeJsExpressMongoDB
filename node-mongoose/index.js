const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url,{useNewUrlParser: true});

connect.then((db) => {
    console.log('Connected successfully to database.');

    Dishes.create({
        name: 'Uthapizza',
        description: 'test description'
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.find({}).exec();
    })
    .then((dishes) => {
        console.log(dishes);

        return Dishes.deleteMany({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
});
