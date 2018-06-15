const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');

// Todo.remove({}).then((result)=>{
//     console.log(result);
// });

// Todo.findOneAndRemove({}).then((result)=>{
//     console.log(result);
// })

// let id = '5b1b1e91a16de35146182a50'

// Todo.findOneAndRemove(id).then((todo)=>{
//     console.log(todo);
// })


// Todo.findByIdAndRemove({
//     _id:id
// }).then((todo)=>{
//     console.log(todo);
// })