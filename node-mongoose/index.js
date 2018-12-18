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

        return Dishes.findOneAndUpdate(dish._id, {
            $set: { description: 'Updated Test'}
        }, {
            new: true 
        }).exec();
    })
    .then((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        });

        return dish.save();
    }).then((dish) => {
        console.log(dish);

        return Dishes.deleteMany({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
});
