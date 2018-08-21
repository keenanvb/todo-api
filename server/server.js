require('./config/config');
let express = require('express');
let bodyParser = require('body-parser');
let { ObjectID} = require('mongodb');
const _ = require("lodash");

let {mongoose} = require('./db/mongoose');
let {User} = require('./models/user');
let {Todo} = require('./models/todo');
let {authenticate} = require('./middleware/authenticate');

let app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// app.use((req, res, next) => {
//     let now = new Date().toString();
//     let log = `Date ${now} ${req.method} ${req.url} \n`;
//     fs.appendFile('logs.txt', log, (err) => {
//         if (err) {
//             console.log('Unable to append to log.txt')
//         }
//     });
//     next();
// });

//Maintenance
// app.use((req, res, next) => {
//     res.render('');
// })

// Todo
app.post('/todos',(req,res)=>{
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((todo)=>{
        res.send(todo)
    },(error)=>{
        res.status(400).send(error);
    });
    console.log(req.body);
});

app.get('/todos',(req,res)=>{
    Todo.find({}).then((todos)=>{
        res.send({
            todos
        })
    },(error)=>{
        res.status(400).send(error);
    });
});

app.get('/todos/:id',(req,res)=>{
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        console.log(id);
        return res.status(404).send();
    }

    Todo.findById(id).then((todo)=>{
        if(!todo){
         return res.status(404).send();
        }

        res.send({todo})
    }).catch((error)=>{
        res.status(400).send(error);
    });
});

app.delete('/todos/:id',(req,res)=>{
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        console.log(id);
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo})
    }).catch((error)=>{
        res.status(400).send(error);
    })
});

app.patch('/todos/:id',(req,res)=>{
    let id = req.params.id;
    let body = _.pick(req.body,['text','completed']);


    if(!ObjectID.isValid(id)){
        console.log(id);
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,{$set: body},{new:true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }

        res.send({todo});

    }).catch((error)=>{
        res.status(400).send(error);
    });

});

// User
app.post('/user',(req,res) => {
    let body = _.pick(req.body,['email','password']);
    let user = new User(body);


    user.save().then(()=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth', token).send(user);
    }).catch((error)=>{
        console.log(error);
        res.status(400).send(error);
    });
})

//auth 
app.get('/users/me',authenticate,(req,res)=>{
    res.send(req.user);
});

//login
app.post('/users/login',(req,res)=>{
    let body = _.pick(req.body,['email','password']);
    User.findByCredentials(body.email,body.password).then((user)=>{
        user.generateAuthToken().then((token)=>{
            res.header('x-auth', token).send(user);
        });
    }).catch((error)=>{
        res.send(400).send(error);
    })
})

app.listen(3000,()=>{
    console.log(`listeing on port ${port}`)
});

module.exports = {app}

