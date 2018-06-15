const {MongoClient,ObjectID} = require('mongodb');


//connect to db
MongoClient.connect('mongodb://localhost:27017/todoApp', (err, client) => {
    if (err) {
        return console.log('unable to connect to the database server')
    }

    const db = client.db('TodoApp');

    // db.collection('Todos').find({
    //     completed:false
    // }).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log("Unable to fecth todo list: ",err)
    // });

    // db.collection('Todos').find({
    //     _id: new ObjectID('5b184fff95fca41ffa3b5dec')
    // }).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log("Unable to fecth todo list: ",err)
    // });

    // db.collection('Todos').find().count().then((count)=>{
    //     console.log(`Todos count: ${count}`);
    // },(err)=>{
    //     console.log("Unable to fecth todo list: ",err)
    // });

    db.collection('Users').find({
        name:'k'
    }).toArray().then((docs)=>{
        console.log('Todos');
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log("Unable to fecth todo list: ",err)
    });

    console.log('connected');

    
    //close the db
    //client.close();
});