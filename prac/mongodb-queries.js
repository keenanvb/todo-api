const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');

let id = "5b1b1e91a16de35146182a50";

if(!ObjectID.isValid(id)){
    console.log('Id Is not valid')
}

// Todo.find({_id: id}).then((todo)=>{
//     console.log(todo);
// },(error)=>{
//     console.log()
// });

// Todo.findOne({_id: id}).then((todo)=>{
//     console.log(todo);
// },(error)=>{
//     console.log()
// });

// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log('Id not found') 
//     }
//     console.log(todo);
// }).catch((e)=>{
//     if(todo.lenght)
//     console.log(e);
// })