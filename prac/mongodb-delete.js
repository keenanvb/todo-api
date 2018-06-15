const {MongoClient,ObjectID} = require('mongodb');


//connect to db
MongoClient.connect('mongodb://localhost:27017/todoApp', (err, client) => {
    if (err) {
        return console.log('unable to connect to the database server')
    }

    const db = client.db('TodoApp');

    //delete many
    // db.collection('Todos').deleteMany({
    //         "text" : "code",
    //         "completed" : true
    // }).then((result)=>{
    //     console.log("result ",result);
    // });

    //deleteOne
//    db.collection('Todos').deleteOne({
//             "text" : "code",
//             "completed" : true
//     }).then((result)=>{
//         console.log("result ",result);
//     });

    //findOneandDelete
    // db.collection('Todos').findOneAndDelete({
    //     completed: false
    // }).then((res)=>{
    //     console.log(res);
    // });

    console.log('connected');

    
    //close the db
    //client.close();
});