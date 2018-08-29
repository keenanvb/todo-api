const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');


const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId ,
    email:'admin@example.com',
    password: 'userOnePassword',
    tokens:[{
       access:'auth',
       token: jwt.sign({_id: userOneId ,access:'auth'},'this is the secret').toString()
    }]
},{
    _id: userTwoId ,
    email:'admin2@example.com',
    password: 'userTwoPassword',
}];

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
  }, {
    _id: new ObjectID(),
    text: 'Second test todo',
    complete:true,
    completeAt:333,
    _creator: userTwoId
  }];

const populateToDo = (done) => {
    Todo.remove({}).then(() => {
      return Todo.insertMany(todos);
    }).then(() => done());
}

const populateUsers = (done)=>{
    User.remove({}).then(()=>{
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();

       return Promise.all([userOne,userTwo])
    }).then(()=> done());
}

module.exports = {todos,populateToDo,users,populateUsers}