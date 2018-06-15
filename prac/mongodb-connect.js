const {MongoClient,ObjectID} = require('mongodb');


//connect to db
MongoClient.connect('mongodb://localhost:27017/todoApp', (err, client) => {
    if (err) {
        return console.log('unable to connect to the database server')
    }

    const db = client.db('TodoApp');

    db.collection('Todos').insertOne({
        text: "code",
        completed: true
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    // db.collection('Users').insertOne({
    //     name: "abc",
    //     age: 21,
    //     location: "cpt"
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert user', err);
    //     }
    //     //timestamp
    //     //result.ops[0]._id.getTimestamp()
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    // });

    console.log('connected');

    //close the db
    client.close();
});