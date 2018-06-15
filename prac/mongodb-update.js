const {
    MongoClient,
    ObjectID
} = require('mongodb');


//connect to db
MongoClient.connect('mongodb://localhost:27017/todoApp', (err, client) => {
    if (err) {
        return console.log('unable to connect to the database server')
    }

    const db = client.db('TodoApp');

    //findOneandUpdate
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b199675697b3aa62efb5e57')
    // }, {
    //     $set: {
    //         completed: false
    //     }
    // },{
    //   returnOriginal:false  
    // }).then((res)=>{
    //     console.log(res)
    // })

    //findOneandUpdate
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b18510087ff46205b8d7c41')
    }, {
        $set: {
            name: 'keen',
            completed: false
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res)
    })


    console.log('connected');


    //close the db
    //client.close();
});